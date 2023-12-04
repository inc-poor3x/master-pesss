<?php

include '../conction.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    // Validate required fields
    if (!empty($data['StoreID']) && !empty($data['UserID'])) {
        $storeId = intval($data['StoreID']);
        $userId = intval($data['UserID']);

        // Your SQL query to retrieve order items with user, product, store, and category information
        $sql = "SELECT oi.*, u.UserName, p.ProductName, s.StoreName, c.Category_name
                FROM `orderitem` oi
                JOIN `order` o ON oi.OrderID = o.OrderID
                JOIN `user` u ON u.UserID = o.UserID
                JOIN `product` p ON p.ProductID = oi.product
                JOIN `store` s ON s.StoreID = p.StoreID
                JOIN `category` c ON c.categoryID = p.categoryID
                WHERE s.StoreID = $storeId AND u.UserID = $userId";

        $result = $conn->query($sql);

        if ($result) {
            $orderItems = array();

            while ($row = $result->fetch_assoc()) {
                $orderItems[] = $row;
            }

            echo json_encode($orderItems);
        } else {
            echo json_encode(["error" => "Error executing query: " . $conn->error]);
        }
    } else {
        echo json_encode(["error" => "Invalid or missing StoreID or UserID parameter"]);
    }
} else {
    echo json_encode(["error" => "Invalid request method"]);
}
?>
