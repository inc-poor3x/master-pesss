<?php

include '../conction.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
    $data = json_decode(file_get_contents('php://input'), true);

    // Validate required fields
    if (!empty($data['storeID']) && isset($data['isActive'])) {
        $storeId = intval($data['storeID']);
        $isActive = intval($data['isActive']); // Assuming isActive is an integer (1 or 2)

        // Use prepared statement to prevent SQL injection
        $sql = "UPDATE `store` SET `IsActive` = ? WHERE `StoreID` = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ii", $isActive, $storeId);

        if ($stmt->execute()) {
            echo json_encode(["success" => "Store status updated successfully"]);
        } else {
            echo json_encode(["error" => "Error updating store status: " . $stmt->error]);
        }

        $stmt->close();
    } else {
        echo json_encode(["error" => "Invalid or missing parameters"]);
    }
} else {
    echo json_encode(["error" => "Invalid request method"]);
}

?>
