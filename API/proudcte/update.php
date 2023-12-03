<?php

include '../conction.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data['productID'])) {
        $productId = $data['productID'];

        $updateFields = [];
        $params = [];

        if (!empty($data['categoryID'])) {
            $updateFields[] = "`categoryID`=?";
            $params[] = $data['categoryID'];
        }

        if (!empty($data['StoreID'])) {
            $updateFields[] = "`StoreID`=?";
            $params[] = $data['StoreID'];
        }

        if (!empty($data['ProductName'])) {
            $updateFields[] = "`ProductName`=?";
            $params[] = $data['ProductName'];
        }

        if (!empty($data['Description'])) {
            $updateFields[] = "`Description`=?";
            $params[] = $data['Description'];
        }

        if (!empty($data['Price'])) {
            $updateFields[] = "`Price`=?";
            $params[] = $data['Price'];
        }

        if (!empty($data['Quantity'])) {
            $updateFields[] = "`Quantity`=?";
            $params[] = $data['Quantity'];
        }

        if (!empty($updateFields)) {
            $updateString = implode(", ", $updateFields);

            $sql = "UPDATE `product` SET {$updateString} WHERE ProductID=?";
            $params[] = $productId;

            try {
                $stmt = $conn->prepare($sql);

                // Bind parameters
                $types = str_repeat('s', count($params) - 1) . 'i'; // Assuming all parameters are strings except the last one which is an integer
                $stmt->bind_param($types, ...$params);

                // Execute the query
                $stmt->execute();

                echo json_encode(["message" => "Product updated successfully"]);
            } catch (mysqli_sql_exception $e) {
                echo json_encode(["error" => "Error updating product: " . $e->getMessage()]);
            } finally {
                // Close the statement
                $stmt->close();

                // Close the database connection
                $conn->close();
            }
        } else {
            echo json_encode(["error" => "No fields to update"]);
        }
    } else {
        echo json_encode(["error" => "Invalid data"]);
    }
} else {
    echo json_encode(["error" => "Invalid request method"]);
}
?>
