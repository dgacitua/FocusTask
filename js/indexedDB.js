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
        console.log("openRequest completada con éxito");
 
        db = e.target.result;
 
        //Listen for add clicks
        document.querySelector("#btn-newtask-save").addEventListener("click", addTask, false);
        
        //Listen for get clicks
		document.querySelector("#btn-viewtask").addEventListener("click", getAllTasks, false);
    }
 
    openRequest.onerror = function(e) {
        //Do something for the error
        console.log("Hay un error con openRequest");
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
	        console.log("¡ERROR GRAVE!",e.target.error.name);
	        //some type of error handler
	    }
	 
	    request.onsuccess = function(e) {
	        console.log("Se agregó "+taskName+" con éxito!");
	    }
    } else {
    	console.log("ERROR: No se ha ingresado un nombre de Tarea");
    }   
}


/* Operaciones de Lectura */
function getAllTasks(e) {
 
    var s = "<section data-type=\"list\"><ul>";
 
    db.transaction(["tasks"], "readonly").objectStore("tasks").openCursor().onsuccess = function(e) {
        var cursor = e.target.result;
        if(cursor) {
        	var fecha = cursor.value.taskDate.toLocaleDateString();
        	var hora = cursor.value.taskDate.toLocaleTimeString();
            s += "<li><p>" + cursor.value.taskName + "</p>";
            s += "<p>[ " + fecha + " | " + hora + " ]";
            if (cursor.value.taskNotes) {
            	s += " " + cursor.value.taskNotes;	
            }            
            s += "</p></li>";
            console.log("Tarea Cargada",cursor.value.taskName);
            cursor.continue();
        }       
        document.querySelector("#task-list").innerHTML = s;
    }
}