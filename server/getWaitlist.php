<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

include 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    // Retrieve all waitlist entries
    //echo json_encode(["successGet" => true]);
    $sql = "SELECT id, full_name, email, date_added, source, preferred_content, role FROM signups ORDER BY date_added DESC";
    //echo $sql;
    $result = $conn->query($sql);
    //echo json_encode($result);
    $waitlist = [];
    while ($row = $result->fetch_assoc()) {
        $waitlist[] = $row;
    }
    echo json_encode(["success" => true, "entries" => $waitlist]);
}

$conn->close();
?>
