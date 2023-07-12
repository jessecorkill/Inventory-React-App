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

const Stack = createNativeStackNavigator();



export default function App() {
    //const [hasPermission, setHasPermission] = useState(null);
    const [inventoryUpdate, setInventoryUpdate] = useState([]); //Will be an array of arrays (inventory containers). Each container object will have sub item objects with details of the items being added / removed.
    const [selectedItem, selectItem] = useState(null);
    const [inventoryHistory, setInventoryHistory] = useState([]);    
    const [liveInventory, setLiveInventory] = useState([]);
    
    //Function for components to temporarily hold an item's data to view and edit
    const holdItem = (itemCode) => {      
      selectItem(itemCode)
      //Alert.alert('Item Held', itemCode);
    }
    EventEmitter.subscribe('itemScannedEvent', (event) => holdItem(event));

    //Function to allow child components to add new changes to inventory. 
    const addInventoryChange = (itemChange) => {
      let containerKey = {'Truck A': 0, 'Truck B': 1, 'Warehouse A': 2, 'Warehouse B': 3} // Will have to by dynamically generated with a callback function
      const newInventory = inventoryUpdate;
      const contIndex = containerKey[itemChange.container]; // Eg. 1
      if(!newInventory[contIndex]){
        newInventory[contIndex] = []; // Initiate container if it doesn't exist. 
      }           
      newInventory[contIndex].push(itemChange); // Make a new version of the inventory change index w/ the new item change object added.
      setInventoryUpdate(newInventory);
      
      // const newHistory = inventoryHistory.append(newInventory); 
      // setInventoryHistory(newHistory);
    }

    EventEmitter.subscribe('inventoryChangeEvent', (event) => addInventoryChange(event));

  return (
    <NavigationContainer>
      <Stack.Navigator>        
        <Stack.Screen name="Main" component={MainMenu}></Stack.Screen>
        <Stack.Screen name="Scanner"  component={ScannerView} initialParams={{heldItem: selectedItem, items: inventoryUpdate}}></Stack.Screen>
        <Stack.Screen name="Counter" component={CounterView} initialParams={{heldItem: selectedItem, items: inventoryUpdate}}></Stack.Screen>
        <Stack.Screen name ="Preview" component={Preview}  initialParams={{items: inventoryUpdate}}></Stack.Screen>      
        <Stack.Screen name="Response" component={ResponseView} initialParams={{items: inventoryUpdate}}></Stack.Screen>  
      </Stack.Navigator>
    </NavigationContainer>
  );
} 
