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
?>