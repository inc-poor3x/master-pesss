<?php

include '../conction.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data['userID'])) {
        $userId = $data['userID'];

        $updateFields = [];

        if (!empty($data['UserName'])) {
            $updateFields[] = "`UserName`='{$data['UserName']}'";
        }

        if (!empty($data['Password'])) {
            // Hash the new password
            $hashedPassword = password_hash($data['Password'], PASSWORD_DEFAULT);
            $updateFields[] = "`Password`='$hashedPassword'";
        }

        if (!empty($data['Email'])) {
            $updateFields[] = "`Email`='{$data['Email']}'";
        }

        if (!empty($data['RoleID'])) {
            $updateFields[] = "`RoleID`='{$data['RoleID']}'";
        }

        if (!empty($data['imag'])) {
            $updateFields[] = "`imag`='{$data['imag']}'";
        }

        if (!empty($updateFields)) {
            $updateString = implode(", ", $updateFields);

            $sql = "UPDATE `user` SET {$updateString} WHERE UserID={$userId}";

            // Execute the query
            // Assuming $conn is your database connection
            if ($conn->query($sql) === TRUE) {
                if ($conn->affected_rows > 0) {
                    echo json_encode(["message" => "Record updated successfully"]);
                } else {
                    echo json_encode(["error" => "User with ID {$userId} not found"]);
                }
            } else {
                echo json_encode(["error" => "Error updating record: " . $conn->error]);
            }

            // Close the database connection
            $conn->close();
        } else {
            echo json_encode(["error" => "No fields to update"]);
        }
    } else {
        echo json_encode(["error" => "Invalid data"]);
    }
} else {
    echo json_encode(["error" => "Invalid request method"]);
}
?>
