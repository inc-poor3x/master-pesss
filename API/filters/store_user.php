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

        // Your SQL query to retrieve user details
        $sql = "SELECT u.*, s.StoreName, s.Category as StoreCategory
                FROM `user` u
                LEFT JOIN `store` s ON u.UserID = s.UserID
                WHERE u.UserID = $userId";

        $result = $conn->query($sql);

        if ($result) {
            $userDetails = $result->fetch_assoc();

            if ($userDetails) {
                echo json_encode($userDetails);
            } else {
                echo json_encode(["error" => "User not found"]);
            }
        } else {
            echo json_encode(["error" => "Error executing query: " . $conn->error]);
        }
    } else {
        echo json_encode(["error" => "Invalid or missing UserID parameter"]);
    }
} else {
    echo json_encode(["error" => "Invalid request method"]);
}
?>
