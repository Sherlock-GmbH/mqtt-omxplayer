# mqtt-omxplayer

Control your Raspberry PI OMX media player via MQTT messages.

## Usage
The script offers some simple parameters which are used to build the connection URL and the identification of your player.

```
node index.js host=192.168.1.1 username=myUser password=myPass namespace=myNamespace playerId=myPlayer
```

### MQTT messages

*play-video*
topic: myNamespace/mqtt-media-player/myPlayer/play-video
payload: http://www.example.com/test.mp4

*play-audio*
topic: myNamespace/mqtt-media-player/myPlayer/play-audio
payload: http://www.example.com/test.mp3

*stop-video* or *stop-audio*
topic: myNamespace/mqtt-media-player/myPlayer/stop-video
payload: empty

*volume-up* or *volume-down*
topic: myNamespace/mqtt-media-player/myPlayer/volume-up
payload: empty

### Setup

*Download / Clone GIT Repo*

`git clone https://github.com/Sherlock-GmbH/mqtt-omxplayer.git`

*Install dependencies*

`npm install`

*Start script*

`npm start`

If you get the following error:

`Error: failed to open vchiq instance`

just do the following.

`chmod a+rw /dev/vchiq`

### References

https://github.com/elalemanyo/raspberry-pi-kiosk-screen
