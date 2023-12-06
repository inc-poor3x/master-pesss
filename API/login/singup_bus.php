<?php

include '../conction.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    // Validate required fields
    $requiredFields = ['UserName', 'Password', 'Email', 'StoreName', 'Category'];
    if (areFieldsValid($data, $requiredFields)) {
        // User data
        $userName = $data['UserName'];
        $password = password_hash($data['Password'], PASSWORD_DEFAULT); // Hash the password
        $email = $data['Email'];

        // Store data
        $storeName = $data['StoreName'];
        $category = $data['Category'];
        $storeImage = !empty($data['StoreImage']) ? $data['StoreImage'] : ''; // Set default value to an empty string

        // Constants
        $roleId = 2; // Adjust based on your role IDs
        $storeIsActive = 1; // Store is initially inactive

        // Insert new user into the database
        $insertUserQuery = "INSERT INTO `user` (`UserName`, `Password`, `Email`, `RoleID`) 
                            VALUES (?, ?, ?, ?)";

        $stmtUser = $conn->prepare($insertUserQuery);
        $stmtUser->bind_param("sssi", $userName, $password, $email, $roleId);

        if ($stmtUser->execute()) {
            $userId = $conn->insert_id;

            // Insert new store into the database
            $insertStoreQuery = "INSERT INTO `store` (`UserID`, `StoreName`, `Category`, `StoreImage`, `IsActive`) 
                                VALUES (?, ?, ?, ?, ?)";

            $stmtStore = $conn->prepare($insertStoreQuery);
            $stmtStore->bind_param("isssi", $userId, $storeName, $category, $storeImage, $storeIsActive);

            if ($stmtStore->execute()) {
                echo json_encode(["message" => "User and store created successfully"]);
            } else {
                echo json_encode(["error" => "Error creating store: " . $stmtStore->error]);
            }

            $stmtStore->close();
        } else {
            echo json_encode(["error" => "Error creating user: " . $stmtUser->error]);
        }

        $stmtUser->close();
    } else {
        echo json_encode(["error" => "Invalid data. Please provide required fields"]);
    }
} else {
    echo json_encode(["error" => "Invalid request method"]);
}

function areFieldsValid($data, $requiredFields) {
    foreach ($requiredFields as $field) {
        if (empty($data[$field]) && $data[$field] !== '0') {
            return false;
        }
    }
    return true;
}
?>
