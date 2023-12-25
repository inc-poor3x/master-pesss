<?php

include '../conction.php';
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header('Content-Type: application/json');
    exit();
}



if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (
        isset($data['UserName']) &&
        isset($data['Password']) &&
        isset($data['Email'])
    ) {
        $hashedPassword = password_hash($data['Password'], PASSWORD_DEFAULT);

        $stmt = $conn->prepare("INSERT INTO user (UserName, Password, Email) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $data['UserName'], $hashedPassword, $data['Email']);

        if ($stmt->execute()) {
            // Set HTTP response status code
            http_response_code(200); // OK

            // Return the inserted data as JSON
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