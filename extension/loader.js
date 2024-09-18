// Get storage data
chrome.storage.sync.get([
    'MasterSwitch',
    'MessagesInChat'
], function(data) {
    styleManager(data);
});

// Remove blur from specific element
function removeStyleById(id) {
    if (element = document.getElementById(id)) {
        element.parentNode.removeChild(element);
    };
};

// Add blur to a specific element
function addBlurStyle(id) {
    if(!document.getElementById(id)) {
        var link = document.createElement('link');
        link.id = id;
        link.className = 'blur-elements';
        link.href = chrome.runtime.getURL('assets/css/' + id + '.css');
        link.rel = 'stylesheet';
        document.getElementsByTagName("head")[0].appendChild(link);
    };
};

// Remove or add blur to a specific element based on storage data
function styleManager(data) {
    if (data.MasterSwitch) {

        if (data.Messages) addBlurStyle('MessagesInChat'); else removeStyleById('MessagesInChat');

    } else if (document.getElementsByClassName('blur-elements').length > 0) {
        var element = document.getElementsByClassName('blur-elements');
        while (element.length > 0) {
            element[0].parentNode.removeChild(element[0]);
        };
    };
};