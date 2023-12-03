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

    if (isset($data['username_or_email']) && isset($data['password'])) {
        // Get user input from the JSON payload
        $usernameOrEmail = $data['username_or_email'];
        $password = $data['password'];

        // Check if the input is an email or username
        $identifierType = filter_var($usernameOrEmail, FILTER_VALIDATE_EMAIL) ? 'Email' : 'UserName';

        // Check if the user exists in the database
        $sql = "SELECT * FROM `user` WHERE `$identifierType` = '$usernameOrEmail'";
        $result = $conn->query($sql);

        if ($result && $result->num_rows > 0) {
            $row = $result->fetch_assoc();
            // Verify the password
            if (password_verify($password, $row['Password'])) {
                echo json_encode(["message" => "Login successful"]);
            } else {
                echo json_encode(["error" => "Invalid password"]);
            }
        } else {
            echo json_encode(["error" => "User not found"]);
        }
    } else {
        echo json_encode(["error" => "Missing required fields in the JSON data"]);
    }
} else {
    echo json_encode(["error" => "Invalid request method"]);
}

?>
