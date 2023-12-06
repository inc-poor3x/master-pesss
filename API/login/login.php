<?php
include '../conction.php';
include "User.php";

// CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Check the request method
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the JSON data from the request body
    $inputData = json_decode(file_get_contents("php://input"), true);

    // Check if data is present in the request
    if (!$inputData || !isset($inputData['Username']) || !isset($inputData['Password'])) {
        echo json_encode(array("success" => false, "message" => "Invalid request data."));
        exit();
    }

    // Assuming you have the following data from the API request
    $username = $inputData['Username'];
    $password = $inputData['Password'];

    // Check if the database connection was successful
    if (!$conn) {
        echo json_encode(array("success" => false, "message" => "Database connection failed."));
        exit();
    }

    // Create a new User instance
    $user = new User($conn);

    // Login the user
    $result = $user->login($username, $password);

    // Echo the result in JSON format
    echo json_encode($result);
} else {
    // Unsupported request method
    echo json_encode(array("success" => false, "message" => $_SERVER['REQUEST_METHOD']." is an unsupported request method."));
}

// Close the database connection
$conn->close();
?>
