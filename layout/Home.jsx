import * as React from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import ContactsMenu from '../components/ContactsMenu';
import Header from '../components/Header';
import MenuButtons from '../components/MenuButtons';
import SearchBar from '../components/SearchBar';


function Home({navigation}) {
  return (

    // Lay out of the home page built with components
    <View style={styles.container}>
        <SafeAreaView style={{height: '100%'}}>
            <Header/>
            <SearchBar/>
            {/* Takes a prop of navigation to pass to a button in the component */}
            <MenuButtons navigation={navigation}/>
            <ContactsMenu/>
        </SafeAreaView>
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
    container: {
        backgroundColor:'#1e1e1e',
        padding: 15
    }

})
