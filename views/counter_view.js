import {React, useState} from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
import ScrollPicker from 'react-native-wheel-scrollview-picker';
import DropDownPicker from 'react-native-dropdown-picker';

const scrollWheelData = [-10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; 

const CounterView = () => {

  const [theCount, setCounter] = useState(null);
  const [theContainer, setContainer] = useState(null);
  const [containerFieldState, setContainerFieldState] = useState(false);
  const [containerValue, setContainerValue] = useState(null);


  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text>Product Name</Text>
        <DropDownPicker
          open={containerFieldState}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={e=>setContainerValue(e.targe.value)}
          setItems={setItems}
        />
      </View>
      <View style={styles.scrollPicker}>
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
  title: {
    flex: 1,
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