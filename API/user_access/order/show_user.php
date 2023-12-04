<?php

include '../conction.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    // Validate required fields
    if (!empty($data['UserID'])) {
        $userId = intval($data['UserID']);

        // Your SQL query to retrieve orders with user information for a specific UserID
        $sql = "SELECT o.*, u.UserName
                FROM `order` o
                JOIN `user` u ON u.UserID = o.UserID
                WHERE o.UserID = $userId";

        $result = $conn->query($sql);

        if ($result) {
            $orders = array();

            while ($row = $result->fetch_assoc()) {
                $orders[] = $row;
            }

            echo json_encode($orders);
        } else {
            echo json_encode(["error" => "Error retrieving orders: " . $conn->error]);
        }
    } else {
        echo json_encode(["error" => "Invalid or missing UserID parameter"]);
    }
} else {
    echo json_encode(["error" => "Invalid request method"]);
}
?>
