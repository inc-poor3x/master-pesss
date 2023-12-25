<?php
include '../conction.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $storeId = isset($_POST['StoreID']) ? $_POST['StoreID'] : null;
    $productName = isset($_POST['ProductName']) ? $_POST['ProductName'] : null;
    $description = isset($_POST['Description']) ? $_POST['Description'] : null;
    $price = isset($_POST['Price']) ? $_POST['Price'] : null;
    $quantity = isset($_POST['Quantity']) ? $_POST['Quantity'] : null;
    $categoryId = isset($_POST['categoryID']) ? $_POST['categoryID'] : null;

    if ($storeId && $productName && $description && $price && $quantity && $categoryId) {
        $image = null;

        if (isset($_FILES['Image']) && $_FILES['Image']['error'] == 0) {
            $target_dir = "../../view/Home/assets/images/";
            $target_file = $target_dir . basename($_FILES["Image"]["name"]);

            // Image validation logic here

            if (move_uploaded_file($_FILES["Image"]["tmp_name"], $target_file)) {
                $image = basename($_FILES["Image"]["name"]); // Store only the file name
            } else {
                echo json_encode(["error" => "Sorry, there was an error uploading your file."]);
                exit;
            }
        }

        $stmt = $conn->prepare("INSERT INTO product (StoreID, ProductName, Description, Price, Quantity, categoryID, Image) VALUES (?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("isssiis", $storeId, $productName, $description, $price, $quantity, $categoryId, $image);

        if ($stmt->execute()) {
            $insertedData = [
                'StoreID' => $storeId,
                'ProductName' => $productName,
                'Description' => $description,
                'Price' => $price,
                'Quantity' => $quantity,
                'categoryID' => $categoryId,
                'Image' => $image
            ];

            echo json_encode(['message' => 'Data inserted successfully', 'data' => $insertedData]);
        } else {
            echo json_encode(['message' => 'Data not inserted: ' . $stmt->error]);
        }

        $stmt->close();
    } else {
        echo json_encode(['message' => 'Required fields not set']);
    }
} else {
    echo json_encode(['message' => 'Invalid request method']);
}
?>
