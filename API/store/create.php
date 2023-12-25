<?php
include '../conction.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = $_POST; // Use $_POST to access form data

    // Validate required fields
    if (!empty($data['UserID']) && !empty($data['StoreName']) && !empty($data['Category']) && isset($data['IsActive'])) {
        $userId = $data['UserID'];
        $storeName = $data['StoreName'];
        $category = $data['Category'];
        $isActive = $data['IsActive'];

        // Handle Image Upload
        $storeImage = null;
        if (isset($_FILES['StoreImage'])) {
            $target_dir = "../../view/Home/assets/images/";
            
            // Generate a unique filename
            $timestamp = time();
            $randomString = bin2hex(random_bytes(5)); // Generate a random string
            $originalFilename = basename($_FILES["StoreImage"]["name"]);
            $imageFileType = strtolower(pathinfo($originalFilename, PATHINFO_EXTENSION));
            $uniqueFilename = $timestamp . '_' . $randomString . '.' . $imageFileType;

            $target_file = $target_dir . $uniqueFilename;

            // Image validation and upload logic...
            // ...

            // Move the uploaded file to the desired directory
            if (move_uploaded_file($_FILES["StoreImage"]["tmp_name"], $target_file)) {
                $storeImage = $target_file;
            } else {
                echo json_encode(["error" => "Sorry, there was an error uploading your file."]);
                exit;
            }
        }

        // Insert new store into the database
        $sql = "INSERT INTO `store` (`UserID`, `StoreName`, `Category`, `StoreImage`, `IsActive`) 
                VALUES ('$userId', '$storeName', '$category', '$storeImage', '$isActive')";

        if ($conn->query($sql) === TRUE) {
            // Update user's RoleID to 3
            $updateRoleSql = "UPDATE `user` SET `RoleID` = 3 WHERE `UserID` = '$userId'";
            if ($conn->query($updateRoleSql) === TRUE) {
                echo json_encode(["message" => "Store created and user role updated successfully"]);
            } else {
                echo json_encode(["error" => "Error updating user role: " . $conn->error]);
            }
        } else {
            echo json_encode(["message" => "Store created and user role updated successfully"]);
        }
    } else {
        echo json_encode(["error" => "Invalid data. Please provide UserID, StoreName, Category, and IsActive"]);
    }
} else {
    echo json_encode(["error" => "Invalid request method"]);
}
?>
