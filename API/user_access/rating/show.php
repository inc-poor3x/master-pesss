<?php
include '../conction.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    // Use prepared statement to prevent SQL injection
    $data = json_decode(file_get_contents('php://input'), true);

    $ProductID = $_GET['ProductID'];
    $stmt = $conn->prepare("
    SELECT r.*, u.UserName as UserName, p.ProductName as ProductName
    FROM rating r
    INNER JOIN user u ON r.UserID = u.UserID
    INNER JOIN product p ON r.ProductID = p.ProductID
    WHERE r.ProductID = $ProductID;
    ");
    
    if ($stmt->execute()) {
        // Get result set
        $result = $stmt->get_result();
        
        // Fetch and echo each row individually
        while ($row = $result->fetch_assoc()) {
            echo json_encode($row) . "\n";
        }
    } else {
        echo "Error retrieving ratings: " . $stmt->error;
    }

    // Close the statement
    $stmt->close();
} else {
    echo "Invalid request method";
}
?>
