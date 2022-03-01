if(localStorage.ipJardinBruyere==undefined)localStorage.ipJardinBruyere="localhost"

document.getElementById("ipText").defaultValue = localStorage.ipJardinBruyere

document.getElementById("enter").addEventListener('click', function() {
	localStorage.ipJardinBruyere=document.getElementById("ipText").value
	document.getElementById("textUpdate").textContent="Bravo, la nouvelle ip du serveur est "+localStorage.ipJardinBruyere
})
