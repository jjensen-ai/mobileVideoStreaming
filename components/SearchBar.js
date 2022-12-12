import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
Fontisto.loadFont().then()

//TODO: 1. Look up how to do an inset searchbar, nice shadows, nice gradient

function SearchBar() {
  return (
    // <View style={styles.container}>
    //   <Fontisto name='search' size={20} color='#ede' />
    //   <Text style={styles.search}>Search</Text>
    // </View>
    <View>
      <Text>Yo</Text>
    </View>
  );
}

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#598f8e',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 'auto',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10
  },
  search: {
    color: '#ede',
    paddingLeft: 8,
    fontWeight: 'bold'
  },
});
