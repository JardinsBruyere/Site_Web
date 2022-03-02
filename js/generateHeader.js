var superHeader=document.getElementById("superHeader")
let table = document.createElement("header"); 
table.insertAdjacentHTML("beforeend","     <div class=\"container\">\
            <div class=\"brand\">\
                <h2>3G<span>Green Garden Guys</span></h2>\
            </div>\
            <nav class=\"navbar\">\
                <ul class=\"menu\">\
                    <li class=\"menu-item\">\
                        <a href=\"index.html\">Accueil</a>\
                    </li>\
                    <li class=\"menu-item\">\
                        <a href=\"graphique.html\">Graphique</a>\
                    </li>\
                    <li class=\"menu-item\">\
                        <a href=\"Edit.html\">Edition</a>\
                    </li>\
                    <li class=\"menu-item\">\
                        <a href=\"https://meteofrance.com/previsions-meteo-france/perigueux/24000\">Météo régionale</a>\
                    </li>\
                    <li class=\"menu-item\">\
						<a href=\"equipe.html\">Cap projet</a>\
					</li>\
                </ul>\
            </nav>\
        </div>")
		
document.body.insertBefore(table,superHeader);
