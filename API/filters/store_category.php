<?php

include '../conction.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    // Validate required fields
    if (!empty($data['Category'])) {
        $category = $data['Category'];

        // Your SQL query to retrieve stores based on the category
        $sql = "SELECT s.*, u.UserName as OwnerName
                FROM `store` s
                JOIN `user` u ON u.UserID = s.UserID
                WHERE s.Category = ?";

        // Use prepared statement to prevent SQL injection
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $category);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result) {
            $stores = array();

            while ($row = $result->fetch_assoc()) {
                $stores[] = $row;
            }

            echo json_encode($stores);
        } else {
            echo json_encode(["error" => "Error retrieving stores: " . $conn->error]);
        }

        $stmt->close();
    } else {
        echo json_encode(["error" => "Invalid or missing Category parameter"]);
    }
} else {
    echo json_encode(["error" => "Invalid request method"]);
}
?>
