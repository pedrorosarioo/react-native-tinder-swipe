import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';

import TinderSwipe from './src';
import mock from './src/assets/mock';

interface Props {}
export default class App extends Component<Props> {
  public render() {
    return (
      <View style={styles.container}>
        <TinderSwipe data={mock} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});