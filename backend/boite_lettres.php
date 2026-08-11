<?php
include 'config.php';

function envoyerMessage($utilisateur_id, $titre, $message, $type = 'info') {
    global $conn;

    $sql = "INSERT INTO boite_aux_lettres (utilisateur_id, titre, message, type)
            VALUES ('$utilisateur_id', '$titre', '$message', '$type')";

    return $conn->query($sql);
}

function getMessages($utilisateur_id) {
    global $conn;

    $sql = "SELECT * FROM boite_aux_lettres WHERE utilisateur_id = '$utilisateur_id' ORDER BY date_envoi DESC";
    $result = $conn->query($sql);

    $messages = [];
    while ($row = $result->fetch_assoc()) {
        $messages[] = $row;
    }

    return $messages;
}
?>