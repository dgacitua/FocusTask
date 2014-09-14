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
		document.querySelector("#btn-viewtask").addEventListener("click", getAllTasks, false);
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
	        console.log("Se agregó "+taskName+" con éxito a la DB!");
	    }
    } else {
    	console.log("ERROR! No se ha ingresado un nombre a la Tarea");
    }   
}


/* Operaciones de Lectura */
function getAllTasks(e) {
    var s = "";
    db.transaction(["tasks"], "readonly").objectStore("tasks").openCursor().onsuccess = function(e) {
        var cursor = e.target.result;
        //var div = document.createElement('div');
        //div.className = 'row';
        if(cursor) {
        	var localDate = cursor.value.taskDate.toLocaleDateString();
        	var localTime = cursor.value.taskDate.toLocaleTimeString();
            s += "<li class=\"vbox\"><p>" + cursor.value.taskName + "</p>";
            s += "<p>" + localDate + "</p>";
            s += "<p>" + localTime + "</p>";
            if (cursor.value.taskNotes) {
            	s += "<p>" + cursor.value.taskNotes + "</p>";
            }            
            s += "</li>";
            console.log("Tarea Cargada! " + cursor.value.taskName);
            cursor.continue();
        }
        //div.innerHTML = s;
        //document.getElementById('tasklist').appendChild(div);      
        document.querySelector("#tasklist").innerHTML = s;
    }
}