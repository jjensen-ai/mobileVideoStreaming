import * as React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  SafeAreaView,
  StyleSheet,
} from 'react-native';


const buttonItem = [
  {
    id: 1,
    name: 'microphone',
    title: 'Mute',
  },
  {
    id: 2,
    name: 'video-camera',
    title: 'Stop Video',
  },
  {
    id: 3,
    name: 'upload',
    title: 'Share',
  },
  {
    id: 4,
    name: 'group',
    title: 'Guests',
  },
];

function StreamButtons() {
  return (
    <View style={styles.footerMenu}>
      {/* {buttonItem.map((icon, index) => (
        <TouchableOpacity style={styles.buttonTiles} key={index}>
          <FontAwesome name={icon.name} size={25} color={'#efe'} />
          <Text style={styles.buttonText}>{icon.title}</Text>
        </TouchableOpacity>
      ))} */}

      <Text>Yo</Text>
    </View>
  );
}

export default StreamButtons;

const styles = StyleSheet.create({
  footerMenu: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 8
  },
  buttonTiles: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 65,
    width: 75,
    padding: 5,
  },
  buttonText: {
    color: '#efe',
    fontSize: 12,
    marginTop: 6
  },
});
