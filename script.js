listeTypeComposants = []
listeTypeAlerte = []
alerte = []
bac = []
listeBacPosition = []
composant = []
alerteRecu = []
relevesCapteurs = []

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchMovies() {
    let response = await fetch('http://192.20.55.3:5000/api/capteur', {
        method: 'GET',
    });
    return await response.json();
}

i = 0
here = fetchMovies()

const chargeData = () => {
    here.then((a) => {
        a.data[0].ListeTypeComposants.forEach(element => listeTypeComposants.push(element));
        a.data[1].ListeTypeAlerte.forEach(element => listeTypeAlerte.push(element));
        a.data[2].Alerte.forEach(element => alerte.push(element));
        a.data[3].Bac.forEach(element => bac.push(element));
        a.data[4].ListeBacPosition.forEach(element => listeBacPosition.push(element));
        a.data[5].Composant.forEach(element => composant.push(element));
        a.data[6].AlerteRecu.forEach(element => alerteRecu.push(element));
        a.data[7].RelevesCapteurs.forEach(element => relevesCapteurs.push(element));
        i++;
        AfficherVal();
    });
};

chargeData();

function AfficherVal() {
    console.log("here");
    console.log(listeTypeComposants.forEach(function(current) {
        console.log("NomComposant =" + current.NomComposant + " typeComposant =" + current.typeComposant);
    }));
    console.log(listeTypeAlerte.forEach(function(current) {
        console.log("Criticite =" + current.Criticite + " MethodeNotification =" + current.MethodeNotification + " TypeAlerte =" + current.TypeAlerte);
    }));
    console.log(alerte.forEach(function(current) {
        console.log("ComposantCible =" + current.ComposantCible + " TypeAlerte =" + current.TypeAlerte + " id =" + current.id + " seuil =" + current.seuil);
    }));
    console.log(bac.forEach(function(current) {
        console.log("NomBac =" + current.NomBac + " etage =" + current.etage + " id =" + current.id + " x =" + current.x + " y =" + current.y);
    }));
    console.log(listeBacPosition.forEach(function(current) {
        console.log("Bac =" + current.Bac + " Capteur =" + current.Capteur + " id =" + current.id);
    }));
    console.log(composant.forEach(function(current) {
        console.log("DateAjout =" + current.DateAjout + " Position =" + current.Position + " id =" + current.id + " type =" + current.type);
    }));
    console.log(alerteRecu.forEach(function(current) {
        console.log("DateAjout =" + current.DateAjout + " NumeroDalerte =" + current.Position + " id =" + current.id);
    }));
    console.log(relevesCapteurs.forEach(function(current) {
        console.log("DateAjout =" + current.DateAjout + " IdCapteur =" + current.IdCapteur + " Valeur =" + current.Valeur + " id =" + current.id);
    }));
}

setTimeout(() => {
    // Liste des modalités de la variable type
    var type_modalites = relevesCapteurs.map(function(d) { return d.id; });
    // temp (moyen) maximum
    var temp_max = d3.max(relevesCapteurs, function(d) { return d.Valeur; });
    AfficherVal();
    // Définition des marges et de la taille du graphique
    var marges = { haut: 50, droit: 50, bas: 50, gauche: 50 },
        largeurTotale = 1000,
        hauteurTotale = 500,
        largeurInterne = largeurTotale - marges.gauche - marges.droit,
        hauteurInterne = hauteurTotale - marges.haut - marges.bas;

    // Echelle pour les temp sur l'axe Y
    var echelleY = d3.scaleLinear()
        .domain([0, temp_max])
        .range([hauteurInterne, 0]);

    // Echelle pour le type sur l'axe X
    var echelleX = d3.scaleBand()
        .domain(type_modalites)
        .range([0, largeurInterne])

    console.log(echelleX)
        // Création de l'axe X
    var axeX = d3.axisBottom()
        .scale(echelleX);

    // Création de l'axe Y
    var axeY = d3.axisLeft()
        .scale(echelleY);

    // Création du graphique
    var graphique = d3.select("#graph").append("svg")
        .attr("width", largeurTotale)
        .attr("height", hauteurTotale)
        .append("g")
        .attr("transform", "translate(" + marges.gauche + "," + marges.haut + ")");

    // Ajout de l'axe X au graphique
    graphique.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + hauteurInterne + ")")
        .call(axeX)
        .selectAll("text")
        .attr("transform", function(d) {
            return "rotate(-65)"
        });

    // Ajout de l'axe Y au graphique
    graphique.append("g")
        .attr("class", "y axis")
        .call(axeY)
        .selectAll("text")
        .attr("transform", function(d) {
            return "rotate(-65)"
        });


    graphique.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -25)
        .attr("x", 60)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Temperature")

    graphique.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 440)
        .attr("x", 685)
        .attr("dx", ".71em")
        .style("text-anchor", "end")
        .text("Temps en h")
        .attr("transform", function(d) {
            return "rotate(-65)"
        })

    graphique.selectAll(".bar")
        .data(relevesCapteurs)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return echelleX(d.id); })
        .attr("width", echelleX.bandwidth())
        .attr("y", function(d) { return echelleY(d.Valeur); })
        .attr("height", function(d) { return hauteurInterne - echelleY(d.Valeur); })
        .attr("fill", function(d) {
            if (d.Valeur <= 14)
                return "#318CE7";
            else if (d.Valeur > 14 && d.Valeur < 25)
                return "#FF7F00";
            else
                return "#FF0033";
        });
}, 250)

// Ajout d'une barre pour chaque type de logement, avec une taille fonction du temp moyen