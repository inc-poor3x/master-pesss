<?php

include '../conction.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

class UserHandler
{
    private $conn;

    public function __construct($conn)
    {
        $this->conn = $conn;
    }

    public function getTotalUsers()
    {
        $sql = "SELECT COUNT(*) as totalUsers FROM `user`";
        $result = $this->conn->query($sql);

        if ($result !== false && $result->num_rows > 0) {
            $row = $result->fetch_assoc();
            return $row['totalUsers'];
        } else {
            return false;
        }
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Create an instance of the UserHandler class
    $userHandler = new UserHandler($conn);

    // Get the total number of users
    $totalUsers = $userHandler->getTotalUsers();

    if ($totalUsers !== false) {
        echo json_encode(["totalUsers" => $totalUsers]);
    } else {
        echo json_encode(["error" => "Error retrieving total users"]);
    }
} else {
    echo json_encode(["error" => "Invalid request method"]);
}
?>
