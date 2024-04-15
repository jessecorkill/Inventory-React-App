import React, { Component, useState, useEffect} from 'react';
import {View, Text, StyleSheet, Button, SectionList, Alert} from 'react-native';

//function to reformat inventory data to fit for a SectionList. Output should shape like [{title: '', data: [x,y,z]},{title: '', data: [x,y,z]}]
const InventoryList = (inventoryObj) => {   
  const SectionListArr = []; // new array to fill with objects
  const invArrKeys = Object.keys(inventoryObj); //Containers
  let i = 0;
  for(const container in inventoryObj){
    let obj = {}
    let title = invArrKeys[i];
    obj['title'] = title
    obj['data'] = inventoryObj[title].items
    SectionListArr.push(obj);
    i++
  }
  return SectionListArr;
}

const Preview = (props) => {
  const [items, setItems] = useState([]);


  // let liveItems = props.route.params.items;

//Double check the items var is up to date with it's parent's state.
useEffect(() => {
  setItems(props.route.params.items);
}, [props.route.params.items]); // Trigger the effect when 'items' prop changes

useEffect(() => {
  Alert.alert('Inventory Obj', JSON.stringify(items))
}, [items])

let testInv = [{title: 'blah', data: [{itemID: 123, count: 3},{itemID: 133, count: 3},{itemID: 143, count: 3}]},{title: 'foo', data: [{itemID: 163, count: 3},{itemID: 173, count: 3},{itemID: 183, count: 3}]}]
let inventoryArr = InventoryList(items);
Alert.alert('inventoryArr', JSON.stringify(inventoryArr));
  //const [scanned, setScanned] = useState(false);

  //Reformat 



  return (
      <View style={styles.container}>
        <SectionList
          sections={inventoryArr}
          renderItem={({item}) => <Text>{item.itemID}----&gt;{item.count}</Text>}
          renderSectionHeader={({section}) => (
            <Text style={styles.sectionHeader}>{section.title}</Text>
          )}
          keyExtractor={item => `basicListEntry-${item.itemID}`}
        />
        <Button style={styles.submit} title='Submit'></Button>
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
  sectionHeader: {
    fontSize: 20,
    textDecorationStyle: 'underline'

  },
  submit: {

  }

});

export default Preview;