<?php

include "../conction.php"; // Adjust the path as needed
include "cart_oop.php";
 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Get the JSON data from the request body
$inputData = json_decode(file_get_contents("php://input"), true);

// Assuming you have the following data from the API request
$userID = $inputData['UserID'] ?? null;

// Check for missing or invalid data
if ($userID === null) {
    echo json_encode(["success" => false, "message" => "Missing or invalid user ID."]);
    exit;
}

// Initialize the Cart object outside the if block to avoid undefined variable error
$cart = new Cart($conn);

// Handle GET requests to retrieve total value in the cart
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        // Retrieve total value in the cart
        $result = $cart->getTotalInCart($userID);

        echo json_encode($result);
    } catch (Exception $e) {
        echo json_encode(["success" => false, "message" => "Error: " . $e->getMessage()]);
    }
} else {
    // Handle other request methods (if needed)
    echo json_encode(["success" => false, "message" => $_SERVER['REQUEST_METHOD'] . " is an invalid request method."]);
}

// Close the database connection
$conn->close();
?>
