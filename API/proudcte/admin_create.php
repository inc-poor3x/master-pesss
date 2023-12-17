<?php

include '../conction.php';
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Allow-Headers: Content-Type");
    exit;
}


if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (
        isset($data['ProductName']) &&
        isset($data['Description']) &&
        isset($data['Price']) &&
        isset($data['Quantity']) &&
        isset($data['categoryID']) &&
        isset($data['Image'])
    ) {
        $stmt = $conn->prepare("INSERT INTO product (ProductName, Description, Price, Quantity, categoryID, Image) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("ssdiis", $data['ProductName'], $data['Description'], $data['Price'], $data['Quantity'], $data['categoryID'], $data['Image']);

        if ($stmt->execute()) {
            // Set HTTP response status code
            http_response_code(201); // Created

            echo json_encode([
                'message' => 'Data inserted successfully',
                'data' => $data
            ]);
        } else {
            // Set HTTP response status code
            http_response_code(500); // Internal Server Error

            echo json_encode([
                'error' => 'Data not inserted',
                'details' => $stmt->error
            ]);
        }

        $stmt->close();
    } else {
        // Set HTTP response status code
        http_response_code(400); // Bad Request

        echo json_encode(['error' => 'Required fields not set']);
    }
} else {
    // Set HTTP response status code
    http_response_code(405); // Method Not Allowed

    echo json_encode(['error' => 'Request method not allowed']);
}
?>