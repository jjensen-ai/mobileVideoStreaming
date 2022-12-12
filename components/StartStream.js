import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

function StartStream({uName, setName, roomId, setRoomiD, joinRoom}) {
  return (
    <SafeAreaView>
      {/* Input Area Section */}
      <View style={styles.inputArea}>
        <View style={styles.info}>
          <TextInput
            style={styles.textInput}
            value={uName}
            onChangeText={text => setName(text)}
            placeholder="Enter UserNamee"
            placeholderTextColor={'#535454'}
          />
        </View>
        <View style={styles.info}>
          <TextInput
            style={styles.textInput}
            value={roomId}
            onChangeText={text => setRoomiD(text)}
            placeholder="Enter Room ID"
            placeholderTextColor={'#535454'}
          />
        </View>
        <View style={{alignItems: 'center', marginTop: 75}}>
          <TouchableOpacity
            style={styles.startButton}
            onPress={() => joinRoom()}>
            <Text style={styles.buttonText}>Start Stream</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  info: {
    marginTop: 30,
    padding: 10,
    width: '90%',
    height: 50,
    backgroundColor: '#598f8e',
    borderRadius: 15,
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    justifyContent: 'center',
    shadowColor: '#101010',
    shadowOffset: {
      width: 6,
      height: 3,
    },
    shadowOpacity: 1,
    shadowRadius: 6,
  },
  inputArea: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    fontSize: 20,
    color: '#efe',
  },
  startButton: {
    width: 250,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#19b55a',
    borderRadius: 50,
    shadowColor: '#101010',
    shadowOffset: {
      width: 6,
      height: 3,
    },
    shadowOpacity: 1,
    shadowRadius: 6,
  },
  buttonText: {
    fontSize: 18,
    fontweight: 'bold',
  },
});

export default StartStream;
