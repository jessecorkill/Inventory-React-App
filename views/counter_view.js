import {React, useState, useEffect} from 'react';
import { View, Text, StyleSheet, Button, TextInput, Alert } from 'react-native';
import ScrollPicker from 'react-native-wheel-scrollview-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import { EventEmitter } from '../events/eventIndex';
import { DataTools } from '../services/dataTools';

const scrollWheelData = [-10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; 

const CounterView = (props) => {

  const { heldItem, items, inventory } = props.route.params;

  const [theCount, setCounter] = useState('');
  //To-Do have this populate from API data source
  const [containerOptions, setContainerOptions] = useState(null);
  const [containerFieldState, setContainerFieldState] = useState(false);
  const [containerValue, setContainerValue] = useState(null);
  const [finish, setFinish] = useState(false);

  useEffect(() => {
    if(!containerOptions){
      setContainerOptions(DataTools.getContainerOptions(inventory));
    }
  })

  // Button to render if scanned == true
  const ContinuePrompt = ({ title }) => (
    <View style={styles.modal}>
      <Text>Item change added. Would you like to..</Text>
      <View style={styles.modalButtons}>
        <Button
          title={"Add / Remove Another"} 
          style={{margin:5}}
          onPress={() => props.navigation.navigate('Scanner', {})}
        >
            {title}
        </Button>
        <Button
          title={"Preview Changes"} 
          style={{margin:5}}
          onPress={() => props.navigation.navigate('Preview', {})}
        >
            {title}
        </Button>
      </View>

    </View>
  );

  const handleContinuePress = () => {
    const changeData = {'itemID': heldItem, 'container': containerValue, 'count': theCount};
    if(heldItem && containerValue && theCount){
      EventEmitter.dispatch('inventoryChangeEvent', changeData);
      EventEmitter.unsubscribe('inventoryChangeEvent');
      Alert.alert("changeData", JSON.stringify(changeData))
      setFinish(true);
    }
    else if(!containerValue){
      Alert.alert("Missing Container Input", "Please select a container.")
    }
    else if(!theCount){
      Alert.alert("Missing Amount to Add Input", "Please select an amount to add or subtract.")
    }
  


  }

  const onCountChange = (value) => {
    setCounter(value);
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleSection}>
        <Text>{heldItem}</Text>
        <Text style={styles.title}>Product Name</Text>
        <Text>Container To Add Item To</Text>
        {containerOptions && <DropDownPicker
          open={containerFieldState}
          value={containerValue}
          items={containerOptions}
          setOpen={setContainerFieldState} //State callback that is called when the user presses the picker.
          setValue={setContainerValue} //State callback that is called when the value changes.
          setItems={setContainerOptions} //State callback that is called to modify or add new items.
        />}
      </View>
      <View style={styles.scrollPicker}>
        <Text>Amount to Add</Text>
        <TextInput onChangeText={setCounter} style={styles.inputBox} value={theCount} inputMode={"numeric"}></TextInput>
      </View>
      {finish == true && <ContinuePrompt></ContinuePrompt>}
      <View style={styles.buttons}>
        <Button title="Continue" onPress={handleContinuePress}></Button>
      </View>
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
  },
  titleSection: {
    flex: 1,

  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  inputBox: {
    borderWidth: 2,
    minWidth: 100,

  },
  scrollPicker: {
    flex: 3,
  },
  scrollPickerItem: {
  },
  buttons: {
    flex: 1,
    margin: 5,
  },
  modal: {
    zIndex: 2,
    position: 'absolute',
    backgroundColor: '#e3e3e3',
    borderColor: 'black',
    borderWidth: 3,
    padding: 75,
    alignContent: 'center',
    alignItems: 'center',
    bottom: 0,
    
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 5,
  }

});

export default CounterView;