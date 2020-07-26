document.addEventListener('DOMContentLoaded', function() {
    var checkPageButton = document.getElementById('checkPage');
    checkPageButton.addEventListener('click', function() {

	chrome.identity.getProfileUserInfo(function(userinfo){

	    chrome.tabs.create({url: 'friends.html'})
	});

    }, false);
    alert('here')
    chrome.identity.getProfileUserInfo(function(userinfo){

	var  uniqueId=userinfo.email.split("@")[0];
	var  uid = -1;
	var total = 0;
	
	// code to GET users
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "http://localhost:8080/api/users", true);
	xhr.onreadystatechange = function () {
	    if (xhr.readyState !== 4) {
		return
	    }
            var data = JSON.parse(xhr.responseText);
            for (object in data) {
		if (data[object]["username"] === uniqueId) {
                    uid = data[object]["id"];
		}
		total = data[object]["id"];
            }

	    var xhr1 = new XMLHttpRequest();
	    if (uid != -1) {

		// update server with info on current tab
		var xhr1 = new XMLHttpRequest();
		xhr1.open("PUT", 'http://localhost:8080/api/users/'.concat(uid).concat('/'), true);
		xhr1.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		
		chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
		    var url = tabs[0].url;
		    var d = new Date();
		    var a = "id=".concat(uid);
		    var b = "&lastVisitedTime=".concat(d.toLocaleDateString());
		    var c = "&lastVisitedUrl=".concat(url);
		    xhr1.send(a.concat(b).concat(c));
		});
	    }

	    
	}
	xhr.send();
    })
    
}, false);
