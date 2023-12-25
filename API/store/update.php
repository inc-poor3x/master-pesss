<?php
include '../conction.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Content-Disposition");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    // Get the store_id from the URL parameter
    $storeIdToUpdate = isset($_GET['store_id']) ? $_GET['store_id'] : null;
    
    if (!$storeIdToUpdate) {
        echo json_encode(["error" => "Missing or invalid store_id parameter in the URL"]);
        exit;
    }

    parse_str(file_get_contents("php://input"), $data);

    $updateClause = [];

    if ($newStoreName = isset($data['new_store_name']) ? $data['new_store_name'] : null) {
        $updateClause[] = "StoreName = '" . $conn->real_escape_string($newStoreName) . "'";
    }
    if ($newCategory = isset($data['new_category']) ? $data['new_category'] : null) {
        $updateClause[] = "Category = '" . $conn->real_escape_string($newCategory) . "'";
    }
    if (isset($data['new_is_active'])) {
        $updateClause[] = "IsActive = '" . $conn->real_escape_string($data['new_is_active']) . "'";
    }
    if (isset($_FILES['new_store_image']) && $_FILES['new_store_image']['error'] == 0) {
        $target_dir = "../../view/Home/assets/images/";
        $target_file = $target_dir . basename($_FILES["new_store_image"]["name"]);

        if (move_uploaded_file($_FILES["new_store_image"]["tmp_name"], $target_file)) {
            $updateClause[] = "StoreImage = '" . $conn->real_escape_string($target_file) . "'";
        } else {
            echo json_encode(["error" => "Sorry, there was an error uploading your file."]);
            exit;
        }
    }

    if (!empty($updateClause)) {
        $updateSQL = implode(", ", $updateClause);
        $sql = "UPDATE store SET $updateSQL WHERE StoreID = '" . $conn->real_escape_string($storeIdToUpdate) . "'";

        if ($conn->query($sql) === TRUE) {
            echo json_encode(["message" => "Store updated successfully"]);
        } else {
            echo json_encode(["error" => "Error updating store: " . $conn->error]);
        }
    } else {
        echo json_encode(["error" => "No valid update parameters provided"]);
    }
} else {
    echo json_encode(["error" => "Invalid request method"]);
}
?>
