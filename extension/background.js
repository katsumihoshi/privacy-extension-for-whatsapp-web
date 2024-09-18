chrome.runtime.onInstalled.addListener(onInstalledListener);

// Set default value if the data is null
function setDefaultIfNull(data, key, defaultValue) {
    if (data[key] == null) {
        let defaultObject = {};
        defaultObject[key] = defaultValue;
        chrome.storage.sync.set(defaultObject);
    };
};

// Handle chrome.storage.sync.get data
function handleStorageData(data) {
    setDefaultIfNull(data, 'MasterSwitch', true);
    setDefaultIfNull(data, 'MessagesInChat', true);
};

// Set storage variables
function onInstalledListener() {
    chrome.storage.sync.get([
        'MasterSwitch',
        'MessagesInChat'
    ], function(data) {
        handleStorageData(data);
    });
};

// Refresh extension on webpage reload
function statusHandler(tabs) {
    if (tabs.length !== 0) {
        tabs.forEach(function(tab) {
            chrome.tabs.executeScript(tab.id, {file: "loader.js"});
        });
    };
};
chrome.tabs.query({url: "https://web.whatsapp.com/"}, function(tabs) {statusHandler(tabs);});