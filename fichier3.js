d3.select('h1').style('color', 'orange')

// set the dimensions and margins of the graph
var margin = {top: 10, right: 50, bottom: 50, left: 50},
    width = 1300 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svG = d3.select("#scatter_area")
  .append("svg")
  .attr("class", "x label")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Create data
var data1 = [ {x:3, y:9},{x:6, y:11}, {x:12, y:16}, {x:17, y:18}, {x:20, y:19}, {x:22, y:20} ]
var data2 = [ {x:5, y:10},{x:7, y:12}, {x:10, y:20}, {x:14, y:16}, {x:18, y:15}, {x:20, y:13} ]
var data3 = [ {x:1, y:6},{x:4, y:7}, {x:7, y:10}, {x:10, y:12}, {x:13, y:15}, {x:16, y:15} ]
var data4 = [ {x:2, y:5},{x:5, y:8}, {x:8, y:10}, {x:11, y:13}, {x:15, y:15}, {x:18, y:17} ]
var data5 = [ {x:3, y:9},{x:6, y:11}, {x:12, y:16}, {x:17, y:18}, {x:20, y:19}, {x:22, y:20} ]
var data6 = [ {x:5, y:10},{x:7, y:12}, {x:10, y:20}, {x:14, y:16}, {x:18, y:15}, {x:20, y:13} ]
var data7 = [ {x:3, y:9},{x:6, y:11}, {x:12, y:16}, {x:17, y:18}, {x:20, y:19}, {x:22, y:20} ]

/*
function Average(namevar1,namevar2,...args){
  var moyenne=[]
 
   // console.log("\nLISTE TABLEAU INITIAUX=");
    //for(var i=0 ;i< args.length;i++){
      //console.log(args[i])
    //}
    len=0
    for(i in args[0]){
      len++
    }
    xval=Array(len).fill(0)
    yval=Array(len).fill(0)
    for(i in args){
      for(j in args[i]){
//        console.log(i," ",j," ",args[i][j][namevar1],args[i][j][namevar2])
        xval[j]+=args[i][j][namevar1]
        yval[j]+=args[i][j][namevar2]
      }
    }
    //console.log("\nTABLEAU SOMME=")
    //console.log("xval",xval)
    //console.log("yval",yval)
    for (var i = 0; i < len; i++){
      moyenne.push({x:(xval[i]/(args.length)),y:(yval[i]/(args.length))})
    }  
    document.write("\n MOYENNE= ")
    document.write(moyenne)


*/
//mean of arrays
var moyenne1=[]
var moyenne2=[]

//document.write( typeof moyenne )

data1.forEach((num1, index) => {
  const x1 = data1[index]["x"];
  const y1 = data1[index]["y"];

  const x2 = data2[index]["x"];
  const y2 = data2[index]["y"];
  //document.write("___",num1["x"]," ",num1["y"]," ",x," ",y);
  //document.write("\n");
  moyenne1.push({x:(num1["x"]+x1)/2,y:(num1["y"]+y1)/2})
  moyenne2.push({x:(num1["x"]+x2)/2,y:(num1["y"]+y2)/2})

});

data2.forEach((num1, index) => {
  const x2 = data2[index]["x"];
  const y2 = data2[index]["y"];
  
  moyenne2.push({x:(num1["x"]+x2)/2,y:(num1["y"]+y2)/2})

});
//document.write(" NEW ")

//moyenne.forEach(element => document.write(" x:",element["x"]," y:",element["y"]," "));

// X scale and Axis
var x = d3.scaleLinear()
    .domain([0, 24])         // This is the min and the max of the data: 0 to 100 if percentages
    .range([0, width]);       // This is the corresponding value I want in Pixel

svG
  .append('g')
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x));

// X scale and Axis
var y = d3.scaleLinear()
    .domain([0, 30])         // This is the min and the max of the data: 0 to 100 if percentages
    .range([height, 0]);       // This is the corresponding value I want in Pixel
svG
  .append('g')
  .call(d3.axisLeft(y));

// Add 3 dots for 0, 50 and 100%
svG
  .selectAll("whatever")
  .data(moyenne1)
  .enter()
  .append("circle")
    .attr("cx", function(d){ return x(d.x) })
    .attr("cy", function(d){ return y(d.y) })
    .attr("r", 7)

svG.append("text")
    .attr("text-anchor", "end")
    .attr("x", width-570)
    .attr("y", height + margin.top +30)
    .text("Temps en h");

// Y axis label:
svG.append("text")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-90)")
    .attr("y", -margin.left+20)
    .attr("x", -margin.top-200)
    .text("Température en °C")