import * as React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

// Array of the options that can be interacted with in the home page
const buttonItem = [
  {
    id: 1,
    name: 'video-camera',
    title: 'New Stream',
    color: '#2ad3bf',
  },
  {
    id: 2,
    name: 'plus-circle',
    title: 'Join',
    color: '#63ba76',
  },
  {
    id: 3,
    name: 'calendar',
    title: 'Schedule',
    color: '#63ba76',
  },
  {
    id: 4,
    name: 'share',
    title: 'Share Screen',
    color: '#63ba76',
  },
];

// Navigation prop is passed in
function MenuButtons({navigation}) {

  // On Press functions will be here

  // Onpress method to navigate to the Room page
  const openMeeting = () => {
    navigation.navigate("Room")
  }
  return (

    // iterates and maps through all the items in the array to generate the different buttons
    <View style={styles.container}>
      {buttonItem.map((item, index) => (
        <View style={styles.buttonContainer} key={index}>
          <TouchableOpacity
          onPress={() => openMeeting()}
           style={{...styles.button, 
            backgroundColor: item.color}}>
            {/* <Fontisto name={item.name} size={20} color='#ede' /> */}
          </TouchableOpacity>
          <Text style={styles.buttonText}>{item.title}</Text>
        </View>
      ))}
    </View>
  );
}

export default MenuButtons;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'space-between',
    borderBottomColor: '#598f8e',
    borderBottomWidth: 2,
    width: '100%',
    paddingBottom: 10,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  buttonText: {
    color: '#ede',
    fontSize: 12,
    fontWeight: '600',
  },
  button: {
    height: 45,
    width: 45,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
});
