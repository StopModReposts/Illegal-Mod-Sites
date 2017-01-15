var smr_hosts = [];

var xhr_api = new XMLHttpRequest();
xhr_api.open("GET", "https://api.varden.info/smr/sitelist.php", true);
xhr_api.setRequestHeader("Accept", "application/json");
xhr_api.onreadystatechange = function() {
    if (xhr_api.readyState == 4) {
        if (xhr_api.status == 200) {
            smr_hosts = JSON.parse(xhr_api.responseText);
        }
    }
};
xhr_api.send();

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message == 0) {
        sendResponse(smr_hosts);
    }
});
