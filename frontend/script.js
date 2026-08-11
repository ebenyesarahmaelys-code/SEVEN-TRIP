// ========================================
//  INSCRIPTION (avec PHP)
// ========================================
function inscription() {
    let nom = document.getElementById("nom").value;
    let prenom = document.getElementById("prenom").value;
    let email = document.getElementById("email").value;
    let telephone = document.getElementById("telephone").value;
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

    let formData = new FormData();
    formData.append("nom", nom);
    formData.append("prenom", prenom);
    formData.append("email", email);
    formData.append("telephone", telephone);
    formData.append("utilisateur", utilisateur);
    formData.append("mdp", mdp);

    fetch("../backend/inscription.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        if (data.success) {
            window.location.href = "Accueil.html";
        }
    })
    .catch(error => console.error("Erreur :", error));
}

// ========================================
//  CONNEXION (avec PHP)
// ========================================
function connexion() {
    let utilisateur = document.getElementById("utilisateur").value;
    let mdp = document.getElementById("mdp").value;

    if (!utilisateur || !mdp) {
        alert("Veuillez remplir tous les champs.");
        return;
    }

    let formData = new FormData();
    formData.append("utilisateur", utilisateur);
    formData.append("mdp", mdp);

    fetch("../backend/connexion.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Connexion réussie ! Bienvenue " + data.user.nom + " ☺️");
            window.location.href = "Accueil.html";
        } else {
            alert(data.message);
        }
    })
    .catch(error => console.error("Erreur :", error));
}

// ========================================
//  RÉSERVATION TAXI (avec PHP)
// ========================================
function reserverTaxi() {
    let depart = document.getElementById("depart").value;
    let destination = document.getElementById("destination").value;
    let date = document.getElementById("date").value;
    let heure = document.getElementById("heure").value;
    let paiement = document.querySelector('input[name="paiement"]:checked');

    if (!depart || !destination || !date || !heure || !vehiculeChoisi || !paiement) {
        alert("⚠️ Veuillez remplir tous les champs.");
        return;
    }

    let distance = Math.floor(Math.random() * 25) + 5;
    let duree = Math.round(distance * 2);
    let prix = distance * 500 + prixVehicule;

    let formData = new FormData();
    formData.append("utilisateur_id", 1); // à remplacer par session
    formData.append("depart", depart);
    formData.append("destination", destination);
    formData.append("date", date);
    formData.append("heure", heure);
    formData.append("vehicule", vehiculeChoisi);
    formData.append("paiement", paiement.value);
    formData.append("distance", distance);
    formData.append("duree", duree);
    formData.append("prix", prix);

    fetch("../backend/reservation.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        if (data.success) {
            window.location.href = "Accueil.html";
        }
    })
    .catch(error => console.error("Erreur :", error));
}

// ========================================
//  CHARGER L'HISTORIQUE
// ========================================
function chargerHistorique() {
    fetch("../backend/historique.php?user_id=1")
        .then(response => response.json())
        .then(data => {
            let container = document.getElementById("historique-container");
            if (!container) return;
            container.innerHTML = "";
            data.forEach(resa => {
                container.innerHTML += `
                    <div class="history-card">
                        <div class="history-info">
                            <h3>${resa.vehicule}</h3>
                            <p>${resa.depart} → ${resa.destination}</p>
                            <small>${resa.date} à ${resa.heure}</small>
                        </div>
                        <div class="history-price">${resa.prix} FCFA</div>
                    </div>
                `;
            });
        })
        .catch(err => console.error("Erreur historique :", err));
}

// ========================================
//  CHARGER LES MESSAGES
// ========================================
function chargerMessages() {
    fetch("../backend/boite_lettres.php?user_id=1")
        .then(response => response.json())
        .then(data => {
            let container = document.getElementById("messages-container");
            if (!container) return;
            container.innerHTML = "";
            data.forEach(msg => {
                container.innerHTML += `
                    <div class="message">
                        <div class="message-icon">📩</div>
                        <div>
                            <h3>${msg.titre}</h3>
                            <p>${msg.message}</p>
                        </div>
                        <span>${msg.date_envoi}</span>
                    </div>
                `;
            });
        })
        .catch(err => console.error("Erreur messages :", err));
}

// ========================================
//  CHARGER LES POINTS
// ========================================
function chargerPoints() {
    fetch("../backend/points.php?user_id=1")
        .then(response => response.json())
        .then(data => {
            let el = document.getElementById("points-affichage");
            if (el) el.textContent = data.points + " pts";
        })
        .catch(err => console.error("Erreur points :", err));
}

// ========================================
//  REDIRECTIONS
// ========================================
function goTaxi() {
    window.location.href = "taxi_course.html";
}

function goLoca() {
    window.location.href = "location.html";
}