<?php

include '../conction.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $UserId = $_GET['id'];

    $sql = "SELECT * FROM user where UserID = $UserId";
    
    $result =  $conn->query($sql);

    if ($result && $result->num_rows > 0) {
        $data = array();

        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }

        echo json_encode($data);
    } else {
        echo "no data available";
    }

} else {
    echo "the request method is wrong";
}
?>
