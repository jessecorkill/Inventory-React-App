import {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Alert, Component, Button} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainMenu from './views/main_menu.js';
import ScannerView from './views/scanner_view.js';
import CounterView from './views/counter_view.js';
import Preview from './views/preview_view.js';
import ResponseView from './views/response.js';
import {EventEmitter} from './events/eventIndex.js'
import {GetData} from './services/get_data.js'
import { DataTools } from './services/dataTools.js';

const Stack = createNativeStackNavigator();



export default function App() {
    //const [hasPermission, setHasPermission] = useState(null); // {containerA:{items:[{a},{b}]},containerB{items:[{c},{d}]}}
    const [inventoryUpdate, setInventoryUpdate] = useState({}); // Will be an object of arrays (inventory containers). Each container object will have sub item objects with details of the items being added / removed.
    const [selectedItem, selectItem] = useState(null);
    const [inventoryHistory, setInventoryHistory] = useState([]);
    const [liveInventory, setLiveInventory] = useState(null);

    //Get Current Inventory from the server
    useEffect(() => {
      if(!liveInventory){
        setLiveInventory(GetData.fetchInventory()); // Faux data fetch
      }
    })

    //Function for components to temporarily hold an item's data to view and edit
    const holdItem = (itemCode) => {      
      selectItem(itemCode)
      //Alert.alert('Item Held', itemCode);
    }
    EventEmitter.subscribe('itemScannedEvent', (event) => holdItem(event));
    //EventEmitter.unsubscribe('itemScannedEvent', (event) => holdItem(event));

    //Function to allow child components to add new changes to inventory. 
    const addInventoryChange = (itemChange) => {
      let newInventory = { ...inventoryUpdate };
      let containerKey = itemChange.container; // Eg. 'Truck A' 
      if(!newInventory[containerKey]){
        newInventory[containerKey] = {items:[]} //Initiate container array if it doesn't exist
      }
      newInventory[containerKey]['items'].push(itemChange); // Make a new version of the inventory change index w/ the new item change object added.
      let lastElement = inventoryHistory[inventoryHistory.length - 1];
      if(lastElement !== newInventory || inventoryHistory.length == 0){ // Ensure that this isn't a re-run of the same item.
        setInventoryUpdate(newInventory); 
        let tempHistory = inventoryHistory;
        tempHistory.push(newInventory);
        let newHistory = tempHistory;
        setInventoryHistory(newHistory); 
      }
      else{
        Alert.alert("Warning", 'addInventoryChange ran more than once!')
      } 
      //Alert.alert("inventory", inventoryUpdate.toString());
    }

    EventEmitter.subscribe('inventoryChangeEvent', (event) => addInventoryChange(event));

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={MainMenu}></Stack.Screen>
        <Stack.Screen name="Scanner"  component={ScannerView} initialParams={{heldItem: selectedItem, items: inventoryUpdate}}></Stack.Screen>
        <Stack.Screen name="Counter" component={CounterView} initialParams={{heldItem: selectedItem, items: inventoryUpdate, inventory: liveInventory}}></Stack.Screen>
        <Stack.Screen name ="Preview" component={Preview}  initialParams={{items: inventoryUpdate}}></Stack.Screen>      
        <Stack.Screen name="Response" component={ResponseView} initialParams={{items: inventoryUpdate}}></Stack.Screen>  
      </Stack.Navigator>
    </NavigationContainer>
  );
} 
