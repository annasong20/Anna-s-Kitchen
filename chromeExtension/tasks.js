var insertRow = function(task, table) {
    var row = table.insertRow(-1);

    var nameCell = row.insertCell(0);
    nameCell.innerHTML = task.userId;

    var urlCell = row.insertCell(1);
    urlCell.innerHTML = task.description

    var timeCell = row.insertCell(2);
    timeCell.innerHTML = task.status
}

document.addEventListener('DOMContentLoaded', function() {
    // code to GET users
    var table = document.getElementById("friendBrowsers");
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:8080/api/tasks", true);
    xhr.onreadystatechange = function () {
	if (xhr.readyState == 4) {
            var taskPages = JSON.parse(xhr.responseText);
	    var i;

	    for (i = 0; i < taskPages.length; i++) {
		insertRow(taskPages[i], table);		
	    }
	}
    }
    xhr.send();

    document.getElementById('submitNewTask').addEventListener('click', function() {
	requestWithUser(function(uid) {
	    var taskXHR = new XMLHttpRequest();
	    taskXHR.open("POST", "http://localhost:8080/api/tasks/", true);
	    taskXHR.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	    xhr.onreadystatechange = function() {
		if (xhr.readyState !== 4) {
		    return
		}
		insertRow({
		    userId: uid,
		    description: document.getElementById("taskDescription").value,
		    status: "NOT STARTED"
		}, table)
	    }
	    taskXHR.send("description="
			 .concat(document.getElementById("taskDescription").value)
			 .concat("&userId=")
			 .concat(uid)
			 .concat("&status=")
			 .concat("NOT STARTED")
			)
	});
    }, false);
}, false);
