// var commandLineArgs = require('command-line-args')
var mqtt = require('mqtt');
// Init broker URL
var url = 'tcp://192.168.1.20';
// TODO use command-line-args
console.log('MQTT subscriber connecting: ', url);
var client = mqtt.connect(url);
// Init references
var vp = {};

client.on('connect', function () {
  console.log('MQTT subscriber connected: ', url);
  // subscribe to all topics catch all
  client.subscribe('#');
});

client.on('message', function (topic, message) {
  // split topic
  console.log('MQTT subscriber topic: ', topic.toString());
  // message is Buffer
  console.log('MQTT subscriber message: ', message.toString())
  // var topic = message.destinationName;
  var action = topic.toString().split('/').pop();
  console.log('MQTT subscriber action: ', action);
  var payload = message.toString();
  console.log('MQTT subscriber payload: ', payload);

  switch (action) {
    case 'play':
      console.log('Play:', payload);
      break;
    case 'stop':
      console.log('Stop');
      break;
    case 'pause':
      console.log('Pause');
      break;
    case 'resume':
      console.log('Resume');
      break;
  }
});
