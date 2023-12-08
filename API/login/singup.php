<?php

include '../conction.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get JSON data from the request body
    $json_data = file_get_contents('php://input');
    $data = json_decode($json_data, true);

    if (isset($data['username']) && isset($data['password']) && isset($data['email'])) {
        // Get user data from the JSON payload
        $username = $data['username'];
        $password = $data['password'];
        $email = $data['email'];

        // Hash the password before storing it in the database
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        // Insert user data into the 'user' table
        $sql = "INSERT INTO `user` (`UserName`, `Password`, `Email`) VALUES ('$username', '$hashedPassword', '$email')";

        if ($conn->query($sql) === TRUE) {
            echo json_encode(["message" => "User registered successfully"]);
        } else {
            echo json_encode(["error" => "Error registering user: " . $conn->error]);
        }
    } else {
        echo json_encode(["error" => "Missing required fields in the JSON data"]);
    }
} else {
    echo json_encode(["error" => "Invalid request method"]);
}

?>

