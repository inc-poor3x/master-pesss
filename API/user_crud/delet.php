<?php

include '/xampp/htdocs/master-pes/conction.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $data = json_decode(file_get_contents('php://input'), true);
    $userid = $data['UserID'];
    if (isset($userid)) {
        $sql = "DELETE FROM user WHERE RoleID=2 AND UserID=$userid";

        // Perform the database operation
        $result = mysqli_query($conn, $sql);

        if ($result) {
            $response = array('success' => true, 'message' => 'User deleted successfully');
            echo json_encode($response);
        } else {
            $response = array('success' => false, 'message' => 'Failed to delete user');
            echo json_encode($response);
        }

        // Close the database connection
        mysqli_close($conn);
    } else {
        echo "No data sent";
    }
} else {
    echo "You are using the wrong method to delete";
}
