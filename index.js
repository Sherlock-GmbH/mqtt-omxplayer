// var commandLineArgs = require('command-line-args')
var mqtt = require('mqtt');
var exec = require('child_process').exec;
var kill = require('tree-kill');

var myLog = function(lbl, vars) {
  if (verbose) console.log(lbl, vars);
}

// check for command line arguments
var args = process.argv.slice(2);
var opts = {};
for(var i = 0; i < args.length; i++) {
  if(args[i].indexOf('=') > 0) {
    var parts = args[i].split('=');
    opts[parts[0]] = parts[1];
  }
}

myLog('Command parameters: ', opts);

var verbose = (opts.verbose) ? true : false;
var url = 'tcp://';
if (opts.username && opts.password) {
  url += opts.username + ':' + opts.password + '@';
}
url += (opts.host) ? opts.host : 'localhost';
myLog('MQTT subscriber connecting: ', url);
var client = mqtt.connect(url);
var sref = null;
var namespace = opts.namespace || 'namespace';
var playerId = opts.playerId || 'player01';

client.on('connect', function () {
  myLog('MQTT subscriber connected: ', url);
  var topicSubscription = namespace + '/mqtt-media-player/' + playerId + '/#';
  myLog('MQTT subscribe to: ', topicSubscription);
  client.subscribe(topicSubscription);
});

var stopRunningPlayer = function() {
  if(sref && sref.pid > 0){
    kill(sref.pid, 'SIGTERM', function(){
      myLog('Killed OMX player with PID: ', sref.pid);
      sref = null;
    });
  }
}

client.on('message', function (topic, message) {
  var action = topic.toString().split('/').pop();
  myLog('MQTT subscriber action: ', action);
  var payload = message.toString();
  myLog('MQTT subscriber payload: ', payload);

  switch (action) {
    case 'play-video':
      stopRunningPlayer();
      var call = 'omxplayer -o local ' + payload + ' --orientation 0 --aspect-mode stretch';
      sref = exec(call);
      break;
    case 'play-audio':
      stopRunningPlayer();
      var call = 'omxplayer -o local ' + payload;
      sref = exec(call);
      break;
    case 'play-video-loop':
      stopRunningPlayer();
      sref = exec('trap "exit" INT; while true; do omxplayer -o hdmi ' + payload + '; done')
      break;
    case 'stop-video':
    case 'stop-audio':
      stopRunningPlayer();
      break;
    case 'volume-up':
      if(sref) sref.stdin.write('+');
      break;
    case 'volume-down':
      if(sref) sref.stdin.write('-');
      break;
  }
});
