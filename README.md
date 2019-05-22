<h1 align="center">
  <a href="https://github.com/pedrorosarioo/react-native-tinder-swipe">
    React Native Tinder Swipe
  </a>
</h1>

<p align="center">
  <strong>Swipe cards simulating Tinder interface</strong><br>
  The goal of `react-native-tinder-swipe` is that you also can set custom components to be rendered as card's content.
</p>
<br/>
<p align="center">
<img src="/.github/images/sample-1.gif" height="500" />
</p>
<br/>

## Features

- Smooth enter/exit animations
- Set or hide custom positive/negative labels
- Tracking of swipe left, swipe right and not swipe events
- Allow to block X or Y translations
- Allows set custom components as card content and labels
- Swipeable

## Setup

This library is not available on npm or yarn yet, it isn't even done, test it with the following steps:

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
| data                    | <a href="#card-info-type">CardInfo</a>[] | []              | Payload that TinderSwipe expects. If it has custom attribute, so it will render your custom component even if it have the default attributes                                                                                                                      |
| onSwipeLeft             | (<a href="#card-info-type">CardInfo</a>) => void           | ---                       | Event that is fired when user swipes to left a card                                                                                                |
| onSwipeRight             | (<a href="#card-info-type">CardInfo</a>) => void           | ---                       | Event that is fired when user swipes to right a card                                                                                                |
| onNotSwipe             | (<a href="#card-info-type">CardInfo</a>) => void           | ---                       | Event that is fired when user return a card for it's default position                                                                                                |
| BlockTranslateX                  | bool             | false                     | <strong>NOT IMPLEMENTED YET</strong> Block moves that translate the card horizontaly                                                                                                  |
| BlockTranslateY                  | bool             | false                     | <strong>NOT IMPLEMENTED YET</strong> Block moves that translate the card vertically                                                                                                  |


## Acknowledgements

Thanks for the visit!

Pull requests, feedbacks and suggestions are welcome!

## License

[MIT License](http://opensource.org/licenses/mit-license.html). © Pedro Rosário
