import React, { Component, useState, useEffect, useRef } from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import Scanner from '../components/scanner';
import { EventEmitter } from '../events/eventIndex';
import { GenerateRandomNumberString } from '../services/dataTools';
import {logState, logLifecycleEvent} from '../services/logger.js';



const ScannerView = (props) => {

  const { heldItem, items } = props.route.params;

  const [scanned, setScanned] = useState(false);
  const prevStateRef = useRef(null);
  const state = {
    heldItem : heldItem,
    scanned : scanned
  }
  //Logging START ---------------------------------------------------------------------
  useEffect(() => { // componentDidMount
    logLifecycleEvent('componentDidMount', 'ScannerView Component mounted');
    logState(state);

    return () => { //componentWillUnmount
      logLifecycleEvent('componentWillUnmount', 'ScannerView Component will unmount');        
    };
  })

  useEffect(() => { //componentDidUpdate
    if (prevStateRef.current) {
      logLifecycleEvent('componentDidUpdate', 'ScannerView Component updated');
      logState(prevStateRef.current);
    }
  });

  //Logging END ---------------------------------------------------------------------

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
    if(itemData){
      EventEmitter.dispatch('itemScannedEvent', itemData);
    }
    else{
      //Randomly generate a fake barcode
      var randomNumberString = "";    
      for (var i = 0; i < 10; i++) {
        var randomNumber = Math.floor(Math.random() * 10); // Generate a random number between 0 and 9
        randomNumberString += randomNumber.toString(); // Append the random number to the string
      }      
      EventEmitter.dispatch('itemScannedEvent', randomNumberString);
    }
    //alert(JSON.stringify(props))
    //props.route.holdItem(itemData); // Undefined is not a function, meaning it doesn't think holdItem is a function

    setScanned(true); //Re-Renders
  }

  return (
    <View style={styles.container}>
      <Scanner handleScan={handleBarCodeScanned} heldItem={heldItem}></Scanner>
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