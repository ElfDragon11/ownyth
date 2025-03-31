<?php
session_start();
require 'db.php';

// Ensure admin is logged in
if (!isset($_SESSION['admin'])) {
    die("Unauthorized");
}

header("Content-Type: text/csv");
header("Content-Disposition: attachment; filename=waitlist.csv");

$output = fopen("php://output", "w");
fputcsv($output, ["Name", "Email"]);

$stmt = $pdo->query("SELECT name, email FROM waitlist");
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    fputcsv($output, $row);
}

fclose($output);
?>
