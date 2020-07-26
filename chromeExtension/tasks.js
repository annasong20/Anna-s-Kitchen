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

            var url ="http://localhost:8080/api/users/".concat(taskPages[i].userId);
            var description = taskPages[i].description
            var status = taskPages[i].status
            fetch(url, {"mode": "no-cors",  "method":"GET"}).then( function(data) {return data.json();}).then( function(resp) {

  	    var row = table.insertRow(-1);

	    var nameCell = row.insertCell(0);
	    nameCell.innerHTML = resp.username;

            var urlCell = row.insertCell(1);
            urlCell.innerHTML = description

            var timeCell = row.insertCell(2);
            timeCell.innerHTML = status

            });

      

	}
    }
  }
  xhr.send();

}, false);
