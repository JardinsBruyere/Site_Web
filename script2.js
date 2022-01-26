listeTypeComposants = []
listeTypeAlerte = []
alerte = []
bac = []
listeBacPosition = []
composant = []
alerteRecu = []
relevesCapteurs = []

var ctx = document.getElementById("myChart");
var IdCapteur=1
var btn1 = document.getElementById("clear"); 
var btn = document.getElementById("toutajouter"); 
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
	downloadLink.setAttribute('download', 'CanvasAsImage.png');
	let canvas = document.getElementById('myChart');
	canvas.toBlob(function(blob) {
	  let url = URL.createObjectURL(blob);
	  downloadLink.setAttribute('href', url);
	  downloadLink.click();
	});
}, false);

const unique = (value, index, self) => {
  return self.indexOf(value) === index
}

async function fetchMovies(i) {

	var data = { "numTable" : i };
	var url = new URL("http://192.20.55.3:5000/api/capteur");
	for (let k in data) { url.searchParams.append(k, data[k]); }
    let response = await fetch(url);
	return await response.json();
}

const chargeData = () => {
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
	lu=fetchMovies(7)
    lu.then((a) => {
        a['data'][0].RelevesCapteurs.forEach(element => relevesCapteurs.push(element));
	})
	i++;
	uniqueIdCapteur=[...new Set(relevesCapteurs.map(m=>m.IdCapteur))]
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

window.onload = function() {

	
	setTimeout(() => {
	/*	
		var date=relevesCapteurs.reduce((ids, current) => {
				  if (current.IdCapteur==IdCapteur) {
					ids.push(current.DateAjout);
				  }
				  return ids;
				}, [])
				
		var Value=relevesCapteurs.reduce((ids, current) => {
				  if (current.IdCapteur==IdCapteur) {
					ids.push(current.Valeur);
				  }
				  return ids;
				}, [])	
			
	*/
	  
	  btn1.onclick = function(){
		lineChart.data.datasets=[]
		lineChart.update();
	  }
/*	  
		var para1=IdCapteur
		var min = Math.min.apply(Math,relevesCapteurs.map(x => x['IdCapteur'])),
			max = Math.max.apply(Math,relevesCapteurs.map(x => x['IdCapteur'])),
			select = document.getElementById('selectNumber');
		for (var i = min; i<=max; i++){
			var opt = document.createElement('option');
			opt.value = i;
			opt.innerHTML = i;
			select.appendChild(opt);
		}
*/		
		var IdUse=[]
		relevesCapteurs.forEach(function(m){ 
			if(!IdUse.includes(m.IdCapteur)){
				IdUse.push(m.IdCapteur);
				var checkbox = document.createElement('input');
				var label = document.createElement('label')
				var br = document.createElement('br');
				var container = document.getElementById('container');
				checkbox.type = 'checkbox';
				checkbox.id = ''+m.IdCapteur;
				checkbox.name = 'interest';
				checkbox.value = ''+m.IdCapteur;
			 
				label.htmlFor = ''+m.IdCapteur;
				label.appendChild(document.createTextNode(''+m.IdCapteur));
			 
				container.appendChild(checkbox);
				container.appendChild(label);
				container.appendChild(br);
				container.appendChild(br);
				checker.push(document.getElementById(''+m.IdCapteur))
				document.getElementById(''+m.IdCapteur).addEventListener('click', function() {
					if (checker[m.IdCapteur-1].checked == true){
						var Val=relevesCapteurs.reduce((ids, current) => {
													  if (current.IdCapteur==m.IdCapteur) {
														ids.push(current.Valeur);
													  }
													  return ids;
													}, [])
						allVar=allVar.concat(Val)
						lineChart.data.datasets.push({
							label: "Graphe pour le capteur num "+m.IdCapteur,
							data: Val,
							borderColor:'#00BFFF',
						  })
						lineChart.data.labels=relevesCapteurs.reduce((ids, current) => {
													  if (current.IdCapteur==m.IdCapteur) {
														ids.push(current.DateAjout);
													  }
													  return ids;
													}, [])
						
						lineChart.options.scales.yAxes[0].ticks.max=Math.max.apply(Math, allVar)+5-Math.max.apply(Val, allVar)%5,
						lineChart.options.scales.yAxes[0].ticks.min=Math.min.apply(Math, allVar)-3
						lineChart.data.datasets[0].label = "Graphe pour le capteur num "+m.IdCapteur
						
						lineChart.update();
					} else {
						for(var i=0;i<lineChart.data.datasets.length;i++){
							if(lineChart.data.datasets[i].label =="Graphe pour le capteur num "+m.IdCapteur)
								lineChart.data.datasets.splice(i,1)
							
							lineChart.update();
						}
					}
				})	
			}})

		btn.onclick = function(){
			var listUsed=[]
			uniqueIdCapteur.forEach(function(m){
							if(document.getElementById(''+m).checked) {
								listUsed.push(m);
							} 
			})
			console.log(listUsed);
			listUsed.forEach(function(here){
				console.log(here)
				var Val=relevesCapteurs.reduce((ids, current) => {
											  if (current.IdCapteur==here) {
												ids.push(current.Valeur);
											  }
											  return ids;
											}, [])
				lineChart.data.datasets.push({
						label: "Liste total capteurs",
						data: Val,
						borderColor:'#00BFFF',
					  })
					lineChart.data.labels=relevesCapteurs.reduce((ids, current) => {
												  if (current.IdCapteur==here) {
													ids.push(current.DateAjout);
												  }
												  return ids;
												}, [])
					
					lineChart.options.scales.yAxes[0].ticks.max=Math.max.apply(Math, allVar)+5-Math.max.apply(Val, allVar)%5,
					lineChart.options.scales.yAxes[0].ticks.min=Math.min.apply(Math, allVar)-3
					lineChart.data.datasets[0].label = "Graphe pour le capteur num "+here
					
					lineChart.update();
			})
		}; 
		
		var allVar=relevesCapteurs.reduce((ids, current) => {
											  if (current.IdCapteur==1) {
												ids.push(current.Valeur);
											  }
											  return ids;
											}, [])
	/*	element.onclick = function(event) {
			console.log(lineChart.data.datasets)
			var select = document.getElementById('selectNumber');
			var IdCapteur=parseInt(select.options[select.selectedIndex].text)
			if(!dejaSurLeGraphe.includes(IdCapteur)){
				dejaSurLeGraphe.push(IdCapteur)
				var Val=relevesCapteurs.reduce((ids, current) => {
											  if (current.IdCapteur==IdCapteur) {
												ids.push(current.Valeur);
											  }
											  return ids;
											}, [])
				allVar=allVar.concat(Val)
				lineChart.data.datasets.push({
					label: "Liste total capteurs",
					data: Val,
					borderColor:'#00BFFF',
				  })
				lineChart.data.labels=relevesCapteurs.reduce((ids, current) => {
											  if (current.IdCapteur==IdCapteur) {
												ids.push(current.DateAjout);
											  }
											  return ids;
											}, [])
				
				lineChart.options.scales.yAxes[0].ticks.max=Math.max.apply(Math, allVar)+5-Math.max.apply(Val, allVar)%5,
				lineChart.options.scales.yAxes[0].ticks.min=Math.min.apply(Math, allVar)-3
				lineChart.data.datasets[0].label = "Graphe pour le capteur num "+IdCapteur
				
				lineChart.update();
			}
		}
		*/
	
	}, 250)
	
}
