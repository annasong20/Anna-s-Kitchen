document.addEventListener('DOMContentLoaded', function() {
  var checkPageButton = document.getElementById('checkPage');
  checkPageButton.addEventListener('click', function() {
     
  var activeTab = "";

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
     activeTab = tabs[0];
     //alert(activeTab.url);
  });

  chrome.tabs.create({'url': chrome.extension.getURL('friends.html')}, function(tab) {
      // Tab opened.
  });


  }, false);
}, false);
