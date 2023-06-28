import React, { Component, useState } from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import Scanner from '../components/scanner';
import { event } from '../events/eventIndex';
import { EventEmitter } from '../events/eventIndex';



const ScannerView = (props) => {

const { eventName } = props.route.params;

  const [scanned, setScanned] = useState(false);

  // Button to render if scanned == true
  const ContinueBtn = ({ title }) => (
    <View>
      <Button
        title={"Continue"} 
        onPress={() => props.navigation.navigate('Counter', {name: 'Jane'})}
      >
          {title}
      </Button>
    </View>
  );

  //Function to pass to sub components to change the state of 'scanned'
  const handleBarCodeScanned = (itemData) => {
    //alert(JSON.stringify(props))
    //props.route.holdItem(itemData); // Undefined is not a function, meaning it doesn't think holdItem is a function
    setScanned(true);
  }

  return (
    <View style={styles.container}>
      <Scanner handleScan={handleBarCodeScanned}></Scanner>
      {scanned == true && <ContinueBtn></ContinueBtn>}
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

export default ScannerView;