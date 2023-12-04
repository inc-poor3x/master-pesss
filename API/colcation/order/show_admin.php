<!-- SELECT o.*,u.UserName
FROM `order` o
JOIN `user` u ON u.UserID =o.UserID

SELECT o.*,u.UserName
FROM `order` o
JOIN `user` u ON u.UserID =o.UserID
WHERE o.UserID =5 -->


<?php

include '../conction.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    // Your SQL query to retrieve orders with user information
    $sql = "SELECT o.*, u.UserName
            FROM `order` o
            JOIN `user` u ON u.UserID = o.UserID";

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
    echo json_encode(["error" => "Invalid request method"]);
}
?>
