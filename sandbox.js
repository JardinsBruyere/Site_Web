/**
 * ---------------------------------------
 * This demo was created using amCharts 4.
 * 
 * For more information visit:
 * https://www.amcharts.com/
 * 
 * Documentation is available at:
 * https://www.amcharts.com/docs/v4/
 * ---------------------------------------
 */
 
var URL_REFERENCE="http://192.20.55.3:5000"
 
var listPrecision=[
 { timeUnit: "millisecond", count: 1 },
 { timeUnit: "millisecond", count: 5 },
 { timeUnit: "millisecond", count: 10 },
 { timeUnit: "millisecond", count: 50 },
 { timeUnit: "millisecond", count: 100 },
 { timeUnit: "millisecond", count: 500 },
 { timeUnit: "second", count: 1 },
 { timeUnit: "second", count: 5 },
 { timeUnit: "second", count: 10 },
 { timeUnit: "second", count: 30 },
 { timeUnit: "minute", count: 1 },
 { timeUnit: "minute", count: 5 },
 { timeUnit: "minute", count: 10 },
 { timeUnit: "minute", count: 30 },
 { timeUnit: "hour", count: 1 },
 { timeUnit: "hour", count: 3 },
 { timeUnit: "hour", count: 6 },
 { timeUnit: "hour", count: 12 },
 { timeUnit: "day", count: 1 },
 { timeUnit: "day", count: 2 },
 { timeUnit: "day", count: 3 },
 { timeUnit: "day", count: 4 },
 { timeUnit: "day", count: 5 },
 { timeUnit: "week", count: 1 },
 { timeUnit: "month", count: 1 },
 { timeUnit: "month", count: 2 },
 { timeUnit: "month", count: 3 },
 { timeUnit: "month", count: 6 },
 { timeUnit: "year", count: 1 },
 { timeUnit: "year", count: 2 },
 { timeUnit: "year", count: 5 },
 { timeUnit: "year", count: 10 },
 { timeUnit: "year", count: 50 },
 { timeUnit: "year", count: 100 }
]

var update = document.getElementById("update"); 
var select = document.getElementById('precision');
var pos=0
listPrecision.forEach(function (a) {
    var opt = document.createElement('option');
    opt.value = pos;
	pos++;
    opt.innerHTML = "Toutes les "+a.count+" "+a.timeUnit;
    select.appendChild(opt);
})



var StartTime = document.getElementById('StartTime');
var EndTime = document.getElementById('EndTime');
var DebutValeur
var FinValeur


var chart = am4core.create("chartdiv", am4charts.XYChart);
var Sensor = []
var listeTypeSensorTypes = []
var SensorTypes = []
var Station = []
var listeStationPosition = []
var composant = []
var SensorTypesRecu = []
var SensorReading = []

let newArray = [];
var lineSeries =[]

var checker=[]

var TotalNbrCapteur;

var time=1000

var dateAxis

async function nbCap() {
	var url = new URL(URL_REFERENCE+"/api/nbCapteur");
    let response = await fetch(encodeURI(url));
	return await response.json();
}


async function fetchMovies(i,numCapteur,amount,dateDebut,dateFin) {
	var data = { "numTable" : i };
	var url = new URL(URL_REFERENCE+"/api/capteur");
	for (let k in data) { url.searchParams.append(k, data[k]); }
	if(i==3){
		url.searchParams.append("sensorid",numCapteur)
		url.searchParams.append("amount",amount)
		if(!(dateDebut== null)){
			url.searchParams.append("startdate",String(dateDebut))
		}
		if(!(dateFin== null)){
			url.searchParams.append("enddate",String(dateFin))
		}
	}
    let response = await fetch(encodeURI(url));
	return await response.json();
}


const chargeData = () => {
	Sensor = []
	SensorTypes = []
	Station = []
	SensorTypesRecu = []
	SensorReading = []
	lu=fetchMovies(0)
    lu.then((a) => {
		a['data'][0].Sensor.forEach(element => Sensor.push(element));
	})
	lu=fetchMovies(1)
    lu.then((a) => {
        a['data'][0].SensorTypes.forEach(element => SensorTypes.push(element));
	})
	lu=fetchMovies(2)
    lu.then((a) => {
        a['data'][0].Station.forEach(element => Station.push(element));
	})
	dataToGraph()
};

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

