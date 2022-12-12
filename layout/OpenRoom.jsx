import React, {useState, useEffect, useRef} from 'react';
import {View, StyleSheet, Text, SafeAreaView} from 'react-native';
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

  const peerConnections = useRef(new Map());
  const [stream, setStream] = useState({toURL: () => null});
  const [streamSocket] = useState(Socket.connect('http://192.168.2.129:3001'));



  // Establish a connection for the stream here

  useEffect(() => {
    streamSocket.on('connection', () => {

      // Seeing if the server has sent out a brocast signal
      if (stream) streamSocket.emit('broadcaster');

      //allows for people to view from broacaster
      streamSocket.on('watcher', async roomId => {
        const connectionBuffer = new RTCPeerConnection(config);

        stream.getTracks().forEach(track =>
          connectionBuffer.addTrack(track, stream),
        );

        connectionBuffer.onicecandidate = ({candidate}) => {
          if (candidate) streamSocket.emit('candidate', roomId, candidate);
        };

        //Sending out events for create the handshake between the peer to peer connections

        const localDescription = await connectionBuffer.createOffer();

        await connectionBuffer.setLocalDescription(localDescription);

        streamSocket.emit('offer', roomId, connectionBuffer.localDescription);

        peerConnections.current.set(uName, connectionBuffer);
      });

      streamSocket.on('candidate', (roomId, candidate) => {
        const candidateBuffer = new RTCIceCandidate(candidate);
        const connectionBuffer = peerConnections.current.get(roomId);

        connectionBuffer.addIceCandidate(candidateBuffer);
      });

      streamSocket.on('answer', (uName, remoteOfferDescription) => {
        const connectionBuffer = peerConnections.current.get(uName);

        connectionBuffer.setRemoteDescription(remoteOfferDescription);
      });

      streamSocket.on('disconnectPeer', uName => {
        peerConnections.current.get(uName).close();
        peerConnections.current.delete(uName);
      });
    });

    return () => {
      if (streamSocket.connected) streamSocket.close();
    };
  }, [streamSocket, stream]);

  useEffect(() => {
    if (!stream) {
      (async () => {
        const myDevices =  mediaDevices.enumerateDevices();
        const {deviceId: sourceId} = myDevices.find(
          device => device.kind === 'videoinput' && device.facing === 'front',
        );

        const streamBuffer = mediaDevices.getUserMedia({
          audio: true,
          video: {
            mandatory: {
              minwidth: 400,
              minHeight: 200,
              minFrameRate: 30,
            },
            facingMode: 'user',
            optional: [{sourceId}],
          },
        });
        setStream(streamBuffer);
      })();
    }
  }, [stream]);

  return (
    <View>
      <View style={styles.usersBox}>
        {console.log(`you are in this room`)}
        {console.log(activeUsers)}
        {console.log(uName)}
        <View>
          <RTCView streamURL={stream.toURL()} style={styles.cameraViewer} />
          <Text>{uName}</Text>
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
    flex: 1,
    backgroundColor: '#1d1d1d',
  },
});
