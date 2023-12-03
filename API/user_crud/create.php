<?php

include '/xampp/htdocs/master-pes/conction.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    // Check if required fields are set
    if (
        isset($data['UserName']) &&
        isset($data['Password']) &&
        isset($data['Email']) &&
        isset($data['imag']) &&
        isset($data['IsActive'])
    ) {
        // Hash the password
        $hashedPassword = password_hash($data['Password'], PASSWORD_DEFAULT);

        // Use prepared statement to prevent SQL injection
        $stmt = $conn->prepare("INSERT INTO user (UserName, Password, Email, imag, IsActive) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param("ssssi", $data['UserName'], $hashedPassword, $data['Email'], $data['imag'], $data['IsActive']);

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


