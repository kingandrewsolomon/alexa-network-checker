const alexa = require('alexa-app');
const speedTest = require('speedtest-net');

let app = new alexa.app('network_checker');
app.id = require('./package.json').alexa.applicationId;

app.launch(function(req, res) {
    res.say('Welcome to the Alexa Internet Checker. ' +
    'I can check the ping, the download speed, the upload speed, or all three');
});

app.intent('GetDownloadIntent', {
    "utterances": [ "check download speed", "check download", "download"]
}, function(req, res) {
    return downloadChecker().then(
        (data) => {
            let download = Math.round(data);
            return res.say(`Your download speed is, ${download} megabits per second`);        
        });
});

app.intent('GetUploadIntent', {
    "utterances": ["check upload speed", "check upload", "upload"]
}, function(req, res) {
    return uploadChecker().then(
        (data) => {
            let upload = Math.round(data);
            return res.say(`Your upload speed is, ${upload} megabits per second`);
        });
});

app.intent('GetPingIntent', {
    "utterances": ["check ping status", "check ping", "ping"]
}, function(req, res) {
    return pingChecker().then(
        (ping) => {
            return res.say(`Your ping is, ${ping} milliseconds`);
        });
});

app.intent('GetStatusIntent', {
    "utterances": ["check internet status", "check internet", "check status", "check internet strength"]
}, function(req, res) {
    return getInternetSpeed().then(
        (data) => {
            return res.say(`Your ping status is, ${data.ping} milliseconds. Your download speed is, ${data.download} megabits per second. Your upload speed is, ${data.upload} megabits per second`);
        }); 
});

module.exports = app;

async function internetChecker() {
    return new Promise((resolve, reject) => {
        test.on('data', data => { resolve(data) });
    });
}

async function getInternetSpeed() {
    return new Promise((resolve, reject) => {
        internetChecker().then((data) => {
            let download = data.speeds.download;
            let upload = data.speeds.upload;
            let ping = data.server.ping;

            resolve({download, upload, ping});
        });
    });
}

async function downloadChecker() {
    return new Promise((resolve, reject) => {
        let test = speedTest({maxTime: 5000});
        test.on('downloadSpeed', data => { resolve(data) });
    });
}

async function uploadChecker() {
    return new Promise((resolve, reject) => {
        let test = speedTest({maxTime: 5000});
        test.on('uploadSpeed', data => { resolve(data) });
    });
}

async function pingChecker() {
    return new Promise((resolve, reject) => {
        let test = speedTest({maxTime: 5000});
        test.on('data', data => { resolve(data.server.ping) });
    });
}