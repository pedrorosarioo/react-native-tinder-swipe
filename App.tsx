

import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';

import TinderSwipe from './src';

interface Props {}
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <TinderSwipe />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});