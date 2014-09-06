"use strict";
(function () {

	var count;
	var repeat=0;

	var start = document.querySelector("#start");
	
	if(start){
		start.onclick = function(){
			document.getElementById("start").disabled=true;
			document.getElementById("stop").disabled=false;
			counter(25,0);
			repeat++;
			//~ decision(1);
		}
	}
	
	var stop = document.querySelector("#stop");

	if(stop){
		stop.onclick = function(){
			document.getElementById("stop").disabled=true;
			document.getElementById("start").disabled=false;
			stopCounter();
			
			document.getElementById("clock").innerHTML="25:00";
			
		}
	}

	function counter(minutes,seconds){
		if(seconds<0){
			if(minutes==0){
				stopCounter();
				//~ if(repeat%2==0){
					//~ counter(25,0);
					//~ repeat++;
				//~ }else{
					//~ counter(5,0);
					//~ repeat++;
				//~ }
				
				if(repeat>7){
					stopCounter();
					repeat=0;
				}else{
					if(repeat%2==0){
						counter(25,0);
						repeat++;
					}else{
						counter(5,0);
						repeat++;
					}
				}
				
				var clock = '0:00';
				document.getElementById("clock").innerHTML = clock;
				return;
			}
			seconds=59;
			minutes--;
		}
		if(seconds<10){
			var clock = minutes+':0'+seconds;
		}else{
			var clock = minutes+':'+seconds;
		}	
		document.getElementById("clock").innerHTML=clock;
		seconds--;
		count = setTimeout(function(){counter(minutes,seconds)}, 100);
	}
	
	function stopCounter(){
		clearTimeout(count);
	}
	
	//~ function decision(work){
		//~ if(work==1){
			//~ counter(10,0);
		//~ }else{
			//~ counter(5,0);
		//~ }
	//~ }
	
	 
})();
