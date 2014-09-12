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
 
    var openRequest = indexedDB.open("idarticle_people",1);
 
    openRequest.onupgradeneeded = function(e) {
        var thisDB = e.target.result;
 
        if(!thisDB.objectStoreNames.contains("tasks")) {
            thisDB.createObjectStore("tasks", {autoIncrement:true});
        }
    }
 
    openRequest.onsuccess = function(e) {
        console.log("openRequest completada con éxito");
 
        db = e.target.result;
 
        //Listen for add clicks
        document.querySelector("#btn-newtask-save").addEventListener("click", addTask, false);
        
        //Listen for get clicks
		document.querySelector("#btn-viewtask").addEventListener("click", getTasks, false);
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
    var request = store.add(taskEntry);
 
    request.onerror = function(e) {
        console.log("¡ERROR GRAVE!",e.target.error.name);
        //some type of error handler
    }
 
    request.onsuccess = function(e) {
        console.log("Se agregó "+taskName+" con éxito!");
    }
}


/* Operaciones de Lectura */
var transaction = db.transaction(["tasks"], "readonly");
var objectStore = transaction.objectStore("tasks");
 
var cursor = objectStore.openCursor();
 
cursor.onsuccess = function(e) {
    var res = e.target.result;
    if(res) {
        console.log("Llave", res.key);
        console.dir("Valor", res.value);
        res.continue();
    }
}

function getTasks(e) {
 
    var s = "";
 
    db.transaction(["tasks"], "readonly").objectStore("tasks").openCursor().onsuccess = function(e) {
        var cursor = e.target.result;
        if(cursor) {
            s += "<h2>Key "+cursor.key+"</h2><p>";
            for(var field in cursor.value) {
                s+= field+"="+cursor.value[field]+"<br/>";
            }
            s+="</p>";
            cursor.continue();
        }
        document.querySelector("#task-list").innerHTML = s;
    }
}