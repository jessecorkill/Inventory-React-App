import React, { Component, useState } from 'react';
import {View, Text, StyleSheet, Button, SectionList, Alert} from 'react-native';
import Scanner from '../components/scanner';
import { EventEmitter } from '../events/eventIndex';

//function to reformat inventory data to fit for a SectionList. Output should shape like [{title: '', data: [x,y,z]},{title: '', data: [x,y,z]}]
const InventoryList = (invArr) => {  
  let containerKey = {'Truck A': 0, 'Truck B': 1, 'Warehouse A': 2, 'Warehouse B': 3} // Will have to by dynamically generated with a callback function
  const SectionListArr = []; // new array to fill with objects
  const invArrKeys = invArr.keys(); //Container IDs
  let i = 0;
  invArr.forEach(container => {
    //Convert container array to object
    const title = invArrKeys[i];
    let obj = {}
    obj['title'] = title
    obj['data'] = container
    SectionListArr.push(obj)
    i++;
  });

  return SectionListArr;
}

const Preview = (props) => {

const { items } = props.route.params;

let testInv = [{title: 'blah', data: [{itemID: 123, count: 3},{itemID: 133, count: 3},{itemID: 143, count: 3}]},{title: 'foo', data: [{itemID: 163, count: 3},{itemID: 173, count: 3},{itemID: 183, count: 3}]}]
let inventoryArr = InventoryList(items);
Alert.alert('inventoryArr', JSON.stringify(inventoryArr))
  //const [scanned, setScanned] = useState(false);

  //Reformat 



  return (
    <View style={styles.container}>
      <Text>Preview View</Text>
      <SectionList
        sections={testInv}
        renderItem={({item}) => <Text>{item.itemID}{item.count}</Text>}
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