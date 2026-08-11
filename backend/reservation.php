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
?>