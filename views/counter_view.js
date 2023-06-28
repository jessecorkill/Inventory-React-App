import {React, useState} from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
import ScrollPicker from 'react-native-wheel-scrollview-picker';
import DropDownPicker from 'react-native-dropdown-picker';

const scrollWheelData = [-10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; 

const CounterView = (props) => {

  const [theCount, setCounter] = useState(null);
  const [theContainer, setContainer] = useState(null);
  //To-Do have this populate from API data source
  const [containerOptions, setContainerOptions] = useState([
    {label: 'Truck A', value: '1'},
    {label: 'Truck B', value: '2'},
    {label: 'Warehouse A', value: '3'},
    {label: 'Warehouse B', value: '4'},
  ]);
  const [containerFieldState, setContainerFieldState] = useState(false);
  const [containerValue, setContainerValue] = useState(null);

  const setSelectedContainer = () => {

  }

  const updateContainerOptions = () => {

  }

  return (
    <View style={styles.container}>
      <View style={styles.titleSection}>
        <Text>{props.heldItem}</Text>
        <Text style={styles.title}>Product Name</Text>
        <Text>Container To Add Item To</Text>
        <DropDownPicker
          open={containerFieldState}
          value={containerValue}
          items={containerOptions}
          setOpen={setContainerFieldState} //State callback that is called when the user presses the picker.
          setValue={setContainerValue} //State callback that is called when the value changes.
          setItems={setContainerOptions} //State callback that is called to modify or add new items.
        />
      </View>
      <View style={styles.scrollPicker}>
        <Text>Ammount to Add</Text>
        <TextInput onChange={e=>setCounter(e.target.value)} style={styles.inputBox} value={theCount} inputMode={"numeric"}></TextInput>
      </View>

      <View style={styles.buttons}>
        <Button title="Add / Remove"></Button>
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
  }
});

export default CounterView;