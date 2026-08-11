<?php
include 'config.php';
// Connexion
function connecter($utilisateur, $mdp) {
    global $conn;
// On cherche lutilisateur 
    $sql = "SELECT * FROM utilisateurs WHERE utilisateur = '$utilisateur'";
    $result = $conn->query($sql);
// une fois trouver on va verifier si le mot de passe correspond
    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();

        if (password_verify($mdp, $user['mdp'])) {
            return ["success" => true, "user" => $user];
        }
    }

    return ["success" => false, "message" => "Identifiants incorrects."];
}

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $utilisateur = $_POST['utilisateur'] ?? '';
    $mdp = $_POST['mdp'] ?? '';
    $result = connecter($utilisateur, $mdp);
    echo json_encode($result);
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