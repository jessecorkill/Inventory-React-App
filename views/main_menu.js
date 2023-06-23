import React, { Component } from 'react';
import {Button, StyleSheet, View} from 'react-native';

const MainMenu = (navigation) => {



  return (
    <View style={styles.container}>
      <Button title="Add or Remove Item" onPress={() => navigation.navigate('Scanner', {container: '0'})}></Button>
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