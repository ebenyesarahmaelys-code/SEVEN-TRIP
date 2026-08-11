<?php
include 'config.php';

function ajouterPoints($utilisateur_id, $points) {
    global $conn;

    $sql = "UPDATE utilisateurs SET points = points + $points WHERE id = '$utilisateur_id'";
    return $conn->query($sql);
}

function getPoints($utilisateur_id) {
    global $conn;

    $sql = "SELECT points FROM utilisateurs WHERE id = '$utilisateur_id'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        return $result->fetch_assoc()['points'];
    }

    return 0;
}
header('Content-Type: application/json');

$user_id = $_GET['user_id'] ?? 1;
$points = getPoints($user_id);
echo json_encode(["points" => $points]);
?>