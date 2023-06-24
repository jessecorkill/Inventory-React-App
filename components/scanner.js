import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert, Component, SafeAreaView, ScrollView, FlatList } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Button, ThemeProvider } from 'react-native-elements';
import { BarCodeScanner } from 'expo-barcode-scanner';

// Item component for rendering individual items
const Item = ({ title }) => (
  <View>
    <Text>{title}</Text>
  </View>
);

// Main Scanner component
export default function Scanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [isVisible, setVisibility] = useState(false);
  const [items, setItems] = useState([]);
  const [counter, setCounter] = useState(0);

  const today = new Date();

  useEffect(() => {
    // Request camera permissions on component mount
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    const newItems = items.concat('banana');
    setItems(newItems);
    setCounter(counter + 1);
  };

  const renderItem = ({ item }) => {
    // Render individual item using the Item component
    <Item title={item.title} />
  };

  const toggleVis = () => {
    setVisibility(!isVisible);
  }

  // Render different UI components based on camera permission
  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  // Main component UI
  return (
    <View style={styles.container}>
      <View style={styles.barcodeDisplay}>
        <StatusBar style="auto" />
        <BarCodeScanner onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} style={styles.barcode} />
        {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
      </View>
      <View style={styles.buttonDisplay}>
        <Button title="Push Me" onPress={() => { toggleVis }} />
        <Button title={counter} onPress={() => { setCounter(counter + 1) }} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
    dataDisplay:{
      flex: 1,
      backgroundColor: '#fff',
    },
    barcodeDisplay:{
      flex: 4,
      backgroundColor: '#e3e3e3',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1,
      elevation: 1,
      width: 400,
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
      },
      barcode:{
          width: '75%',
          height: '100%',
      }
  
  });
