// Tableau de données obtenu sur les données temperature
donnees = [
  { type: "1", temp: 10 },
  { type: "2", temp: 11 },
  { type: "3", temp: 12 },
  { type: "4", temp: 13 },
  { type: "5", temp: 13 },
  { type: "6", temp: 14 },
  { type: "7", temp: 15 },
  { type: "8", temp: 15 },
  { type: "9", temp: 16 },
  { type: "10", temp: 17 },
  { type: "11", temp: 17 },
  { type: "12", temp: 17 },
  { type: "13", temp: 18 },
  { type: "14", temp: 19 },
  { type: "15", temp: 18 },
  { type: "16", temp: 18 },
  { type: "17", temp: 18 },
  { type: "18", temp: 28 },
  { type: "19", temp: 16 },
  { type: "20", temp: 15 },
  { type: "21", temp: 15 },
  { type: "22", temp: 14 },
  { type: "23", temp: 13 },
  { type: "eaeae", temp: 13 },
  { type: "25", temp: 13 },
  { type: "26", temp: 13 },
  { type: "27", temp: 13 },
  { type: "28", temp: 13 },
  { type: "29", temp: 13 },
  { type: "30", temp: 13 },
];

// Liste des modalités de la variable type
var type_modalites = donnees.map(function(d) { return d.type; });
// temp (moyen) maximum
var temp_max = d3.max(donnees, function(d) { return d.temp; });

// Définition des marges et de la taille du graphique
var marges = {haut: 50, droit: 50, bas: 50, gauche: 50},
    largeurTotale = 800,
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
    .padding(0.1);

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
  .call(axeX);

// Ajout de l'axe Y au graphique
graphique.append("g")
    .attr("class", "y axis")
  .call(axeY);

/* Fichier du début (sans modif)
graphique.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("temperature")
*/

graphique.append("text")
    //.attr("transform", "rotate(-90)")
    .attr("y", -25)
    .attr("x", 60)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Temperature")

graphique.append("text")
    //.attr("transform", "rotate(-90)")
    .attr("y", 440)
    .attr("x", 685)
    .attr("dx", ".71em")
    .style("text-anchor", "end")
    .text("Temps en h")

    
// Ajout d'une barre pour chaque type de logement, avec une taille fonction du temp moyen
graphique.selectAll(".bar")
  .data(donnees)
  .enter()
  .append("rect")
  .attr("class", "bar")
  .attr("x", function(d) { return echelleX(d.type); })
  .attr("width", echelleX.bandwidth())
  .attr("y", function(d) { return echelleY(d.temp); })
  .attr("height", function(d) { return hauteurInterne - echelleY(d.temp); })
  .attr("fill", function(d) 
        {   if (d.temp <= 14)
                return "#318CE7";
            else if(d.temp > 14 && d.temp < 25)
                return "#FF7F00";
            else
                return "#FF0033";
    });