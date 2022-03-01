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
 
var URL_REFERENCE="http://"+localStorage.ipJardinBruyere+":5000/"
 
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
var search = document.getElementById('search');
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
var currentSensor=[]
var clickedSensor=[]

let newArray = [];
var lineSeries =[]

var checker=[]

var TotalNbrCapteur;

var time=1000

var dateAxis

function numAverage(a) {
  var b = a.length,
      c = 0, i;
  for (i = 0; i < b; i++){
    c += Number(a[i]);
  }
  return c/b;
}

const std = (arr = []) => {
   if(!arr.length){
      return 0;
   };
   const sum = arr.reduce((acc, val) => acc + val);
   const { length: num } = arr;
   const median = sum / num;
   let variance = 0;
   arr.forEach(num => {
      variance += ((num - median) * (num - median));
   });
   variance /= num;
   return variance;
};

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

function AddType(elem) {
   var ddl = document.getElementById("ddlFruits");
   var option = document.createElement("OPTION");
   option.innerHTML = elem.Unit;
   option.value = elem.Id;
   ddl.options.add(option);
}

function AddStation(elem) {
   var ddl = document.getElementById("ddlFruits2");
   var option = document.createElement("OPTION");
   option.innerHTML = elem.Name;
   option.value = elem.Id;
   ddl.options.add(option);
}

const chargeData = () => {
	Sensor = []
	SensorTypes = []
	Station = []
	SensorTypesRecu = []
	SensorReading = []
	lu=fetchMovies(0)
    lu.then((a) => {
		a['data'][0].Sensor.forEach(element => {
			Sensor.push(element)}
		);
	})
	lu=fetchMovies(1)
    lu.then((a) => {
		AddType({Id:-1,Unit:"Tous"})
        a['data'][0].SensorTypes.forEach(element =>  {
			SensorTypes.push(element)
			AddType(element)
		});
	})
	lu=fetchMovies(2)
    lu.then((a) => {
		AddStation({Id:-1,Name:"Tous"})
        a['data'][0].Station.forEach(element => {
			Station.push(element)
			AddStation(element)
		});
	})
	dataToGraph()
};

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

update.addEventListener('click', function() {
		
	DebutValeur=new Date(StartTime.value)
	FinValeur=new Date(EndTime.value)
	clickedSensor=[]
	SensorReading=[]
	for(var n=0;n<checker.length;n++){
		if(checker[n].checked==true){
			clickedSensor.push(Sensor[checker[n].id])
			console.log(n+" est allumé")
			lu=fetchMovies(3,Sensor[checker[n].id].Id,10,Math.round(DebutValeur.getTime()/1000),Math.round(FinValeur.getTime()/1000))
			SensorReading.splice(0,SensorReading.length)
			lu.then((a) => {
				a['data'][0].SensorReading.forEach(element => SensorReading.push(element));;
			})
		}
	}
	
	
	window.setTimeout(function() {
		dataToGraph()
		addStat()
	}, time);
	
})

function addStat(){
	var b = document.getElementById("detailCapteur")
	b.innerHTML=""
	let table2 = document.createElement("table");  //makes a table element for the page
	table2.classList.add('fl-table');
	table2.insertAdjacentHTML("beforeend","<tr class='firstRow'><th>Id</th><th>Name</th><th>Moyenne</th><th>Variance</th></tr>"); //adds the first row that contains the sections for the table
	
	for(var i=0;i<clickedSensor.length;i++){
		console.log(clickedSensor[i].Id)
		table2.insertAdjacentHTML("beforeend","<tr><td>" + clickedSensor[i].Id + "</td><td>" + clickedSensor[i].Name + "</td><td>"+numAverage(SensorReading.filter(a=> a.SensorId==clickedSensor[i].Id).map(a=>a.Value))+"</td><td>" + std(SensorReading.filter(a=> a.SensorId==clickedSensor[i].Id).map(a=>a.Value)) + "</td></tr>");
	}
	
	b.appendChild(table2);
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function setButton(){
	console.log(checker)
	removeAllChildNodes(document.getElementById('container'))
	checker.length=0
	TotalNbrCapteur=Sensor.length
	currentSensor=[]
	console.log("test "+TotalNbrCapteur);
	for(var n=0;n<TotalNbrCapteur;n++){
		current=Sensor[n]
		if( (current.Type==document.getElementById("ddlFruits").value||document.getElementById("ddlFruits").value==-1) && (current.Station==document.getElementById("ddlFruits2").value||document.getElementById("ddlFruits2").value==-1) ){
			console.log(n)
			currentSensor.push(current)
			var checkbox = document.createElement('input');
			var label = document.createElement('label')
			var br = document.createElement('br');
			var container = document.getElementById('container');
			checkbox.type = 'checkbox';
			checkbox.id = ''+n;
			checkbox.name = 'interest';	

			label.innerText =current.Name+" ";
			label.id="label_"+n
		 
			container.appendChild(checkbox);
			container.appendChild(label);
			container.appendChild(br);
			container.appendChild(br);
			checker.push(document.getElementById(''+checkbox.id))
		}
	}
}

search.addEventListener('click', function() {
	setButton();
})

tempo=nbCap()
tempo.then(
	(a)=>{	TotalNbrCapteur=a[0][0];
			console.log(TotalNbrCapteur)
	}
)

function dataToGraph(){
	chart=null
	chart = am4core.create("chartdiv", am4charts.XYChart);
	chart.exporting.menu = new am4core.ExportMenu();

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
	valueAxisY.title.text = 'Valeur';
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
			lineSeries[i].tooltipText = "Capteur:"+clickedSensor[i].Name+"\nDate:{dateX.formatDate()}\nValeur:{valueY} "+ SensorTypes.filter(a=>a.Id==clickedSensor[i].Type)[0].Unit;
			lineSeries[i].strokeWidth = 2;
			lineSeries[i].tensionX = 1;
			lineSeries[i].name = clickedSensor[i].Name
		}
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


