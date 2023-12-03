<?php

include '../conction.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    // Check if required fields are set
    if (
        isset($data['StoreID']) &&
        isset($data['ProductName']) &&
        isset($data['Description']) &&
        isset($data['Price']) &&
        isset($data['Quantity']) &&
        isset($data['IsAntique'])
    ) {
        // Use prepared statement to prevent SQL injection
        $stmt = $conn->prepare("INSERT INTO product (StoreID, ProductName, Description, Price, Quantity, IsAntique) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("isssii", $data['StoreID'], $data['ProductName'], $data['Description'], $data['Price'], $data['Quantity'], $data['IsAntique']);

        if ($stmt->execute()) {
            echo "data inserted successfully";

            // You should probably return the inserted data as JSON, so encode and echo it
            echo json_encode($data);
        } else {
            echo "data not inserted: " . $stmt->error;
        }

        // Close the statement
        $stmt->close();
    } else {
        echo "required fields not set";
    }
} else {
    echo "request method false";
}