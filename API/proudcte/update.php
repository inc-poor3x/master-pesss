<?php

include '../conction.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve form data
    $productId = isset($_POST['productID']) ? $_POST['productID'] : null;
    $productName = isset($_POST['ProductName']) ? $_POST['ProductName'] : null;
    $description = isset($_POST['Description']) ? $_POST['Description'] : null;
    $price = isset($_POST['Price']) ? $_POST['Price'] : null;
    $quantity = isset($_POST['Quantity']) ? $_POST['Quantity'] : null;
    $categoryId = isset($_POST['categoryID']) ? $_POST['categoryID'] : null;
    $storeId = isset($_POST['StoreID']) ? $_POST['StoreID'] : null;

    // Check if required fields are provided
    if ($productId) {
        $updateFields = [];
        $params = [];
        $types = '';

        if ($productName) {
            $updateFields[] = "ProductName=?";
            $params[] = $productName;
            $types .= 's';
        }

        if ($description) {
            $updateFields[] = "Description=?";
            $params[] = $description;
            $types .= 's';
        }

        if ($price !== null) {
            $updateFields[] = "Price=?";
            $params[] = $price;
            $types .= 'd';
        }

        if ($quantity !== null) {
            $updateFields[] = "Quantity=?";
            $params[] = $quantity;
            $types .= 'i';
        }

        if ($categoryId) {
            $updateFields[] = "categoryID=?";
            $params[] = $categoryId;
            $types .= 'i';
        }

        if ($storeId) {
            $updateFields[] = "StoreID=?";
            $params[] = $storeId;
            $types .= 'i';
        }

        // Handle Image Upload
        if (isset($_FILES['Image']) && $_FILES['Image']['error'] == 0) {
            $target_dir = "../../view/Home/assets/images/";
            $target_file = $target_dir . basename($_FILES["Image"]["name"]);

            if (move_uploaded_file($_FILES["Image"]["tmp_name"], $target_file)) {
                $updateFields[] = "Image=?";
                $params[] = basename($_FILES["Image"]["name"]);
                $types .= 's';
            } else {
                echo json_encode(["error" => "Sorry, there was an error uploading your file."]);
                exit;
            }
        }

        if (!empty($updateFields)) {
            $updateString = implode(", ", $updateFields);
            array_push($params, $productId); // append productID at the end
            $types .= 'i'; // Add type for ProductID

            $sql = "UPDATE product SET $updateString WHERE ProductID=?";
            $stmt = $conn->prepare($sql);

            // Bind parameters
            $stmt->bind_param($types, ...$params);

            if ($stmt->execute()) {
                echo json_encode(["message" => "Product updated successfully"]);
            } else {
                echo json_encode(["error" => "Error updating product: " . $stmt->error]);
            }

            $stmt->close();
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
