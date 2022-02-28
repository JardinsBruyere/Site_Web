var SensorReading = []
var SensorTypes = []
var Station = []
var Sensor = []

var URL_REFERENCE="http://172.21.224.39:5000/"


async function fetchMovies(i,numCapteur,amount,dateDebut,dateFin) {
	var data = { "numTable" : i };
	var url = new URL(URL_REFERENCE+"/api/capteur");
	for (let k in data) { url.searchParams.append(k, data[k]); }
    let response = await fetch(encodeURI(url));
	return await response.json();
}

function modification(){
	lu=updateValue(2,"new")
    lu.then((a) => {
		console.log(a)
	})
}

function createTableSensor() {
	
		var currentDiv = document.getElementById('div1');
		
        let table = document.createElement("table");  //makes a table element for the page
        table.classList.add('fl-table');
        table.insertAdjacentHTML("beforeend","<tr class='firstRow'><th>Id</th><th>DateAdded</th><th>Name</th><th>Station</th><th>Type</th></tr>"); //adds the first row that contains the sections for the table
        for (var i = 0; i < Sensor.length; i++){  //loops through the array 
			table.insertAdjacentHTML("beforeend","<tr><td>" + Sensor[i].Id + "</td><td>"+ Sensor[i].DateAdded +"</td><td><input type=\"text\" id=\"Sensor_Name_"+i+"\" name=\"fname\" value=\"" + Sensor[i].Name + "\"></td><td><input type=\"text\" id=\"Sensor_Station_"+i+"\" name=\"fname\" value=" + Sensor[i].Station + "></td><td><input type=\"text\" id=\"Sensor_Type_"+i+"\" name=\"fname\" value=" + Sensor[i].Type + "></td></tr>");
		}
    
		document.body.insertBefore(table, currentDiv);
	
}

function createTableSensorTypes(){

	var currentDiv2 = document.getElementById('div2');
	
	let table2 = document.createElement("table");  //makes a table element for the page
	table2.classList.add('fl-table');
	table2.insertAdjacentHTML("beforeend","<tr class='firstRow'><th>Id</th><th>Unit</th></tr>"); //adds the first row that contains the sections for the table
	for (var i = 0; i < SensorTypes.length; i++){  //loops through the array 
		table2.insertAdjacentHTML("beforeend","<tr><td>" + SensorTypes[i].Id + "</td><td><input type=\"text\" id=\"SensorTypes_Unit_"+i+"\" name=\"fname\" value=" + SensorTypes[i].Unit + "></td></tr>");
	}
	console.log(SensorTypes.length)
	document.body.insertBefore(table2, currentDiv2);
}

function createTableStation(){

	var currentDiv2 = document.getElementById('div3');
	
	let table2 = document.createElement("table");  //makes a table element for the page
	table2.classList.add('fl-table');
	table2.insertAdjacentHTML("beforeend","<tr class='firstRow'><th>Id</th><th>Name</th></tr>"); //adds the first row that contains the sections for the table
	for (var i = 0; i < SensorTypes.length; i++){  //loops through the array 
		table2.insertAdjacentHTML("beforeend","<tr><td>" + Station[i].Id + "</td><td><input type=\"text\" id=\"Station_Name_"+i+"\" name=\"fname\" value=\"" + Station[i].Name + "\"></td></tr>");
	}
	console.log(SensorTypes.length)
	document.body.insertBefore(table2, currentDiv2);
}

const chargeData = () => {
	Sensor = []
	SensorTypes = []
	Station = []
	lu=fetchMovies(0)
    lu.then((a) => {
		a['data'][0].Sensor.forEach(element => Sensor.push(element));
		createTableSensor();
	})
	lu=fetchMovies(1)
    lu.then((a) => {
        a['data'][0].SensorTypes.forEach(element => SensorTypes.push(element));
		createTableSensorTypes()
	})
	lu=fetchMovies(2)
    lu.then((a) => {
        a['data'][0].Station.forEach(element => Station.push(element));
		createTableStation()
	})
};

chargeData();

async function updateValue(numCapteur,name,column,table) {
	var data = { "sensorid" : numCapteur };
	var url = new URL(URL_REFERENCE+"/api/change");
	for (let k in data) { url.searchParams.append(k, data[k]); }
	url.searchParams.append("sensorname",""+name+"")
	url.searchParams.append("column",column)
	url.searchParams.append("table",table)
    let response = await fetch(encodeURI(url));
	return await response.json();
}


document.getElementById('change').addEventListener('click', function() {
	
	for (var i = 0; i < Sensor.length; i++){
		if(document.getElementById("Sensor_Name_"+i).value!=Sensor[i].Name){
			updateValue(i+1,document.getElementById("Sensor_Name_"+i).value,"Name","Sensor")
		}
		if(document.getElementById("Sensor_Type_"+i).value!=Sensor[i].Type){
			updateValue(i+1,document.getElementById("Sensor_Type_"+i).value,"Type","Sensor")
		}
		if(document.getElementById("Sensor_Station_"+i).value!=Sensor[i].Station){
			updateValue(i+1,document.getElementById("Sensor_Station_"+i).value,"Station","Sensor")
		}
	}
	
	for (var i = 0; i < SensorTypes.length; i++){
		if(document.getElementById("SensorTypes_Unit_"+i).value!=SensorTypes[i].Unit){
			updateValue(i+1,document.getElementById("SensorTypes_Unit_"+i).value,"Unit","SensorTypes")
		}
	}
	
	for (var i = 0; i < Station.length; i++){
		if(document.getElementById("Station_Name_"+i).value!=Station[i].Name){
			updateValue(i+1,document.getElementById("Station_Name_"+i).value,"Name","Station")
		}
	}
	
})