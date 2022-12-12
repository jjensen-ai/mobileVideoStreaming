import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, SafeAreaView} from 'react-native';
import StartStream from '../components/StartStream';
import StreamButtons from '../components/StreamButtons';
import {io} from 'socket.io-client';
// import { Camera } from 'expo-camera';

let socket;

function Room({navigation}) {
  const [uName, setName] = useState();
  const [roomId, setRoomiD] = useState();
  const [activeUsers, setActiveUsers] = useState([]);

  const joinRoom = () => {
    socket.emit('join-room', {roomId: roomId, uName: uName});
    navigation.navigate('OpenRoom', {
      roomId: roomId,
      uName: uName,
      activeUsers: activeUsers,
    });
  };

  useEffect(() => {
    const API_URL = 'http://localhost:3001';
    socket = io(`${API_URL}`);
    console.log('Heyooooo');
    socket.on('connection', () => console.log('connected'));
    socket.on('all-users', users => {
      setActiveUsers(users);
    });
  }, []);

  return (
    <View>
      <StartStream
        uName={uName}
        setName={setName}
        roomId={roomId}
        setRoomiD={setRoomiD}
        joinRoom={joinRoom}
      />
    </View>
  );
}

export default Room;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1e1e1e',
    height: '100%',
  },
  cameraContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
    flex: 1,
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
  usersBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});
