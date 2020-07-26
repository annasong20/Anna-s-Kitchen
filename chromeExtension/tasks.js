document.addEventListener('DOMContentLoaded', function() {
  // code to GET users
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "http://localhost:8080/api/tasks", true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
        var taskPages = JSON.parse(xhr.responseText);
	var i;
	var table = document.getElementById("friendBrowsers");

	for (i = 0; i < taskPages.length; i++) {
  	    var row = table.insertRow(-1);

            var url ="http://localhost:8080/api/tasks".concat(taskPages[0].userId);
            fetch(url, {"mode": "no-cors",  "method":"GET"}).then(response => { alert(response); });

	    var nameCell = row.insertCell(0);
	    nameCell.innerHTML = taskPages[i].userId;

	    var urlCell = row.insertCell(1);
	    urlCell.innerHTML = taskPages[i].description

	    var timeCell = row.insertCell(2);
	    timeCell.innerHTML = taskPages[i].status
	}
    }
  }
  xhr.send();

}, false);
