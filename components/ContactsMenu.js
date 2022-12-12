import * as React from 'react';
import {View, Text, SafeAreaView, StyleSheet, Image} from 'react-native';


// Array of JSON to pass to a loop
const ContactsMenuButtons = [
  {
    type: 'favourite',
    name: 'Favourites',
  },
  {
    type: 'contact',
    name: 'multimokia',
    photo: require('../assets/multimokia.png'),
  },
  {
    type: 'contact',
    name: 'Deku',
    photo: require('../assets/Deku.webp'),
  },
  {
    type: 'contact',
    name: 'Stan',
    photo: require('../assets/staniel.jpg'),
  },
];

function ContactsMenu() {
  // Returning each of the contacts already listed
  return (
    <View style={styles.container}>
      {/* Each contact has been mapped to the rows, conditional operator on the
      type key:value pair */}
      {ContactsMenuButtons.map((contacts, index) => (
        <View key={index} style={styles.row}>
          {contacts.type == 'favourite' ? (
            <View style={styles.image}>
              {/* <Fontisto name="heart-o" size={25} color="#ede" /> */}
            </View>
          ) : (
            <Image source={contacts.photo} style={styles.image} />
          )}
          <View style={styles.info}>
            <Text style={styles.text}>{contacts.name}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

export default ContactsMenu;

const styles = StyleSheet.create({
  container: {
    margin: 15,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 15,
    backgroundColor: '#598f8e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#ede',
    fontSize: 20,
    fontWeight: '600',
  },
  info: {
    marginLeft: 10,
  },
});
