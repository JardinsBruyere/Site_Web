var tab=[15,30,35,70];
var couleurs=["green","yellow","purple","blue"];
var body=d3.select("body");
var svg=body.append("svg");
svg.attr({"width":"400px","height":"400px"})
svg.style("border","1px solid black");

var pieTab=d3.layout.pie();
pieTab.value(function(d){
        return d;
    });

var arc=d3.svg.arc();
arc.outerRadius(180);

var grp=svg.append("g").attr("transform","translate(200,200)");
var graph=grp.selectAll("path").data(pieTab(tab))
graph.enter()
	.append("path")
	.attr("fill",function(d,i){
			return(couleurs[i]);
		})
	.attr("d",arc);