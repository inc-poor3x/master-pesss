<?php
include '../conction.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");



if (isset($_GET['UserID'])) {
    $userID = $_GET['UserID'];

    $conn = new mysqli("localhost", "root", "", "master-pe");

    if ($conn->connect_error) {
        dieWithError("Connection failed: " . $conn->connect_error);
    }

    if (isUserIDExists($userID, $conn)) {
        $totalOrderAmount = calculateTotalOrderAmount($userID, $conn);
    
        if ($totalOrderAmount > 0) {
            $orderID = createOrder($userID, $totalOrderAmount, $conn);
    
            $cartQuery = "SELECT ProductID, Quantity FROM cart WHERE UserID = ?";
            $cartStatement = $conn->prepare($cartQuery);
    
            if (!$cartStatement) {
                dieWithError("Prepare failed: (" . $conn->errno . ") " . $conn->error);
            }
    
            $cartStatement->bind_param('i', $userID);
            $cartStatement->execute();
            $cartResult = $cartStatement->get_result();
    
            while ($cartRow = $cartResult->fetch_assoc()) {
                if (isset($cartRow['ProductID']) && isset($cartRow['Quantity'])) {
                    addOrderItem($orderID, $cartRow['ProductID'], $cartRow['Quantity'], $conn);
                } else {
                    dieWithError('Error retrieving cart items');
                }
            }
    
            $clearCartQuery = "DELETE FROM cart WHERE UserID = ?";
            $clearCartStatement = $conn->prepare($clearCartQuery);
    
            if (!$clearCartStatement) {
                dieWithError("Prepare failed: (" . $conn->errno . ") " . $conn->error);
            }
    
            $clearCartStatement->bind_param('i', $userID);
            $clearCartStatement->execute();
    
            $clearCartStatement->close();
    
            echo json_encode(array("OrderID" => $orderID, "TotalAmount" => $totalOrderAmount,"message" => "Order created successfully.", "orderID" => $orderID));
     
        } else {
            dieWithError("Your cart is empty");
        }
    } else {
        dieWithError("User not found");
    }
    
    $conn->close();
} else {
    dieWithError("UserID not provided");
}






















function calculateTotalOrderAmount($userID, $conn)
{
    $query = "SELECT SUM(p.Price * c.Quantity) AS TotalAmount
              FROM cart c
              JOIN product p ON c.ProductID = p.ProductID
              WHERE c.UserID = ?";
    $statement = $conn->prepare($query);

    if (!$statement) {
        dieWithError("Prepare failed: (" . $conn->errno . ") " . $conn->error);
    }

    $statement->bind_param('i', $userID);
    $statement->execute();
    $result = $statement->get_result();

    $totalAmount = 0.00;

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $totalAmount = $row['TotalAmount'];
    }

    $statement->close();

    return $totalAmount;
}

function getRecentOrderID($userID, $conn)
{
    $query = "SELECT MAX(OrderID) AS RecentOrderID FROM `order` WHERE UserID = ?";
    $statement = $conn->prepare($query);

    if (!$statement) {
        dieWithError("Prepare failed: (" . $conn->errno . ") " . $conn->error);
    }

    $statement->bind_param('i', $userID);
    $statement->execute();
    $result = $statement->get_result();

    $recentOrderID = null;

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $recentOrderID = $row['RecentOrderID'];
    }

    $statement->close();

    return $recentOrderID;
}

function isUserIDExists($userID, $conn)
{
    $query = "SELECT COUNT(*) AS UserCount FROM `user` WHERE UserID = ?";
    $statement = $conn->prepare($query);

    if (!$statement) {
        dieWithError("Prepare failed: (" . $conn->errno . ") " . $conn->error);
    }

    $statement->bind_param('i', $userID);
    $statement->execute();
    $result = $statement->get_result();

    $userCount = 0;

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $userCount = $row['UserCount'];
    }

    $statement->close();

    return $userCount > 0;
}

function createOrder($userID, $totalOrderAmount, $conn)
{
    $query = "INSERT INTO `order` (OrderDate, UserID, TotalPrice) VALUES (NOW(), ?, ?)";
    $statement = $conn->prepare($query);

    if (!$statement) {
        dieWithError("Prepare failed: (" . $conn->errno . ") " . $conn->error);
    }

    $statement->bind_param('id', $userID, $totalOrderAmount);
    $statement->execute();

    $orderID = getRecentOrderID($userID, $conn);

    return $orderID;
}

function addOrderItem($orderID, $productID, $quantity, $conn)
{
    $priceQuery = "SELECT Price FROM product WHERE ProductID = ?";
    $priceStatement = $conn->prepare($priceQuery);

    if (!$priceStatement) {
        dieWithError("Prepare failed: (" . $conn->errno . ") " . $conn->error);
    }

    $priceStatement->bind_param('i', $productID);
    $priceStatement->execute();
    $priceResult = $priceStatement->get_result();

    $price = 0.00;

    if ($priceResult->num_rows > 0) {
        $row = $priceResult->fetch_assoc();
        $price = $row['Price'];
    }

    $priceStatement->close();

    $insertQuery = "INSERT INTO orderitem (OrderID, product, Quantity, Price) VALUES (?, ?, ?, ?)";
    $insertStatement = $conn->prepare($insertQuery);

    if (!$insertStatement) {
        dieWithError("Prepare failed: (" . $conn->errno . ") " . $conn->error);
    }

    $insertStatement->bind_param('iiid', $orderID, $productID, $quantity, $price);
    $insertStatement->execute();

    $insertStatement->close();
}

function dieWithError($message)
{
    die(json_encode(array("error" => $message)));
}
?>
