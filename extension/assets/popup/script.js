document.addEventListener('DOMContentLoaded', DOMHandler);

function dataHandler(data) {
    chrome.tabs.query({active: true, currentWindow: true}, function() {
        MessagesInChat.checked = data.MessagesInChat;
        Activator.checked = data.MasterSwitch;
    });
};

function DOMHandler() {
    // Checkboxes in HTML
    let Activator = document.getElementById('master-switch');
    let MessagesInChat = document.getElementById('messages-in-chat');
    if (
        Activator &&
        MessagesInChat
    ) {
        // Set current state in group
        chrome.storage.sync.get([
            'MasterSwitch',
            'MessagesInChat'
        ], function(data) {
            dataHandler(data);
        });
        // Update settings value
        Activator.addEventListener('change', function() {
            chrome.storage.sync.set({MasterSwitch: this.checked});
            initiateReload();
            refreshScript();
        });
    };
};

function initiateReload() {
    var reloadChangeDiv = document.getElementById("reload-change-div");
    var reloadNotif = document.getElementById("reload-notification");
    reloadChangeDiv.style.paddingBottom = "5px";
    reloadNotif.style.display = "flex";
}

function refreshScript() {
    chrome.tabs.query({url: "https://web.whatsapp.com/"}, function(tabs) {
        if (tabs.length !== 0) tabs.forEach(function(tab) {
            chrome.scripting.executeScript({
                target: {tabId: tab.id, allFrames: true},
                files: ['/loader.js'],
            });
        });
    });
};