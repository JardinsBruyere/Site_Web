var SensorReading = []
var SensorTypes = []
var Station = []
var Sensor = []

var URL_REFERENCE="http://"+localStorage.ipJardinBruyere+":5001/"

var addStation = document.getElementById('addStation');
var addType = document.getElementById('addType');

var deleteStation = document.getElementById('deleteStation');
var deleteType = document.getElementById('deleteType');

async function fetchMovies(i,numCapteur,amount,dateDebut,dateFin) {
	var data = { "numTable" : i };
	var url = new URL(URL_REFERENCE+"/api/capteur");
	for (let k in data) { url.searchParams.append(k, data[k]); }
    let response = await fetch(encodeURI(url));
	return await response.json();
}

async function addStationFunc() {
	var url = new URL(URL_REFERENCE+"/api/addStation");
    let response = await fetch(encodeURI(url));
	return await response;
}

async function addTypeFunc() {
	var url = new URL(URL_REFERENCE+"/api/addType");
    let response = await fetch(encodeURI(url));

	return await response;
}

async function deleteStationFunc(num) {
	var data = { "num" : num };
	var url = new URL(URL_REFERENCE+"/api/deleteStation");
	for (let k in data) { url.searchParams.append(k, data[k]); }
    let response = await fetch(encodeURI(url));
	return await response;
}

async function deleteTypeFunc(num) {
	var data = { "num" : num };
	var url = new URL(URL_REFERENCE+"/api/deleteType");
	for (let k in data) { url.searchParams.append(k, data[k]); }
    let response = await fetch(encodeURI(url));
	return await response;
}

addStation.addEventListener('click', function() {
	addStationFunc()
})

addType.addEventListener('click', function() {
	addTypeFunc()
})

deleteStation.addEventListener('click', function() {
	if(!(document.getElementById("selectStation").value in Station.map(a=>a.Id))){
		deleteStationFunc(document.getElementById("selectStation").value)
	}else{
		console.log("Cette station est deja utilisé")
	}
})

deleteType.addEventListener('click', function() {
	if(!(document.getElementById("selectType").value in SensorTypes.map(a=>a.Id))){
		deleteTypeFunc(document.getElementById("selectType").value)
	}else{
		console.log("Ce type est deja utilisé")
	}
})

function modification(){
	lu=updateValue(2,"new")
    lu.then((a) => {
		console.log(a)
	})
}

function createTableSensor() {
	
		var currentDiv = document.getElementById('div1');
		
        let table = document.createElement("table");  //makes a table element for the page
		table.className+="blue"
        table.classList.add('fl-table');
        table.insertAdjacentHTML("beforeend","<thead><tr class='firstRow'><th>Id</th><th>DateAdded</th><th>Name</th><th>Station</th><th>Type</th></tr></thead>"); //adds the first row that contains the sections for the table
		containbody=document.createElement('tbody')
		for (var i = 0; i < Sensor.length; i++){  //loops through the array 
			containbody.insertAdjacentHTML("beforeend","<tr><td>" + Sensor[i].Id + "</td><td>"+ Sensor[i].DateAdded +"</td><td><input type=\"text\" id=\"Sensor_Name_"+Sensor[i].Id+"\" name=\"fname\" value=\"" + Sensor[i].Name + "\"></td><td><input type=\"text\" id=\"Sensor_Station_"+Sensor[i].Id+"\" name=\"fname\" value=" + Sensor[i].Station + "></td><td><input type=\"text\" id=\"Sensor_Type_"+Sensor[i].Id+"\" name=\"fname\" value=" + Sensor[i].Type + "></td></tr>");
		}
		table.appendChild(containbody)
	   
		document.body.insertBefore(table, currentDiv);
	
}

function createTableSensorTypes(){

	var currentDiv2 = document.getElementById('div2');
   var ddl = document.getElementById("selectType");
	
	let table2 = document.createElement("table");  //makes a table element for the page
	table2.className+="blue"
	table2.classList.add('fl-table');
	table2.insertAdjacentHTML("beforeend","<thead><tr class='firstRow'><th>Id</th><th>Unit</th></tr></thead>"); //adds the first row that contains the sections for the table
	containbody=document.createElement('tbody')
	for (var i = 0; i < SensorTypes.length; i++){  //loops through the array 
		containbody.insertAdjacentHTML("beforeend","<tr><td>" + SensorTypes[i].Id + "</td><td><input type=\"text\" id=\"SensorTypes_Unit_"+SensorTypes[i].Id+"\" name=\"fname\" value=" + SensorTypes[i].Unit + "></td></tr>");
	   table2.appendChild(containbody)
	   var option = document.createElement("OPTION"); 
       option.className+="textColor"
	   option.innerHTML = SensorTypes[i].Unit;
	   option.value = SensorTypes[i].Id;
	   ddl.options.add(option);
	}
	console.log(SensorTypes.length)
	document.body.insertBefore(table2, currentDiv2);
	
	

}

