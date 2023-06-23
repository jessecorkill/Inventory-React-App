import {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert, Component, SafeAreaView, ScrollView, FlatList, Button} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ThemeProvider} from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainMenu from './views/main_menu.js';
import ScannerView from './views/scanner_view.js';

const Stack = createNativeStackNavigator();



export default function App() {
    //const [hasPermission, setHasPermission] = useState(null);
    const [curPage, setCurPage] = 'main';

    const today = new Date();


//For App Later..
//<FlatList style={styles.dataDisplay} data={items} renderItem={renderItem} keyExtractor={(item) => item.time}/>
  return (
    <NavigationContainer>
      <Stack.Navigator>        
        <Stack.Screen name="Main" component={MainMenu}></Stack.Screen>
        <Stack.Screen name="Scanner" component={ScannerView}></Stack.Screen>
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
