<?php
include 'config.php';

function ajouterReservation($utilisateur_id, $depart, $destination, $date, $heure, $vehicule, $paiement, $distance, $duree, $prix) {
    global $conn;

    $sql = "INSERT INTO reservations (utilisateur_id, depart, destination, date, heure, vehicule, paiement, distance, duree, prix)
            VALUES ('$utilisateur_id', '$depart', '$destination', '$date', '$heure', '$vehicule', '$paiement', '$distance', '$duree', '$prix')";

    if ($conn->query($sql) === TRUE) {
        return ["success" => true, "message" => "Réservation enregistrée."];
    } else {
        return ["success" => false, "message" => "Erreur : " . $conn->error];
    }
}

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $utilisateur_id = $_POST['utilisateur_id'] ?? 1;
    $depart = $_POST['depart'] ?? '';
    $destination = $_POST['destination'] ?? '';
    $date = $_POST['date'] ?? '';
    $heure = $_POST['heure'] ?? '';
    $vehicule = $_POST['vehicule'] ?? '';
    $paiement = $_POST['paiement'] ?? '';
    $distance = $_POST['distance'] ?? 0;
    $duree = $_POST['duree'] ?? 0;
    $prix = $_POST['prix'] ?? 0;

    $result = ajouterReservation($utilisateur_id, $depart, $destination, $date, $heure, $vehicule, $paiement, $distance, $duree, $prix);
    echo json_encode($result);
}
?>