import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

import TinderSwipe from './src';
import mock from './src/assets/mock';

interface Props {}
export default class App extends Component<Props> {

  private _tinderSwipe: TinderSwipe | null = null;

  public render() {
    return (
      <View style={styles.container}>
        <TinderSwipe ref={(ref) => this._tinderSwipe = ref} data={mock} />
        <TouchableOpacity onPress={() => this._tinderSwipe!.pop(true)}>
        <Text>SWIPE</Text>
      </TouchableOpacity>  
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});
