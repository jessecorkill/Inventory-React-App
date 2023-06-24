import React, { Component } from 'react';
import {Button, StyleSheet, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const MainMenu = ({navigation}) => {



  return (
    <View style={styles.container}>
      <Button title="Add or Remove Item" onPress={() => navigation.navigate('Scanner')}></Button>
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

export default MainMenu;