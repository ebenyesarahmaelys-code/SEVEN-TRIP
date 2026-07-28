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

    document.getElementById("nom").value = "";
document.getElementById("prenom").value = "";
document.getElementById("email").value = "";
document.getElementById("utilisateur").value = "";
document.getElementById("mdp").value = "";
document.getElementById("mdp-conf").value = "";
}


function connexion() {
    
    let utilisateur = document.getElementById("utilisateur").value;
    let mdp = document.getElementById("mdp").value;

    if (!utilisateur || !mdp) {
        alert("Veuillez remplir tous les champs.");
        return;
    }

    let utilisateurs = JSON.parse(localStorage.getItem("utilisateurs")) || [];

    let compteValide = utilisateurs.some(u => u.utilisateur === utilisateur && u.mdp === mdp);

    if(compteValide) {
        alert("Connexion reussie ! Bienvenue " + utilisateur +"☺️");
        window.location.href ="Accueil.html";

    } else {
        alert("Nom d'utilisateur ou mot de passe incorrect.");
    }

    document.getElementById("nom").value = "";
document.getElementById("prenom").value = "";
document.getElementById("email").value = "";
document.getElementById("utilisateur").value = "";
document.getElementById("mdp").value = "";
document.getElementById("mdp-conf").value = "";
}

function goTaxi() {
    window.location.href ="taxi_course.html"
}

function goLoca() {
    window.location.href ="Location.html"
}


// ===== VARIABLES GLOBALES =====
let vehiculeChoisi = "";
let prixVehicule = 0;

// ===== CHOISIR UN VÉHICULE =====
function choisirVehicule(nom, prix) {
    vehiculeChoisi = nom;
    prixVehicule = prix;
    alert("✅ Véhicule sélectionné : " + nom + " (" + prix + " FCFA)");
}

// ===== RÉSERVER UN TAXI =====
function reserverTaxi() {
    // 1. Récupérer les valeurs
    let depart = document.getElementById("depart").value;
    let destination = document.getElementById("destination").value;
    let date = document.getElementById("date").value;
    let heure = document.getElementById("heure").value;
    let paiement = document.querySelector('input[name="paiement"]:checked');

    // 2. Vérifier que tous les champs sont remplis
    if (!depart || !destination || !date || !heure || !vehiculeChoisi || !paiement) {
        alert("⚠️ Veuillez remplir tous les champs.");
        return;
    }

    // 3. Mettre à jour le récapitulatif
    document.getElementById("recap-depart").innerText = depart;
    document.getElementById("recap-destination").innerText = destination;
    document.getElementById("recap-distance").innerText = "12 km";
    document.getElementById("recap-temps").innerText = "18 min";
    document.getElementById("recap-prix").innerText = prixVehicule;

    // 4. Sauvegarder la réservation
    let reservation = {
        depart: depart,
        destination: destination,
        date: date,
        heure: heure,
        vehicule: vehiculeChoisi,
        paiement: paiement.value,
        prix: prixVehicule
    };

    let reservations = JSON.parse(localStorage.getItem("reservations")) || [];
    reservations.push(reservation);
    localStorage.setItem("reservations", JSON.stringify(reservations));

    // 5. Message de confirmation
    alert("✅ Réservation confirmée !");
}