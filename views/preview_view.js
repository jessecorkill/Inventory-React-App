import React, { Component, useState } from 'react';
import {View, Text, StyleSheet, Button, SectionList, Alert} from 'react-native';
import Scanner from '../components/scanner';
import { EventEmitter } from '../events/eventIndex';
import {generateRandomNumberString} from '../services/randomNumString'

//function to reformat inventory data to fit for a SectionList. Output should shape like [{title: '', data: [x,y,z]},{title: '', data: [x,y,z]}]
const InventoryList = (inventoryObj) => {  
  const SectionListArr = []; // new array to fill with objects
  const invArrKeys = Object.keys(inventoryObj); //Containers
  let i = 0;
  for(const container in inventoryObj){
    let obj = {}
    obj['title'] = invArrKeys[i]
    obj['data'] = container.items
    SectionListArr.push(obj);
    i++
  }

  return SectionListArr;
}

const Preview = (props) => {

const { items } = props.route.params; // Not working
Alert.alert('Inventory Obj', JSON.stringify(items))
let testInv = [{title: 'blah', data: [{itemID: 123, count: 3},{itemID: 133, count: 3},{itemID: 143, count: 3}]},{title: 'foo', data: [{itemID: 163, count: 3},{itemID: 173, count: 3},{itemID: 183, count: 3}]}]
let inventoryArr = InventoryList(items);
//Alert.alert('inventoryArr', JSON.stringify(inventoryArr))
  //const [scanned, setScanned] = useState(false);

  //Reformat 



  return (
    <View style={styles.container}>
      <Text>Preview View</Text>
      <SectionList
        sections={inventoryArr}
        renderItem={({item}) => <Text>{item.itemID}</Text>}
        renderSectionHeader={({section}) => (
          <Text style={styles.sectionHeader}>{section.title}</Text>
        )}
        keyExtractor={item => `basicListEntry-${item.itemID}`}
      />
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

export default Preview;