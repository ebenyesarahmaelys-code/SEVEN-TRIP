function inscription() {
    let nom = document.getElementById("nom").value;
    let prenom = document.getElementById("prenom").value;
    let email = document.getElementById("email").value;
    let utilisateur = document.getElementById("utilisateur").value;
    let mdp = document.getElementById("mdp").value;
    let mdpConf = document.getElementById("mdp-conf").value;

    if (!nom || !prenom || !email || !utilisateur || !mdp || !mdpConf) {
        alert("Veuillez remplir tous les champs.");
        return;
    }

    if (mdp !== mdpConf) {
        alert("Les mots de passe ne correspondent pas.");
        return;
    }

    let utilisateurs = JSON.parse(localStorage.getItem("utilisateurs")) || [];
    let existe = utilisateurs.some(u => u.utilisateur === utilisateur);

    if (existe) {
        alert("Ce nom d'utilisateur est déjà pris.");
        return;
    }

    let nouvelUtilisateur = {
        nom: nom,
        prenom: prenom,
        email: email,
        utilisateur: utilisateur,
        mdp: mdp,
        points: 0
    };

    utilisateurs.push(nouvelUtilisateur);
    localStorage.setItem("utilisateurs", JSON.stringify(utilisateurs));

    alert("Compte créé avec succès ! Bienvenue " + nom + " ☺️");

    // Rediriger vers la page d'accueil
    window.location.href = "Accueil.html";
}