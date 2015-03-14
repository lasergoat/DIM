'use strict';

(function() {
    
    var openDim = function() {
        
        var optionsUrl = chrome.extension.getURL('window.html');
        chrome.tabs.query({url: optionsUrl}, function(tabs) {
            if (tabs.length) {
                chrome.tabs.update(tabs[0].id, {active: true});
            } else {
                chrome.tabs.create({url: optionsUrl});
            }
        });
    };

    // this script opens the window.html file within a new tab
    // when the DIM icon is clicked
    chrome.browserAction.onClicked.addListener(function(tab) {

        openDim();
    });

    chrome.runtime.onInstalled.addListener(function (details) {

        openDim();
    });

    chrome.tabs.onUpdated.addListener(function (tabId) {
      console.log('onUpdated');
    });

})();

