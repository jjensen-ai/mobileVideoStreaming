import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';


//TODO: 1. Look Up Icon Calls/Look at other Icon Packages
//TODO: 2. 

function Header() {

  // General layout for the header of the home page
  return (
    <View style={styles.container}>
      {/* <Fontisto name='notification' size={30} color='#ede' /> */}
      <Text style={styles.heading}>Vroom</Text>
      {/* <Fontisto name='chat' size={30} color='#ede' /> */}
    </View>
  );
}

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 5
  },
  heading: {
    color: '#ede',
    fontSize: 25,
  },
});
