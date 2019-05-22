<h1 align="center">
  <a href="https://github.com/pedrorosarioo/react-native-tinder-swipe">
    React Native Tinder Swipe
  </a>
</h1>

<p align="center">
  <strong>Swipe cards simulating Tinder interface</strong><br>
  The goal of `react-native-tinder-swipe` is that you also can set custom components to be rendered as card's content.
</p>

<p align="center">
<img src="/.github/images/sample-1.gif" height="500" />
</p>

## Features

- Smooth enter/exit animations
- Set or hide custom positive/negative labels
- Tracking of swipe left, swipe right and not swipe events
- Allow to block X or Y translations
- Allows set custom components as card content and labels
- Swipeable

## Setup

This library is not available on npm or yarn yet, isn't even done, test it with the following steps:

### Step 1: Installing the project

Clone the repository:

```
git clone https://github.com/pedrorosarioo/react-native-tinder-swipe.git
```

Move to repository folder and run:

```
npm install
```

or

```
yarn install
```

### Step 2: Running the project

First you're gonna have to open your virtual device or connect your phone on the computer. Then go back to the terminal, open the project's folder and run:

Case iOS device: `react-native run-ios`
Case Android device:  `react-native run-android`


## Usage


## A complete example

The following example consists in the App.tsx component, wich renders only the TinderSwipe component.
The TinderSwipe component, until now, have just one property: data. It's a payload used for it renders the cards.

```javascript
import React, {Component} from 'react';
import { StyleSheet,View } from 'react-native';

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
```

The property data expects an array of <a href="#card-info-type" id="card-info-type">CardInfo</a> type:

```javascript
export interface CardInfo {
    name: string;
    profileImage: ImageSourcePropType;
    age: number;
    custom?: {
        mainComponent: () => React.ReactNode;
        positiveLabelComponent: () => React.ReactNode;
        negativeLabelComponent: () => React.ReactNode;
    };
}
```

## Available props

| Name                           | Type             | Default                   | Description                                                                                                                                |
| ------------------------------ | ---------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| data                    | <a href="#card-info-type">CardInfo</a> | []              | Payload that TinderSwipe expects. If it has custom attribute, so it will render your custom component even if it have the default attributes                                                                                                                      |
| onSwipeLeft             | (<a href="#card-info-type">CardInfo</a>) => void           | ---                       | Event that is fired when user swipes to left a card                                                                                                |
| onSwipeRight             | (<a href="#card-info-type">CardInfo</a>) => void           | ---                       | Event that is fired when user swipes to right a card                                                                                                |
| onNotSwipe             | (<a href="#card-info-type">CardInfo</a>) => void           | ---                       | Event that is fired when user return a card for it's default position                                                                                                |
| BlockTranslateX                  | bool             | false                     | <strong>NOT IMPLEMENTED YET</strong> Block moves that translate the card horizontaly                                                                                                  |
| BlockTranslateY                  | bool             | false                     | <strong>NOT IMPLEMENTED YET</strong> Block moves that translate the card vertically                                                                                                  |


## Frequently Asked Questions

### The component is not working as expected

Under the hood `react-native-modal` uses react-native original [Modal component](https://facebook.github.io/react-native/docs/modal.html).  
Before reporting a bug, try swapping `react-native-modal` with react-native original Modal component and, if the issue persists, check if it has already been reported as a [react-native issue](https://github.com/facebook/react-native/issues).

### The backdrop is not completely filled/covered on some Android devices (Galaxy, for one)

React-Native has a few issues detecting the correct device width/height of some devices.  
If you're experiencing this issue, you'll need to install [`react-native-extra-dimensions-android`](https://github.com/Sunhat/react-native-extra-dimensions-android).  
Then, provide the real window height (obtained from `react-native-extra-dimensions-android`) to the modal:

```javascript
render() {
  const deviceWidth = Dimensions.get("window").width;
  const deviceHeight = Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get("REAL_WINDOW_HEIGHT");

  return (
  <Modal
    isVisible={this.state.isVisible}
    deviceWidth={deviceWidth}
    deviceHeight={deviceHeight}
  >
    <View style={{ flex: 1 }}>
      <Text>I am the modal content!</Text>
    </View>
  </Modal>
  )
}
```

### How can I hide the modal by pressing outside of its content?

The prop `onBackdropPress` allows you to handle this situation:

```javascript
<Modal
  isVisible={this.state.isVisible}
  onBackdropPress={() => this.setState({ isVisible: false })}
>
  <View style={{ flex: 1 }}>
    <Text>I am the modal content!</Text>
  </View>
</Modal>
```

### How can I hide the modal by swiping it?

The prop `onSwipeComplete` allows you to handle this situation (remember to set `swipeDirection` too!):

```javascript
<Modal
  isVisible={this.state.isVisible}
  onSwipeComplete={() => this.setState({ isVisible: false })}
  swipeDirection="left"
>
  <View style={{ flex: 1 }}>
    <Text>I am the modal content!</Text>
  </View>
</Modal>
```

Note that when using `useNativeDriver={true}` the modal won't drag correctly. This is a [known issue](https://github.com/react-native-community/react-native-modal/issues/163#issuecomment-409760695).

### The modal flashes in a weird way when animating

Unfortunately this is a [know issue](https://github.com/react-native-community/react-native-modal/issues/92) that happens when `useNativeDriver=true` and must still be solved.  
In the meanwhile as a workaround you can set the `hideModalContentWhileAnimating` prop to `true`: this seems to solve the issue.
Also, do not assign a `backgroundColor` property directly to the Modal. Prefer to set it on the child container.

### The modal background doesn't animate properly

Are you sure you named the `isVisible` prop correctly? Make sure it is spelled correctly: `isVisible`, not `visible`.

### The modal doesn't change orientation

Add a `supportedOrientations={['portrait', 'landscape']}` prop to the component, as described [in the React Native documentation](https://facebook.github.io/react-native/docs/modal.html#supportedorientations).

Also, if you're providing the `deviceHeight` and `deviceWidth` props you'll have to manually update them when the layout changes.

## Acknowledgements

Thanks for the visit!

Pull requests, feedbacks and suggestions are welcome!
