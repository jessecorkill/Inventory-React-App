import React, { Component } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Scanner from '../components/scanner';

const ScannerView = () => {
  return (
    <View style={styles.container}>
      <Scanner></Scanner>
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

export default ScannerView;