function createTableStation(){

	var currentDiv2 = document.getElementById('div3');
   var ddl = document.getElementById("selectStation");
	let table2 = document.createElement("table");  //makes a table element for the page
	table2.className+="blue"
	table2.classList.add('fl-table');
	table2.insertAdjacentHTML("beforeend","<thead><tr class='firstRow'><th>Id</th><th>Name</th></tr></thead>"); //adds the first row that contains the sections for the table	containbody=document.createElement('tbody')
	containbody=document.createElement('tbody')
	for (var i = 0; i < Station.length; i++){  //loops through the array 
		containbody.insertAdjacentHTML("beforeend","<tr><td>" + Station[i].Id + "</td><td><input type=\"text\" id=\"Station_Name_"+Station[i].Id+"\" name=\"fname\" value=\"" + Station[i].Name + "\"></td></tr>");
	   table2.appendChild(containbody)
	   var option = document.createElement("OPTION");
	   option.className+="textColor"
	   option.innerHTML = Station[i].Name;
	   option.value = Station[i].Id;
	   ddl.options.add(option);
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
		if(document.getElementById("Sensor_Name_"+Sensor[i].Id).value!=Sensor[i].Name){
			updateValue(Sensor[i].Id,document.getElementById("Sensor_Name_"+Sensor[i].Id).value,"Name","Sensor")
		}
		
		if(parseInt(document.getElementById("Sensor_Type_"+Sensor[i].Id).value)!=NaN){
			if(SensorTypes.map(a=>a.Id).includes(parseInt(document.getElementById("Sensor_Type_"+Sensor[i].Id).value))){
				if(document.getElementById("Sensor_Type_"+Sensor[i].Id).value!=Sensor[i].Type){
					updateValue(Sensor[i].Id,document.getElementById("Sensor_Type_"+Sensor[i].Id).value,"Type","Sensor")
				}
			}else{
				console.log("Le type "+document.getElementById("Sensor_Type_"+Sensor[i].Id).value+" n'est pas disponible dans "+SensorTypes.map(a=>a.Id))
			}
		}else{
			console.log(document.getElementById("Sensor_Type_"+Sensor[i].Id).value+" n'est pas un entier désolé")
		}
		
		
		if(parseInt(document.getElementById("Sensor_Station_"+Sensor[i].Id).value)!=NaN){
			if(Station.map(a=>a.Id).includes(parseInt(document.getElementById("Sensor_Station_"+Sensor[i].Id).value))){
				if(document.getElementById("Sensor_Station_"+Sensor[i].Id).value!=Sensor[i].Station){
					updateValue(Sensor[i].Id,document.getElementById("Sensor_Station_"+Sensor[i].Id).value,"Station","Sensor")
				}
			}else{
				console.log("La station "+document.getElementById("Sensor_Station_"+Sensor[i].Id).value+" n'est pas disponible")
			}
		}else{
			console.log(document.getElementById("Sensor_Station_"+Sensor[i].Id).value+" n'est pas un entier désolé")
		}

	}
	
	for (var i = 0; i < SensorTypes.length; i++){
		console.log("SensorTypes_Unit_"+(SensorTypes[i].Id))
		if(document.getElementById("SensorTypes_Unit_"+SensorTypes[i].Id).value!=SensorTypes[i].Unit){
			updateValue(SensorTypes[i].Id,document.getElementById("SensorTypes_Unit_"+(SensorTypes[i].Id)).value,"Unit","SensorTypes")
		}
	}
	
	for (var i = 0; i < Station.length; i++){
		console.log("Station_Name_"+Station[i].Id)
		if(document.getElementById("Station_Name_"+Station[i].Id).value!=Station[i].Name){
			updateValue(Station[i].Id,document.getElementById("Station_Name_"+(Station[i].Id)).value,"Name","Station")
		}
	}
	
})