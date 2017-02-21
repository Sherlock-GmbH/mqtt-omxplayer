# mqtt-omxplayer

Control your Raspberry PI OMX media player via MQTT messages.

## Usage
The script offers some simple parameters which are used to build the connection URL and the identification of your player.

```
node index.js host=192.168.1.20 username=myUser password=myPass namespace=myNamespace playerId=myPlayer
```

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
