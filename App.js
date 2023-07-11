import {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert, Component, SafeAreaView, ScrollView, FlatList, Button} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ThemeProvider} from 'react-native-elements';
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
    
    //Function for components to temporarily hold an item's data to view and edit
    const holdItem = (itemCode) => {      
      selectItem(itemCode)
      //Alert.alert('Item Held', itemCode);
    }
    EventEmitter.subscribe('itemScannedEvent', (event) => holdItem(event));

    //Function to allow child components to add new changes to inventory. 
    const addInventoryChange = (itemChange) => {
      const newInventory = inventoryUpdate;
      const cont = itemChange.container;
      if(!newInventory[cont]){
        newInventory[cont] = []; // Initiate container if it doesn't exist. 
      }           
      newInventory[cont].push(itemChange); // Make a new version of the inventory change index w/ the new item change object added.
      setInventoryUpdate(newInventory); 
      
      // const newHistory = inventoryHistory.append(newInventory); 
      // setInventoryHistory(newHistory);
    }

    EventEmitter.subscribe('inventoryChangeEvent', (event) => addInventoryChange(event));

    const today = new Date();


//For App Later..
//<FlatList style={styles.dataDisplay} data={items} renderItem={renderItem} keyExtractor={(item) => item.time}/>
  return (
    <NavigationContainer>
      <Stack.Navigator>        
        <Stack.Screen name="Main" component={MainMenu}></Stack.Screen>
        <Stack.Screen name="Scanner"  component={ScannerView} initialParams={{items: inventoryUpdate}}></Stack.Screen>
        <Stack.Screen name="Counter" component={CounterView} initialParams={{heldItem: selectedItem, items: inventoryUpdate}}></Stack.Screen>
        <Stack.Screen name ="Preview" component={Preview}  initialParams={{items: inventoryUpdate}}></Stack.Screen>      
        <Stack.Screen name="Response" component={ResponseView} initialParams={{items: inventoryUpdate}}></Stack.Screen>  
      </Stack.Navigator>
    </NavigationContainer>
  );
} 

const styles = StyleSheet.create({
  dataDisplay:{
    flex: 1,
    backgroundColor: '#fff',
  },
  buttonDisplay:{
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 0,
    elevation: 0,
  },
    title: {
      textAlign: 'center',
      marginVertical: 8,
    },
    fixToText: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    separator: {
      marginVertical: 8,
      borderBottomColor: '#737373',
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    visible: {
        backgroundColor: '#e91e63',
    },
    nonVisible: {
        backgroundColor: 'rgba(30,99,233,1)',
    }
});
