var self = require("sdk/self");
var tabs = require("sdk/tabs");
var Request = require("sdk/request").Request;

var sitejson;

var jsonRequest = Request({
  url: self.data.url("sites.json"),
  onComplete: function (response) {
    sitejson = response.json;
  }
}).get();

tabs.on("ready", assertIllegal);
function assertIllegal() {
    require("sdk/tabs").activeTab.attach({
        contentScriptFile: self.data.url("contentscript.js"),
        contentScriptOptions: {"hosts": sitejson}
    });
}


