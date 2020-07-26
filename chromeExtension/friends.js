document.addEventListener('DOMContentLoaded', function() {
/*
    chrome.identity.getProfileUserInfo(function(userinfo) {
        var  uniqueId=userinfo.email.split("@")[0];
        var  uid = -1;
        var total = 0;
 
        // code to GET users
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:8080/api/users", true);

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                var data = JSON.parse(xhr.responseText);
                for (object in data) {
                    if (data[object]["username"] === uniqueId) {
                        uid = data[object]["id"];
                    }
                    total = data[object]["id"];
                 }

                var xhr1 = new XMLHttpRequest();
                if (uid != -1) {

                    var xhr2 = new XMLHttpRequest();
                    xhr2.open("DELETE", 'http://localhost:8080/api/users/'.concat(uid), true);
                    xhr2.onreadystatechange = function () {
                        if (xhr2.readyState == 4) {
       		            alert("done");
     		        }
                    }
                    xhr2.send("id=".concat(uid));
                }

                // update server with info on current tab
                var xhr1 = new XMLHttpRequest();
                xhr1.open("POST", 'http://localhost:8080/api/users/', true);
                xhr1.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
     
                chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
                   var url = tabs[0].url;
                   var d = new Date();
                   var uuid = uid;
                   var a = "username=".concat(uniqueId);
                   var b = "&lastVisitedTime=".concat(d.toLocaleDateString());
                   var c = "&lastVisitedUrl=".concat(url);
                   alert(a.concat(b,c));
                   xhr1.send(a.concat(b,c));
                });

            }
      }
      xhr.send();
  });*/


  chrome.identity.getProfileUserInfo(function(userinfo) {
      var  uniqueId = userinfo.email.split("@")[0];
      
 	


      // code to GET users
      var xhr1 = new XMLHttpRequest();
      xhr1.open("GET", "http://localhost:8080/api/users", true);
      xhr1.onreadystatechange = function () {
          if (xhr1.readyState == 4) {
              var users = JSON.parse(xhr1.responseText);
	      var i;
	      var  uId = -1;
	      var usersTable = document.getElementById("users");
	      for (i = 0; i < users.length; i++) {
		  if (uniqueId === users[i].username) {
 		      uId = users[i].id
		  } else {
		      var row = usersTable.insertRow(-1);

	              var nameCell = row.insertCell(0);
	              nameCell.innerHTML = users[i].username;

	              var addCell = row.insertCell(1);
	              addCell.innerHTML = "<button id='add'.concat(i)>Add Friend</button>";
		  }
              }


              if (uId != -1) {
                  // code to GET friends
                  var xhr = new XMLHttpRequest();
                  xhr.open("GET", "http://localhost:8080/api/friends", true);
                  xhr.onreadystatechange = function () {
                      if (xhr.readyState == 4) {
	                  // alert(xhr.responseText);           
                          var friendsPages = JSON.parse(xhr.responseText);
	                  var i;
	                  var friendsTable = document.getElementById("friendBrowsers");

			  var friends = new Set();
                          for (i = 0; i < friendsPages.length; i++) {
                              if (friendsPages[i].parentId === uId) {
				  friends.add(friendsPages[i].siblingId);
                              }
  	          
                          }

			

			  for (i = 0; i < users.length; i ++) {
				if (friends.has(users[i].id)) {
				  var row = friendsTable.insertRow(-1);

	                          var nameCell = row.insertCell(0);
	                          nameCell.innerHTML = users[i].username;

	                          var urlCell = row.insertCell(1);
	                          urlCell.innerHTML = users[i].lastVisitedUrl;

	                          var timeCell = row.insertCell(2);
	                          timeCell.innerHTML = users[i].lastVisitedTime;

				}
			  }



                      }
                  }
                  xhr.send();
              }           
             
          }
      }           
      xhr1.send();

  });

}, false);