update.addEventListener('click', function() {
		
	DebutValeur=new Date(StartTime.value)
	FinValeur=new Date(EndTime.value)
	
	for(var n=0;n<TotalNbrCapteur;n++){
		if(document.getElementById(''+n).checked==true){
			console.log(n+" est allumé")
			lu=fetchMovies(3,n,10,Math.round(DebutValeur.getTime()/1000),Math.round(FinValeur.getTime()/1000))
			SensorReading.splice(0,SensorReading.length)
			lu.then((a) => {
				a['data'][0].SensorReading.forEach(element => SensorReading.push(element));;
			})
		}
	}
	
	
	window.setTimeout(function() {
		dataToGraph()
	}, time);
	
})

function setButton(){
	console.log("test "+TotalNbrCapteur);
	for(var n=0;n<TotalNbrCapteur;n++){
		console.log(n)
		var checkbox = document.createElement('input');
		var label = document.createElement('label')
		var br = document.createElement('br');
		var container = document.getElementById('container');
		checkbox.type = 'checkbox';
		checkbox.id = ''+n;
		checkbox.name = 'interest';	
		checkbox.value = ''+checkbox.id;
	 
		label.htmlFor = ''+checkbox.id;
		label.appendChild(document.createTextNode(''+checkbox.id));
	 
		container.appendChild(checkbox);
		container.appendChild(label);
		container.appendChild(br);
		container.appendChild(br);
		checker.push(document.getElementById(''+checkbox.id))
	}
}

tempo=nbCap()
tempo.then(
			(a)=>{	TotalNbrCapteur=a[0][0];
					console.log(TotalNbrCapteur)
			}
		)

function dataToGraph(){
	chart = am4core.create("chartdiv", am4charts.XYChart);
	chart.dateFormatter.dateFormat = "MMMM d yyyy hh:mm:ss";

	chart.cursor = new am4charts.XYCursor();
	am4core.useTheme(am4themes_animated);

	dateAxis = chart.xAxes.push(new am4charts.DateAxis());
	dateAxis.minZoomCount = 1;
	dateAxis.renderer.labels.template.rotation = 35;
	dateAxis.gridIntervals.setAll([
	  { timeUnit: "hour", count: 24 }
	]);

	chart.scrollbarX = new am4core.Scrollbar();

	var valueAxisY = chart.yAxes.push(new am4charts.ValueAxis());
	valueAxisY.title.text = 'Y Axis';
	chart.scrollbarY = new am4core.Scrollbar();

	var title = chart.titles.create();
	title.text = "Relevés des capteurs ";
	title.fontSize = 30;
	title.marginBottom = 20;

	window.setTimeout(function() {
		
		listeValeur=[...new Set(SensorReading.map(m=>m.SensorId))].sort()
		for(var i=0;i<listeValeur.length;i++){
	
			lineSeries.push(chart.series.push(new am4charts.LineSeries()));
			lineSeries[i].dataFields.valueY = listeValeur[i]+"y";
			lineSeries[i].dataFields.dateX = listeValeur[i]+"x";
			lineSeries[i].tooltipText = "numéro:{name}\nX:{dateX.formatDate()}\nY:{valueY}";
			lineSeries[i].strokeWidth = 2;
			lineSeries[i].tensionX = 1;
			
			lineSeries[i].name = ""+listeValeur[i]
		}
		chart.validateData();
		newArray=[]
		SensorReading.forEach(function (a) {
			var obj = {};
			obj[a.SensorId + "y"] = a.Value;
			obj[a.SensorId + "x"] = new Date(a.DateAdded);
			newArray.push(obj);
			chart.data=newArray
		});
		console.log(chart.data)
		chart.validateData();
		
		chart.legend = new am4charts.Legend();
		dateAxis.baseInterval={ timeUnit: "minute", count: 10 }
	}, time);
}

function updatePrecision(val){
	dateAxis.baseInterval=listPrecision[val.value]
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////



chargeData();

window.setTimeout(function() {
		setButton()
	}, time);


