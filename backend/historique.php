<?php
include 'config.php';

function getReservations($utilisateur_id) {
    global $conn;

    $sql = "SELECT * FROM reservations WHERE utilisateur_id = '$utilisateur_id' ORDER BY date DESC";
    $result = $conn->query($sql);

    $reservations = [];
    while ($row = $result->fetch_assoc()) {
        $reservations[] = $row;
    }

    return $reservations;
}
?>