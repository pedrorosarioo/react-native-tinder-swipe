import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

import TinderSwipe from './src';
import mock from './src/assets/mock';

interface Props {}
export default class App extends Component<Props, any> {

  public state = { 
    index: 0
  };

  private _onPush = () => {
    this.setState({index: this.state.index+1});

    if (this.state.index < 40)
    this._tinderSwipe!.push([{ name: `PUSHED CARD ${this.state.index}`, age: 25, profileImage: require('./src/assets/image1.jpg')}, { name: `PUSHED CARD ${this.state.index}`, age: 25, profileImage: require('./src/assets/image1.jpg')}]);
    
  }
  private _tinderSwipe: TinderSwipe | null = null;
  private _data = mock.slice();

  public render() {
    return (
      <View style={styles.container}>
        <TinderSwipe
          ref={(ref) => this._tinderSwipe = ref}
          data={this._data}
          onSwipeLeft={() =>  this._onPush()} 
          blockY
        />
        <TouchableOpacity onPress={() => this._tinderSwipe!.pop()}>
          <Text>SWIPE LEFT</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this._tinderSwipe!.pop(true)}>
          <Text>SWIPE RIGHT</Text>
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
