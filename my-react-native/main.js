import Expo from 'expo';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Main from './components/Products';

class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        
        <Main />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 50,
    marginBottom: 50,
    paddingBottom: 250
  },
});

Expo.registerRootComponent(App);
