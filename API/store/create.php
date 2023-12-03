<?php

include '../conction.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    // Validate required fields
    if (!empty($data['UserID']) && !empty($data['StoreName']) && !empty($data['Category']) && isset($data['IsActive'])) {
        $userId = $data['UserID'];
        $storeName = $data['StoreName'];
        $category = $data['Category'];
        $isActive = $data['IsActive'];

        // Insert new store into the database
        $sql = "INSERT INTO `store` (`UserID`, `StoreName`, `Category`, `IsActive`) 
                VALUES ('$userId', '$storeName', '$category', '$isActive')";

        if ($conn->query($sql) === TRUE) {
            echo json_encode(["message" => "Store created successfully"]);
        } else {
            echo json_encode(["error" => "Error creating store: " . $conn->error]);
        }
    } else {
        echo json_encode(["error" => "Invalid data. Please provide UserID, StoreName, Category, and IsActive"]);
    }
} else {
    echo json_encode(["error" => "Invalid request method"]);
}

?>

<!-- {
  "UserID": 5,
  "StoreName": "Test Store",
  "Category": "Electronics",
  "IsActive": 1
} -->
