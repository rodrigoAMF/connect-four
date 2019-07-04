$(document).ready(function()
{
	 $("#btnFacil").on("click",function(e){  
	    e.preventDefault();
	    sessionStorage.setItem("dificuldade", 1);
	    window.location.href = "http://localhost/4-in-a-row/game.html";
	});
	$("#btnMedio").on("click",function(e){  
	    e.preventDefault();
	    sessionStorage.setItem("dificuldade", 2);
	    window.location.href = "http://localhost/4-in-a-row/game.html";
	});
	$("#btnDificil").on("click",function(e){ 
		e.preventDefault(); 
		sessionStorage.setItem("dificuldade", 3);
		window.location.href = "http://localhost/4-in-a-row/game.html";
	});
 });
