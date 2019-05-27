import React, { useState, useReducer } from 'react';
import { View, FlatList, ImageSourcePropType, Button, TouchableOpacity, Text } from 'react-native';
import Card, { CardInfo } from './components/Card';
import styled from 'styled-components/native';

const CardsContainer = styled.View`
  flex: 1;
  position: relative;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

interface IProps {
  data: CardInfo[];
  blockY?: boolean;
  blockX?: boolean;
  blockZ?: boolean;
  onSwipeLeft?: (card: CardInfo) => void;
  onSwipeRight?: (card: CardInfo) => void;
  onNotSwipe?: (card: CardInfo) => void;
}

type CardRef = Card | null;

class TinderSwipe extends React.PureComponent<IProps, any> {
  public state = {
    currentIndex: this.props.data.length-1
  };

  private _cards: CardRef[] = [];

  private _onSwipe = (card: CardInfo, liked?: boolean) => {
    const { onSwipeLeft, onSwipeRight, data } = this.props;
    const { currentIndex } = this.state;
    const event = liked && onSwipeRight || onSwipeLeft;
    
    this.setState({ currentIndex: currentIndex-1 });

    if (event) {
      return event(card);
    }
  }

  public pop = (liked?: boolean) => {
    const { currentIndex } = this.state;
    const card = this._cards[currentIndex];
    const cardInfo = this.props.data[currentIndex];

    if (!card) {
      return null;
    }

    const swipe = liked && card.swipeRight || card.swipeLeft;
    return swipe();

  }

  public push = (info: CardInfo) => {
    const { currentIndex } = this.state;
    this.setState({ currentIndex: currentIndex + 1 });
  }

  public render() {
    return (
      <>
      <CardsContainer>
        {this.props.data.map((item, index) => {
          return (
            <Card
              ref={(ref) => this._cards[index] = ref}
              key={`card-${index}`}
              name={item.name}
              age={item.age}
              index={index}
              profileImage={item.profileImage}
              custom={item.custom}
              blockRotateZ={this.props.blockZ!}
              blockTranslateX={this.props.blockX!}
              blockTranslateY={this.props.blockY!}
              onSwipeLeft={(card: CardInfo) => this._onSwipe(card, false)}
              onSwipeRight={(card: CardInfo) => this._onSwipe(card, false)}
            />
          );
        })}
      </CardsContainer>  
      </>
    );
  }
  
};

export default TinderSwipe;
