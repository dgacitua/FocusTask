"use strict";
(function () {

	var start = document.querySelector("#start");
	
	if(start){
		start.onclick = function(){
			counter(25,0);
		}
	}
	
	var stop = document.querySelector("#stop");

	if(stop){
		stop.onclick = function(){
			counter(0,0);
		}
	}

	function counter(minutes,seconds){
		if(seconds==0){
			if(minutes==0){
				var clock = '0:0';
				document.getElementById("clock").innerHTML = clock;
				
				return;
			}
			seconds=59;
			minutes--;
		}
		var clock = minutes+':'+seconds;
		document.getElementById("clock").innerHTML=clock;
		seconds--;
		setTimeout(function(){counter(minutes,seconds)}, 50);
	}
})();

//~ function counter(minutes,seconds){
	//~ if(seconds==0){
		//~ seconds=59;
		//~ minutes--;
	//~ }
	//~ var clock = minutes+':'+seconds;
	//~ document.getElementBiId("clock").innerHTML=clock;
		//~ 
	//~ seconds--;
//~ }
