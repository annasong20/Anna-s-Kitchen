document.addEventListener('DOMContentLoaded', function() {
  var checkPageButton = document.getElementById('checkPage');
  checkPageButton.addEventListener('click', function() {

  // code to GET users
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "http://localhost:8080/api/users", true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
        alert(xhr.responseText);
        chrome.tabs.create({url: 'friends.html'}) 
    }
  }
  xhr.send();

  

  }, false);
}, false);
