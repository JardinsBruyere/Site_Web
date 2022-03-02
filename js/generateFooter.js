var superHeader=document.getElementById("superFooter")
let footer = document.createElement("footer"); 
footer.classList.add('footer');

footer.insertAdjacentHTML("beforeend","<div class=\"container\">\
        <div class=\"row\">\
            <img src=\"Pictures/blanc.png\" width=\"80\" height=\"70\" align=\"left\" />\
            <div class=\"footer-col\">\
                <h4> Team 3G</h4>\
            </div>\
            <img src=\"Pictures/logo-cap-projet-removebg-preview.png\" width=\"100\" height=\"70\" align=\"right\"/>\
		</div>\
	</div> ")

document.body.insertBefore(footer,superHeader);