"use strict";
(function () {

	var count;
	var repeat=0;

	var start = document.querySelector("#start");
	
	if(start){
		start.onclick = function(){
			notifier("Iniciando sesión completa","Concéntrate");
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
			notifier("Has detenido la sesión completa","Presiona iniciar para empezar de nuevo");
			stopCounter();
			repeat=0;
			document.getElementById("clock").style="color:#FF0000"
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
				
				if(repeat>6){
					notifier("Fin de la sesión de Pomodoro","Presiona iniciar para otra sesión");
					document.getElementById("stop").disabled=true;
					document.getElementById("start").disabled=false;
					stopCounter();
					document.getElementById("clock").style="color:#FF0000"
					document.getElementById("clock").innerHTML="25:00";
					repeat=0;
				}else{
					if(repeat%2==0){
						notifier("Iniciando tiempo de trabajo","Concéntrate");
						counter(25,0);
						document.getElementById("clock").style="color:#FF0000"
						repeat++;
					}else{
						notifier("Iniciando tiempo de descanso","Relájate");
						counter(5,0);
						document.getElementById("clock").style="color:#00FF00"
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
		count = setTimeout(function(){counter(minutes,seconds)}, 10);
	}
	
	function stopCounter(){
		clearTimeout(count);
	}




    function notifier(title,message) {
        if ("Notification" in window) {
            // Firefox OS 1.1 and higher
            if (Notification.permission !== "denied") {
                Notification.requestPermission(function (permission) {
                    if(!("permission" in Notification)) {
                        Notification.permission = permission;
                    }
                });
            }
            if (Notification.permission === "granted") {
                new Notification(title, {
                    body : message
                });
            }
        }
        else {
            // Firefox OS 1.0
            var notify = navigator.mozNotification.createNotification(
                title,
                message
            );
            notify.show();
        }
    }
    
    
	
	 
})();
