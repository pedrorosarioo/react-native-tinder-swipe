import React from 'react';
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
  disableSwipe?: boolean;
  onSwipeLeft?: (card: CardInfo) => void;
  onSwipeRight?: (card: CardInfo) => void;
  onNotSwipe?: (card: CardInfo) => void;
  onSwipeHasDone?: (card: CardInfo) => void;
}

type CardRef = Card | null;

class TinderSwipe extends React.Component<IProps, any> {
  public state = {
    pushedCards: [] as any,
    currentIndex: this.props.data.length-1,
    pushedCardsSwipped: 0
  };

  public shouldComponentUpdate(nextProps: IProps, nextState: any) {
    return this.state.pushedCards !== nextState.pushedCards;
  }

  private _propCardRefs: CardRef[] = [];
  private _pushedCardRefs: CardRef[] = [];


  // UPDATE CURRENT INDEX AND CALL APPROPRIATED SWIPE EVENT
  private _onSwipe = (card: CardInfo, liked?: boolean) => {

    const { onSwipeLeft, onSwipeRight, data } = this.props;
    const { currentIndex, pushedCardsSwipped } = this.state;
    const event = liked && onSwipeRight || onSwipeLeft;
    const isUsingPushedCards = currentIndex < 0;

    this.setState({ currentIndex: currentIndex-1, pushedCardsSwipped: isUsingPushedCards && pushedCardsSwipped + 1 || 0 });
    if (isUsingPushedCards) {
      this._pushedCardRefs.pop();
    }
    
    if (event) {
      return event(card);
    }

  }

  private _onSwipeHasDone = (card: CardInfo) => {
    const { onSwipeHasDone } = this.props;

    if (onSwipeHasDone) {
      onSwipeHasDone(card);
    }

  }

  // SWIPE LEFT OR RIGHT THE CURRENT CARD
  public pop = (liked?: boolean) => {
    const { disableSwipe } = this.props;
    const { currentIndex } = this.state;
    const propCard = this._propCardRefs[currentIndex];
    const pushedCard = this._pushedCardRefs[0];
    const card = propCard || pushedCard;
    if (!card) {
      return null;
    }
    const swipe = liked && card.swipeRight || card.swipeLeft;
    
    return !disableSwipe && swipe();
    
    
  }

  public push = (cards: CardInfo[]) => {
    this.setState((state: any) => ({ pushedCards: [... state.pushedCards.slice(state.pushedCardsSwipped-1), ...cards], pushedCardsSwipped: 0 } ));
  }

  private isLocked = (index: number, pushed: boolean) => {
    const { disableSwipe } = this.props;
    const { currentIndex } = this.state;

    if (disableSwipe) {
      return true;
    }

    if ( currentIndex > 0 ) {
      return index === currentIndex;
    }

    return pushed && index !== 0;
  }

  private _renderCard = (item: CardInfo, index: number, pushed?: boolean) => {
    return (
      <Card
        ref={(ref) => pushed? this._pushedCardRefs.unshift(ref) : this._propCardRefs.push(ref)}
        key={`card-${index}`}
        name={item.name}
        age={item.age}
        index={index}
        profileImage={item.profileImage}
        custom={item.custom}
        blockRotateZ={this.props.blockZ!}
        blockTranslateX={this.props.blockX!}
        blockTranslateY={this.props.blockY!}
        movesLocked={this.props.disableSwipe!}
        onSwipeLeft={(card: CardInfo) => this._onSwipe(card, false)}
        onSwipeRight={(card: CardInfo) => this._onSwipe(card, true)}
        onSwipeHasDone={(card: CardInfo) => this._onSwipeHasDone(card)}
      />
    );

  }

  public render() {
    return (
      <>
      <CardsContainer>
        {this.state.pushedCards.map((item: any, index: any) => this._renderCard(item, index, true))}
        {this.props.data.map((item, index) => this._renderCard(item, index))}
      </CardsContainer>  
      </>
    );
  }
  
}

export default TinderSwipe;
