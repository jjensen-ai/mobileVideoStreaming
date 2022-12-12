import React, {useState, useEffect, useRef} from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';
import Socket from 'socket.io-client';

import StartStream from '../components/StartStream';
import StreamButtons from '../components/StreamButtons';

import {io} from 'socket.io-client';
import {
  RTCView,
  RTCPeerConnection,
  RTCIceCandidate,
  mediaDevices,
} from 'react-native-webrtc';

const config = {
  iceServers: [
    {
      urls: ['stun:stun.l.google.com:19302'],
    },
  ],
};

function OpenRoom({route}) {
  const {activeUsers, uName, roomId} = route.params;

  const peerConnections = useRef([]);
  const [stream, setStream] = useState(null);
  const [streamSocket] = useState(Socket.connect('http://localhost:3001'));

  const launchCamera = async () => {
    console.log('lets go!');
    const devices = await mediaDevices.enumerateDevices();
    console.log(devices);
    if (!stream) {
      let myStream;
      try {
        myStream = await mediaDevices.getUserMedia({video: true});
        setStream(myStream);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const killStream = () => {
    console.log('Stream Killed');
    if (stream) {
      stream.release();
      setStream(null);
    }
  };

  return (
    <View>
      <View style={styles.usersBox}>
        {console.log(`you are in this room`)}
        {console.log(activeUsers)}
        {console.log(uName)}
        <View>
          {stream && (
            <RTCView streamURL={stream.toURL()} style={styles.cameraViewer} />
          )}
          <Text>{uName}</Text>
          <Button title="Start" onPress={launchCamera} />
          <Button title="Stop" onpress={killStream} />
        </View>
        {activeUsers.map((user, index) => (
          <View key={index} style={styles.userContainer}>
            <Text style={styles.userText}>{user.uName}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

export default OpenRoom;

const styles = StyleSheet.create({
  usersBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  userContainer: {
    borderColor: 'white',
    borderWidth: 1,
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  userText: {
    color: 'white',
  },
  cameraViewer: {
    width: 300,
    height: 300,
    backgroundColor: '#1d1d1d',
  },
});
