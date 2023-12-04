<?php

include '../conction.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Get JSON data from the request body
    $data = json_decode(file_get_contents('php://input'), true);

    // Check if storeID is provided in the JSON data
    if (isset($data['storeID'])) {
        $storeID = $data['storeID'];

        // Use prepared statement to prevent SQL injection
        $stmt = $conn->prepare("SELECT * FROM product WHERE storeID = ?");
        $stmt->bind_param("i", $storeID);

        if ($stmt->execute()) {
            // Get result set
            $result = $stmt->get_result();

            if ($result && $result->num_rows > 0) {
                $responseData = $result->fetch_all(MYSQLI_ASSOC);
                echo json_encode($responseData);
            } else {
                echo "No products available for the specified storeID";
            }
        } else {
            echo "Error executing query: " . $stmt->error;
        }

        // Close the statement
        $stmt->close();
    } else {
        echo "storeID parameter is required in the JSON data";
    }

} else {
    echo "The request method is wrong";
}
// <!-- {
//     "storeID": 6
//   } -->
?>
