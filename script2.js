listeTypeComposants = []
listeTypeAlerte = []
alerte = []
bac = []
listeBacPosition = []
composant = []
alerteRecu = []
relevesCapteurs = []
ip="192..."
allVar=[]

function loadIP(){	
	ip = prompt("Veuillez renseignez l'ip du serveur de données", window.name);
	window.name = ip
	
	chargeData();
}

if (window.name == null){
	loadIP();
}
var ctx = document.getElementById("myChart");
var IdCapteur=1
var btn1 = document.getElementById("clear"); 
var btn = document.getElementById("toutajouter"); 
var changeIP = document.getElementById("changeIP"); 
//var element = document.getElementById("mybutton");
let width, height, gradient;
function getGradient(ctx, chartArea) {
  const chartWidth = chartArea.right - chartArea.left;
  const chartHeight = chartArea.bottom - chartArea.top;
  if (!gradient || width !== chartWidth || height !== chartHeight) {
	// Create the gradient because this is either the first render
	// or the size of the chart has changed
	width = chartWidth;
	height = chartHeight;
	gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
	gradient.addColorStop(0, '#00BFFF');
	gradient.addColorStop(0.5, '#FFFF00');
	gradient.addColorStop(1, '#FF0000');
  }

  return gradient;
}
i = 0
var uniqueIdCapteur = []
var dejaSurLeGraphe = []
var checker=[]

var lineChart = new Chart(ctx, {
		type: 'line',
		data: {
		  labels: [],
		  datasets: []
		},
		options: {
		 scales: {
            xAxes: [{
                ticks: {
                    autoSkip: false,
                    maxRotation: 35,
                    minRotation: 35
                }
            }],
		  yAxes: [{
			ticks: {
				max: 30,
				min: 0,
		//	 max: Math.max.apply(Math, Value)+5-Math.max.apply(Math, Value)%5,
		//	 min: Math.min.apply(Math, Value)-3,
                                steps: 3,
                                stepValue: 3,
			 }
		   }]
		  }
		},
	  })

document.getElementById('nouvelonglet').addEventListener('click', function() {
	var canvas = document.getElementById("myChart");
	var dataURL = canvas.toDataURL("image/png");
	var newTab = window.open('about:blank','image from canvas');
	newTab.document.write("<img src='" + dataURL + "' alt='from canvas'/>");
}, false);
document.getElementById('exporter').addEventListener('click', function() {
	let downloadLink = document.createElement('a');
	downloadLink.setAttribute('download', 'GraphiqueDe'+lineChart.data.datasets.map(a=>a.label).join('+')+'.png');
	let canvas = document.getElementById('myChart');
	canvas.toBlob(function(blob) {
	  let url = URL.createObjectURL(blob);
	  downloadLink.setAttribute('href', url);
	  downloadLink.click();
	});
}, false);

btn1.onclick = function(){
	lineChart.data.datasets=[]
	lineChart.update();
}
		

btn.onclick = function(){

};

const unique = (value, index, self) => {
  return self.indexOf(value) === index
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


async function fetchMovies(i,numCapteur,amount) {
	var data = { "numTable" : i };
	var url = new URL("http://"+window.name+":5000/api/capteur");
	for (let k in data) { url.searchParams.append(k, data[k]); }
	if(i==7){
		url.searchParams.append("sensorid",numCapteur)
		url.searchParams.append("amount",amount)
	}
    let response = await fetch(url);
	return await response.json();
}

function setButton(){
	var IdUse=[]
	uniqueIdCapteur=[...new Set(relevesCapteurs.map(m=>m.IdCapteur))]
	console.log(uniqueIdCapteur)
	uniqueIdCapteur.forEach(function(m){ 
		if(!IdUse.includes(m)){
			IdUse.push(m);
			var checkbox = document.createElement('input');
			var label = document.createElement('label')
			var br = document.createElement('br');
			var container = document.getElementById('container');
			checkbox.type = 'checkbox';
			checkbox.id = ''+m;
			checkbox.name = 'interest';
			checkbox.value = ''+checkbox.id;
		 
			label.htmlFor = ''+checkbox.id;
			label.appendChild(document.createTextNode(''+checkbox.id));
		 
			container.appendChild(checkbox);
			container.appendChild(label);
			container.appendChild(br);
			container.appendChild(br);
			checker.push(document.getElementById(''+checkbox.id))
			document.getElementById(''+checkbox.id).addEventListener('click', function() {
				
				console.log(this.id)
				if (checker[this.id-1].checked == true){
					var Val=relevesCapteurs.reduce((ids, current) => {
							if (current.IdCapteur==this.id) {ids.push(current.Valeur);}
							return ids;
							}, [])
					console.log(Val);
					allVar=allVar.concat(Val)
					lineChart.data.datasets.push({
						label: ""+this.id,
						data: Val,
						borderColor:getRandomColor(),
					  })
					lineChart.data.labels=relevesCapteurs.reduce((ids, current) => {
												  if (current.IdCapteur==this.id) {ids.push(current.DateAjout);}
												  return ids;
												}, [])
					
					lineChart.options.scales.yAxes[0].ticks.max=Math.max.apply(Math, allVar)+5-Math.max.apply(Val, allVar)%5,
					lineChart.options.scales.yAxes[0].ticks.min=Math.min.apply(Math, allVar)-3
					lineChart.update();
				} else {
					for(var i=0;i<=lineChart.data.datasets.length;i++){
						if(lineChart.data.datasets[i].label ==this.id)
							lineChart.data.datasets.splice(i,1)
						
						lineChart.update();
					}
				}
			})	
		}})
}
const chargeData = () => {
	listeTypeComposants = []
	listeTypeAlerte = []
	alerte = []
	bac = []
	listeBacPosition = []
	composant = []
	alerteRecu = []
	relevesCapteurs = []
	lu=fetchMovies(0)
    lu.then((a) => {
		a['data'][0].ListeTypeComposants.forEach(element => listeTypeComposants.push(element));
	})
	lu=fetchMovies(1)
    lu.then((a) => {
		a['data'][0].ListeTypeAlerte.forEach(element => listeTypeAlerte.push(element));
	})
	lu=fetchMovies(2)
    lu.then((a) => {
        a['data'][0].Alerte.forEach(element => alerte.push(element));
	})
	lu=fetchMovies(3)
    lu.then((a) => {
        a['data'][0].Bac.forEach(element => bac.push(element));
	})
	lu=fetchMovies(4)
    lu.then((a) => {
        a['data'][0].ListeBacPosition.forEach(element => listeBacPosition.push(element));
	})
	lu=fetchMovies(5)
    lu.then((a) => {
        a['data'][0].Composant.forEach(element => composant.push(element));
	})
	lu=fetchMovies(6)
    lu.then((a) => {
        a['data'][0].AlerteRecu.forEach(element => alerteRecu.push(element));
	})
	lu=fetchMovies(7,1,10)
    lu.then((a) => {
        a['data'][0].RelevesCapteurs.forEach(element => relevesCapteurs.push(element));
	})
	lu=fetchMovies(7,2,10)
    lu.then((a) => {
        a['data'][0].RelevesCapteurs.forEach(element => relevesCapteurs.push(element));
	})
	lu=fetchMovies(7,3,10)
    lu.then((a) => {
        a['data'][0].RelevesCapteurs.forEach(element => relevesCapteurs.push(element));
	})
	i++;
	uniqueIdCapteur=[...new Set(relevesCapteurs.map(m=>m.IdCapteur))]
	window.setTimeout(function() {
		setButton();
	}, 1000);
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

changeIP.addEventListener('click', function() {
	loadIP();
}, false);

