import '@babel/polyfill'; // hacky fix that makes the web verison work
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { withAuthenticator } from 'aws-amplify-react-native';


import Amplify from 'aws-amplify';
import awsmobile from './aws-exports';
Amplify.configure({...awsmobile, Analytics: { disabled: true }}); // Note: Disabling analytics was a hacky way of getting warning to disappear

class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Yo!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default withAuthenticator(App, { includeGreetings: true })