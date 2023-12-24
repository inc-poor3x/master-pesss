<?php
include '../conction.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Content-Disposition");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    parse_str(file_get_contents("php://input"), $data);

    $userIdToUpdate = isset($data['user_id']) ? $data['user_id'] : null;
    $storeIdToUpdate = isset($data['store_id']) ? $data['store_id'] : null;
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

    if ($userIdToUpdate && $storeIdToUpdate && !empty($updateClause)) {
        $updateSQL = implode(", ", $updateClause);
        $sql = "UPDATE store SET $updateSQL WHERE UserID = '" . $conn->real_escape_string($userIdToUpdate) . "' AND StoreID = '" . $conn->real_escape_string($storeIdToUpdate) . "'";

        if ($conn->query($sql) === TRUE) {
            echo json_encode(["message" => "Store updated successfully"]);
        } else {
            echo json_encode(["error" => "Error updating store: " . $conn->error]);
        }
    } else {
        echo json_encode(["error" => "Invalid or missing parameters for store update"]);
    }
} else {
    echo json_encode(["error" => "Invalid request method"]);
}
?>
