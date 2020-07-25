document.addEventListener('DOMContentLoaded', function() {
  var checkPageButton = document.getElementById('checkPage');
  checkPageButton.addEventListener('click', function() {

  // update server with info on current tab
  var xhr1 = new XMLHttpRequest();
  xhr1.open("POST", 'http://localhost:8080/api/users', true);
  xhr1.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  xhr1.onreadystatechange = function() { // Call a function when the state changes.
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        // do nothing
    }
  }
  chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    var url = tabs[0].url;
    var d = new Date();
    chrome.identity.getProfileUserInfo(function(userinfo){
      var uniqueId=userinfo.email.split("@")[0];
      var a = "username=h".concat(uniqueId);
      var b = "&lastVisitedTime=".concat(d.toLocaleDateString());
      var c = "&lastVisitedUrl=".concat(url);
      xhr1.send(a.concat(b,c));
    });
  });

  // code to GET users
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "http://localhost:8080/api/users", true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      chrome.tabs.create({url: 'friends.html'})
    }
  }
  xhr.send();

  }, false);
}, false);
