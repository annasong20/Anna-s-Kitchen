var insertRow = function(task, table) {
    var url ="http://localhost:8080/api/users/".concat(task.userId);
    fetch(url, {"mode": "no-cors",  "method":"GET"}).then( function(data) {return data.json();}).then( function(resp) {
	
	var row = table.insertRow(-1);

	var nameCell = row.insertCell(0);
	nameCell.innerHTML = task.userId;

	var urlCell = row.insertCell(1);
	urlCell.innerHTML = task.description

	var timeCell = row.insertCell(2);
	timeCell.innerHTML = task.status;
	nameCell.innerHTML = resp.username;
    })
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

	    requestWithUser(function(uid) {
	    var xhr1 = new XMLHttpRequest();
                  xhr1.open("GET", "http://localhost:8080/api/friends", true);
                  xhr1.onreadystatechange = function () {
                      if (xhr1.readyState == 4) {
	                  // alert(xhr1.responseText);           
                          var friendsPages = JSON.parse(xhr1.responseText);
	                  var friendsTable = document.getElementById("friendBrowsers");

			  var friends = new Set();
			  friends.add(uid);
                          for (i = 0; i < friendsPages.length; i++) {
                              if (friendsPages[i].parentId === uid) {
				  friends.add(friendsPages[i].siblingId);
                              }
  	          
                          }

			

			  for (i = 0; i < taskPages.length; i ++) {
				if (friends.has(taskPages[i].userId)) {
				  insertRow(taskPages[i], table);	

				}
			  }



                      }
                  }

		xhr1.send();





	    });

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
