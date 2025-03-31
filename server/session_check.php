<?php
session_start();
header("Content-Type: application/json");

if (!isset($_SESSION['admin'])) {
    echo json_encode(["status" => "unauthorized", "message" => "Unauthorized"]);
    exit; // Stop further execution
}
?>