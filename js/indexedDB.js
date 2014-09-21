/* FocusTask
 * Lista de Tareas
 */

/* Check de IndexedDB */
var db;
 
function indexedDBOk() {
    return "indexedDB" in window;
}

/* Operaciones de Escritura */
document.addEventListener("DOMContentLoaded", function() {
 
    //No support? Go in the corner and pout.
    if(!indexedDBOk) return;
 
    var openRequest = indexedDB.open("FocusTask-tasklist",1);
 
    openRequest.onupgradeneeded = function(e) {
        var thisDB = e.target.result;
 
        if(!thisDB.objectStoreNames.contains("tasks")) {
            var os = thisDB.createObjectStore("tasks", {autoIncrement:true});
            os.createIndex("status", "taskStatus", {unique:false});
        }
    }
 
    openRequest.onsuccess = function(e) {
        console.log("ÉXITO! La Base de Datos ha sido cargada");
 
        db = e.target.result;
 
        //Listen for add clicks
        document.querySelector("#btn-newtask-save").addEventListener("click", addTask, false);
        
        //Listen for get clicks
		//document.querySelector("#btn-viewtask").addEventListener("click", getAllTasks, false);
		document.querySelector("#tab1").addEventListener("click", getTodoTasks, false);
		document.querySelector("#tab2").addEventListener("click", getDoingTasks, false);
		document.querySelector("#tab3").addEventListener("click", getDoneTasks, false);
    }
 
    openRequest.onerror = function(e) {
        //Do something for the error
        console.log("ERROR GRAVE! No se pudo abrir la Base de Datos");
    }
 
},false);
 
function addTask(e) {
    var taskName = document.querySelector("#name").value;
    var taskStatus = document.querySelector("#status").value;
    var taskNotes = document.querySelector("#notes").value;
 
    console.log("Se va a agregar "+taskName+" ["+taskStatus+"] a la DB!");
 
    var transaction = db.transaction(["tasks"],"readwrite");
    var store = transaction.objectStore("tasks");
 
    //Define a person
    var taskEntry = {
        taskName:taskName,
        taskStatus:taskStatus,
        taskNotes:taskNotes,
        taskDate:new Date()
    }
 
    //Perform the add
    var request;
    
    if (taskName) {
    	request = store.add(taskEntry);
	    
	    request.onerror = function(e) {
	        console.log("ERROR GRAVE! " + e.target.error.name);
	        //some type of error handler
	    }
	 
	    request.onsuccess = function(e) {
	        console.log("Se agregó " + taskName + " con éxito a la DB!");
	        notifier("Agregada Nueva Tarea","Se agregó " + taskName + " a la Lista de Tareas");
	    }
    } else {
    	console.log("ERROR! No se le ha ingresado un nombre a la Tarea");
    	notifier("ERROR","No se le ha ingresado un nombre a la Tarea");
    }   
}


/* Operaciones de Lectura */
function getAllTasks(e) {
    var s = "";
    db.transaction(["tasks"], "readonly").objectStore("tasks").openCursor().onsuccess = function(e) {
        var cursor = e.target.result;
        if(cursor) {
        	var id = cursor.key;
        	var localDate = cursor.value.taskDate.toLocaleDateString();
        	var localTime = cursor.value.taskDate.toLocaleTimeString();
            s += "<li class=\"vbox\">";
            s += "<a id=\""+ id +"\" href=\"#\"><p>" + cursor.value.taskName + "</p>";
            s += "<p>" + localDate + "</p>";
            s += "<p>" + localTime + "</p>";
            if (cursor.value.taskNotes) {
            	s += "<p>" + cursor.value.taskNotes + "</p>";
            }            
            s += "</a></li>";
            //console.log("Tarea Cargada! " + cursor.value.taskName);
            cursor.continue();
        }
        document.querySelector("#tasklist").innerHTML = s;
    }
}

function getTodoTasks(e) {
    var s = "";
    db.transaction(["tasks"], "readonly").objectStore("tasks").openCursor().onsuccess = function(e) {
        var cursor = e.target.result;
        if(cursor) {
        	if (cursor.value.taskStatus=="todo") {
	        	var id = cursor.key;
	        	var localDate = cursor.value.taskDate.toLocaleDateString();
	        	var localTime = cursor.value.taskDate.toLocaleTimeString();
	            s += "<li class=\"vbox\">";
	            s += "<a id=\""+ id +"\" href=\"#\"><p>" + cursor.value.taskName + "</p>";
	            s += "<p>" + localDate + "</p>";
	            s += "<p>" + localTime + "</p>";
	            if (cursor.value.taskNotes) {
	            	s += "<p>" + cursor.value.taskNotes + "</p>";
	            }            
	            s += "</a></li>";
	            //console.log("Tarea Terminada Cargada! " + cursor.value.taskName);
			}
            cursor.continue();
        }
        document.querySelector("#tasklist-todo").innerHTML = s;
    }
}

function getDoingTasks(e) {
    var s = "";
    db.transaction(["tasks"], "readonly").objectStore("tasks").openCursor().onsuccess = function(e) {
        var cursor = e.target.result;
        if(cursor) {
        	if (cursor.value.taskStatus=="doing") {
	        	var id = cursor.key;
	        	var localDate = cursor.value.taskDate.toLocaleDateString();
	        	var localTime = cursor.value.taskDate.toLocaleTimeString();
	            s += "<li class=\"vbox\">";
	            s += "<a id=\""+ id +"\" href=\"#\"><p>" + cursor.value.taskName + "</p>";
	            s += "<p>" + localDate + "</p>";
	            s += "<p>" + localTime + "</p>";
	            if (cursor.value.taskNotes) {
	            	s += "<p>" + cursor.value.taskNotes + "</p>";
	            }            
	            s += "</a></li>";
	            //console.log("Tarea Terminada Cargada! " + cursor.value.taskName);
			}
            cursor.continue();
        }
        document.querySelector("#tasklist-doing").innerHTML = s;
    }
}

function getDoneTasks(e) {
    var s = "";
    db.transaction(["tasks"], "readonly").objectStore("tasks").openCursor().onsuccess = function(e) {
        var cursor = e.target.result;
        if(cursor) {
        	if (cursor.value.taskStatus=="done") {
	        	var id = cursor.key;
	        	var localDate = cursor.value.taskDate.toLocaleDateString();
	        	var localTime = cursor.value.taskDate.toLocaleTimeString();
	            s += "<li class=\"vbox\">";
	            s += "<a id=\""+ id +"\" href=\"#\"><p>" + cursor.value.taskName + "</p>";
	            s += "<p>" + localDate + "</p>";
	            s += "<p>" + localTime + "</p>";
	            if (cursor.value.taskNotes) {
	            	s += "<p>" + cursor.value.taskNotes + "</p>";
	            }            
	            s += "</a></li>";
	            //console.log("Tarea Terminada Cargada! " + cursor.value.taskName);
			}
            cursor.continue();
        }
        document.querySelector("#tasklist-done").innerHTML = s;
    }
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