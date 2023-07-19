import React, { Component, useState } from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import Scanner from '../components/scanner';
import { EventEmitter } from '../events/eventIndex';



const ResponseView = (props) => {

//const { eventName } = props.route.params;

  //const [scanned, setScanned] = useState(false);




  return (
    <View style={styles.container}>
      <Text>Done!</Text>
      <Button title="Back to Menu"></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default ResponseView;