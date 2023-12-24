<?php

include '../conction.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (
        isset($_POST['ProductName']) &&
        isset($_POST['Description']) &&
        isset($_POST['Price']) &&
        isset($_POST['Quantity']) &&
        isset($_POST['categoryID']) &&
        isset($_POST['StoreID']) &&
        isset($_FILES['Image'])
    ) {
        $productName = $_POST['ProductName'];
        $description = $_POST['Description'];
        $price = $_POST['Price'];
        $quantity = $_POST['Quantity'];
        $categoryId = $_POST['categoryID'];
        $storeId = $_POST['StoreID'];

        // Handle the image file upload
     // Handle the image file upload
     $target_dir = "../../view/Home/assets/images/";
     $target_file = $target_dir . basename($_FILES["Image"]["name"]);
     if (move_uploaded_file($_FILES["Image"]["tmp_name"], $target_file)) {
         $image = basename($_FILES["Image"]["name"]); // This is just the file name
     
         $stmt = $conn->prepare("INSERT INTO product (ProductName, Description, Price, Quantity, categoryID, Image, StoreID) VALUES (?, ?, ?, ?, ?, ?, ?)");
         $stmt->bind_param("ssdiisi", $productName, $description, $price, $quantity, $categoryId, $image, $storeId);


            if ($stmt->execute()) {
                http_response_code(201); // Created
                echo json_encode([
                    'message' => 'Data inserted successfully',
                    'data' => $_POST
                ]);
            } else {
                http_response_code(500); // Internal Server Error
                echo json_encode([
                    'error' => 'Data not inserted',
                    'details' => $stmt->error
                ]);
            }

            $stmt->close();
        } else {
            http_response_code(500); // Internal Server Error
            echo json_encode(['error' => 'Failed to upload image']);
        }
    } else {
        http_response_code(400); // Bad Request
        echo json_encode(['error' => 'Required fields not set']);
    }
} else {
    http_response_code(405); // Method Not Allowed
    echo json_encode(['error' => 'Request method not allowed']);
}
?>
