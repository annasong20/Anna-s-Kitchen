document.addEventListener('DOMContentLoaded', function() {
    var checkPageButton = document.getElementById('checkPage');
    checkPageButton.addEventListener('click', function() {

	chrome.identity.getProfileUserInfo(function(userinfo){

	    chrome.tabs.create({url: 'friends.html'})
	});

    }, false);

    var checkTasksButton = document.getElementById('checkTasks');
    checkTasksButton.addEventListener('click', function() {

        chrome.identity.getProfileUserInfo(function(userinfo){

            chrome.tabs.create({url: 'tasks.html'})
        });

    }, false);


    requestWithUser(function(uid) {
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
    })
    
}, false);
