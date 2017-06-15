import Expo from 'expo';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import GetItems from './containers/items'

class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        
        <Text style={styles.header}>Products List</Text>
        <GetItems />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 50,
    paddingBottom: 210
  },
  header: {
    fontSize: 20,
    textAlign: 'center'
  }
});

Expo.registerRootComponent(App);
