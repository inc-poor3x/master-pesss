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
        if (isset($_FILES['StoreImage'])) {
            $target_dir = "../../view/Home/assets/images"; // specify the directory where you want to save the image
            $target_file = $target_dir . basename($_FILES["StoreImage"]["name"]);
            $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

            // Image validation and upload logic as before

            // Check if image file is a actual image or fake image
            // ...

            // Move the uploaded file to the desired directory
            if (!move_uploaded_file($_FILES["StoreImage"]["tmp_name"], $target_file)) {
                echo json_encode(["error" => "Sorry, there was an error uploading your file."]);
                exit;
            }

            $storeImage = $target_file;
        } else {
            $storeImage = null;
        }

        // Insert new store into the database
        $sql = "INSERT INTO `store` (`UserID`, `StoreName`, `Category`, `StoreImage`, `IsActive`) 
                VALUES ('$userId', '$storeName', '$category', '$storeImage', '$isActive')";

        if ($conn->query($sql) === TRUE) {
            echo json_encode(["message" => "Store created successfully"]);
        } else {
            echo json_encode(["error" => "Error creating store: " . $conn->error]);
        }
    } else {
        echo json_encode(["error" => "Invalid data. Please provide UserID, StoreName, Category, and IsActive"]);
    }
} else {
    echo json_encode(["error" => "Invalid request method"]);
}
?>
