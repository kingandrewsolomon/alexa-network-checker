let AlexaAppServer = require('alexa-app-server');

let instance = AlexaAppServer.start({
    server_root: __dirname,
    port: 8080,
    preRequest: function(json, req, res) {
        console.log("preRequest fired");
        json.userDetails = { "name": "Andrew Solomon" };
    },
    postRequest: function(json, req, res) {
        json.dummy = "text";
    }
});