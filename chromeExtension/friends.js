document.addEventListener('DOMContentLoaded', function() {
  // code to GET users
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "http://localhost:8080/api/users", true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
        var friendsPages = JSON.parse(xhr.responseText);
	var i;
	var table = document.getElementById("friendBrowsers");
	for (i = 0; i < friendsPages.length; i++) {
  	    var row = table.insertRow(-1);

	    var nameCell = row.insertCell(0);
	    nameCell.innerHTML = friendsPages[i].username;

	    var urlCell = row.insertCell(1);
	    urlCell.innerHTML = friendsPages[i].lastVisitedUrl

	    var timeCell = row.insertCell(2);
	    timeCell.innerHTML = friendsPages[i].lastVisitedTime
	}
    }
  }
  xhr.send();

}, false);
