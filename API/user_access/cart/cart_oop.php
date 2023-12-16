<?php

class Cart
{
    private $conn;

    public function __construct($conn)
    {
        $this->conn = $conn;
    }

    public function addToCart($userID, $productID, $quantity)
    {
        try {
            $existingCartItem = $this->getCartItem($userID, $productID);

            if ($existingCartItem) {
                $newQuantity = $existingCartItem['Quantity'] + $quantity;
                $this->updateCartItem($userID, $productID, $newQuantity);
                $message = "Product quantity updated in the cart.";
            } else {
                $this->insertCartItem($userID, $productID, $quantity);
                $message = "Product added to the cart.";
            }

            return ["success" => true, "message" => $message];
        } catch (Exception $e) {
            return ["success" => false, "message" => "Error: " . $e->getMessage()];
        }
    }

    public function subtractFromCart($userID, $productID)
    {
        try {
            $existingCartItem = $this->getCartItem($userID, $productID);

            if ($existingCartItem) {
                $newQuantity = $existingCartItem['Quantity'] - 1;

                if ($newQuantity > 0) {
                    $this->updateCartItem($userID, $productID, $newQuantity);
                    $message = "Product quantity updated in the cart.";
                } else {
                    $this->deleteCartItem($userID, $productID);
                    $message = "Product deleted from the cart.";
                }
            } else {
                return ["success" => false, "message" => "Product not found in the cart."];
            }

            return ["success" => true, "message" => $message];
        } catch (Exception $e) {
            return ["success" => false, "message" => "Error: " . $e->getMessage()];
        }
    }

    public function getProductsInCart($userID)
    {
        try {
            $query = "SELECT p.ProductID, p.ProductName, p.Description, p.Price, p.Quantity AS StockQuantity, p.Image, c.Quantity
                      FROM cart c
                      JOIN product p ON c.ProductID = p.ProductID
                      WHERE c.UserID = ?";
            $statement = $this->prepareAndExecuteQuery($query, 'i', $userID);
            $result = $statement->get_result();

            if ($result) {
                $products = $this->fetchProductsFromResult($result);

                return ["success" => true, "message" => "Products in the cart retrieved successfully.", "data" => $products];
            } else {
                return ["success" => false, "message" => "Error retrieving products from the cart."];
            }
        } catch (Exception $e) {
            return ["success" => false, "message" => "Error: " . $e->getMessage()];
        }
    }

    public function getTotalInCart($userID)
    {
        try {
            $query = "SELECT SUM(c.Quantity) AS Total
                      FROM cart c
                      JOIN product p ON c.ProductID = p.ProductID
                      WHERE c.UserID = ?";
            $statement = $this->prepareAndExecuteQuery($query, 'i', $userID);
            $result = $statement->get_result();

            if ($result) {
                $total = $result->fetch_assoc()['Total'];

                return ["success" => true, "message" => "Total value in the cart retrieved successfully.", "data" => ["Total" => $total]];
            } else {
                return ["success" => false, "message" => "Error retrieving total value from the cart."];
            }
        } catch (Exception $e) {
            return ["success" => false, "message" => "Error: " . $e->getMessage()];
        }
    }

    private function prepareAndExecuteQuery($query, $paramType, ...$params)
    {
        $statement = $this->conn->prepare($query);
    
        if (!$statement) {
            throw new Exception("Failed to prepare statement: " . $this->conn->error);
        }
    
        $bindParams = [$paramType];
        
        foreach ($params as &$param) {
            $bindParams[] = &$param; // Pass each parameter by reference
        }
    
        call_user_func_array([$statement, 'bind_param'], $bindParams);
        $statement->execute();
    
        return $statement;
    }
    

    private function fetchProductsFromResult($result)
    {
        $products = [];
        while ($row = $result->fetch_assoc()) {
            $products[] = [
                "ProductID" => $row['ProductID'],
                "ProductName" => $row['ProductName'],
                "Description" => $row['Description'],
                "Price" => $row['Price'],
                "StockQuantity" => $row['StockQuantity'],
                "Image" => $row['Image'],
                "Quantity" => $row['Quantity']
            ];
        }

        return $products;
    }

    private function getCartItem($userID, $productID)
    {
        $query = "SELECT * FROM cart WHERE UserID = ? AND ProductID = ?";
        $statement = $this->prepareAndExecuteQuery($query, 'ii', $userID, $productID);
        $result = $statement->get_result();

        return $result->fetch_assoc();
    }

    private function insertCartItem($userID, $productID, $quantity)
    {
        $query = "INSERT INTO cart (UserID, ProductID, Quantity) VALUES (?, ?, ?)";
        $this->prepareAndExecuteQuery($query, 'iii', $userID, $productID, $quantity);
    }

    private function updateCartItem($userID, $productID, $quantity)
    {
        $query = "UPDATE cart SET Quantity = ? WHERE UserID = ? AND ProductID = ?";
        $this->prepareAndExecuteQuery($query, 'iii', $quantity, $userID, $productID);
    }

    private function deleteCartItem($userID, $productID)
    {
        $query = "DELETE FROM cart WHERE UserID = ? AND ProductID = ?";
        $this->prepareAndExecuteQuery($query, 'ii', $userID, $productID);
    }

    public function getTotalCartPrice($userID)
    {
        try {
            $query = "SELECT SUM(p.Price * c.Quantity) AS TotalPrice
                      FROM cart c
                      JOIN product p ON c.ProductID = p.ProductID
                      WHERE c.UserID = ?";
            $statement = $this->conn->prepare($query);

            if (!$statement) {
                throw new Exception("Database error.");
            }

            $statement->bind_param('i', $userID);
            $statement->execute();
            $result = $statement->get_result();

            if ($result) {
                $totalPrice = $result->fetch_assoc()['TotalPrice'];
                return ["success" => true, "message" => "Total cart price retrieved successfully.", "data" => $totalPrice];
            } else {
                return ["success" => false, "message" => "Error retrieving total cart price."];
            }
        } catch (Exception $e) {
            return ["success" => false, "message" => "Error: " . $e->getMessage()];
        }
    }


}

?>
