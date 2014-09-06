"use strict";
(function () {

	var count;

	var start = document.querySelector("#start");
	
	if(start){
		start.onclick = function(){
			document.getElementById("start").disabled=true;
			document.getElementById("stop").disabled=false;
			counter(25,0);
			//~ var btnstart = document.getElementById("start");
			//~ btnstart="disabled";
		}
	}
	
	var stop = document.querySelector("#stop");

	if(stop){
		stop.onclick = function(){
			document.getElementById("stop").disabled=true;
			document.getElementById("start").disabled=false;
			stopCounter();
			
			//~ document.getElementById("clock").innerHTML="";
			
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
		count = setTimeout(function(){counter(minutes,seconds)}, 1000);
	}
	
	function stopCounter(){
		clearTimeout(count);
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
