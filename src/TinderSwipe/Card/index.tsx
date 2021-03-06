import React from 'react';
import {
  AfirmativeLabel,
  AfirmativeLabelContainer,
  NegativeLabel,
  NegativeLabelContainer,
  Container,
  Label,
  ProfileImage,
} from './Card';
import { Dimensions, Animated, PanResponder, PanResponderInstance, ImageSourcePropType } from 'react-native';

const { width } = Dimensions.get('window');

export interface CardInfo {
  name?: string;
  profileImage?: ImageSourcePropType;
  age?: number;
  custom?: {
    mainComponent: () => React.ReactNode;
    positiveLabelComponent: () => React.ReactNode;
    negativeLabelComponent: () => React.ReactNode;
  };
}

interface IProps extends CardInfo {
  blockTranslateX?: boolean;
  blockTranslateY?: boolean;
  blockRotateZ?: boolean;
  movesLocked?: boolean;
  index: number;
  pushed?: boolean;
  onSwipeLeft?: (item: CardInfo) => void;
  onSwipeRight?: (item: CardInfo) => void;
  onNotSwipe?: (item: CardInfo) => void;
  onSwipeHasDone?: (item: CardInfo) => void;
}

class CardComponent extends React.PureComponent<IProps, any> {
  public state = {
    cardPosition: new Animated.ValueXY({ x: 0, y: 0 }),
    display: 'flex',
  };

  private _offsets = { x: 0, y: 0 };

  public swipeLeft = () => {
    const { age, custom, name, profileImage, onSwipeLeft, onSwipeHasDone } = this.props;
    const {
      cardPosition: { x },
    } = this.state;
    Animated.timing(x, {
      toValue: -1.5 * width,
      duration: 400,
    }).start(() => {
      this.setState({ display: 'none' });
      return onSwipeHasDone && onSwipeHasDone({ age, custom, name, profileImage });
    });
    return onSwipeLeft && onSwipeLeft({ age, custom, name, profileImage });
  };

  public swipeRight = () => {
    const { age, custom, name, profileImage, onSwipeRight, onSwipeHasDone } = this.props;
    const {
      cardPosition: { x },
    } = this.state;
    Animated.timing(x, {
      toValue: 1.5 * width,
      duration: 400,
    }).start(() => {
      this.setState({ display: 'none' });
      return onSwipeHasDone && onSwipeHasDone({ age, custom, name, profileImage });
    });
    return onSwipeRight && onSwipeRight({ age, custom, name, profileImage });
  };

  private _getMoveValue = (liked: boolean, denied: boolean) => {
    return (liked && 1.5 * width) || (denied && -1.5 * width) || 0;
  };

  private _getOnMoveEvent = (liked: boolean, denied: boolean) => {
    return (liked && this.props.onSwipeRight) || (denied && this.props.onSwipeLeft) || this.props.onNotSwipe;
  };

  private _panResponder: PanResponderInstance | null = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      const { dx, dy } = gestureState;
      return dx > 3 || dx < -3 || dy > 3 || dy < -3;
    },

    onPanResponderMove: Animated.event([
      null,
      {
        dx: this.state.cardPosition.x,
        dy: this.state.cardPosition.y,
      },
    ]),

    onPanResponderRelease: (e, gestureState) => {
      const { age, custom, name, profileImage, onSwipeHasDone } = this.props;
      const { cardPosition } = this.state;

      this._offsets.x += gestureState.dx;
      this._offsets.y += gestureState.dy;

      const liked = this._offsets.x > width / 4;
      const denied = this._offsets.x < -width / 4;
      const hasSwiped = liked || denied;
      const moveValue = this._getMoveValue(liked, denied);
      const event = this._getOnMoveEvent(liked, denied);

      cardPosition.flattenOffset();

      cardPosition.setOffset({
        x: this._offsets.x,
        y: this._offsets.y,
      });

      cardPosition.setValue({
        x: 0,
        y: 0,
      });

      if (!hasSwiped) {
        cardPosition.setValue({
          x: this._offsets.x,
          y: this._offsets.y,
        });
        cardPosition.setOffset({
          x: 0,
          y: 0,
        });
      }

      Animated.timing(cardPosition.x, {
        toValue: moveValue,
        duration: 200,
      }).start(() => {
        this._offsets.x = moveValue;

        cardPosition.setOffset({
          x: this._offsets.x,
          y: this._offsets.y,
        });

        !hasSwiped &&
          cardPosition.setValue({
            x: 0,
            y: 0,
          });

        event &&
          event({
            age,
            custom,
            name,
            profileImage,
          });
        if (hasSwiped) {
          this.setState({ display: 'none' });
          onSwipeHasDone && onSwipeHasDone({ age, custom, name, profileImage });
        }
      });
    },
  });

  public render() {
    const {
      cardPosition: { x, y },
    } = this.state;
    const { custom, name, profileImage, blockTranslateX, blockTranslateY, blockRotateZ, movesLocked } = this.props;

    const rotateZ = x.interpolate({
      inputRange: [-width / 2, width / 2],
      outputRange: [15 + 'deg', -15 + 'deg'],
    });

    const likeOpacity = x.interpolate({
      inputRange: [0, width / 4],
      outputRange: [0, 1],
    });

    const nopeOpacity = x.interpolate({
      inputRange: [-width / 4, 0],
      outputRange: [1, 0],
    });

    return (
      <Container
        panResponder={!movesLocked && this._panResponder}
        zIndex={this.props.index}
        hasCustom={custom && custom.mainComponent}
        style={{
          transform: [
            { translateX: blockTranslateX ? 0 : x },
            { translateY: blockTranslateY ? 0 : y },
            { rotate: blockRotateZ ? '0deg' : rotateZ },
          ],
          display: this.state.display,
        }}>
        {(custom && custom.mainComponent && custom.mainComponent()) || <ProfileImage source={profileImage!} />}
        <AfirmativeLabelContainer style={{ opacity: likeOpacity }}>
          {(custom && custom.positiveLabelComponent && custom.positiveLabelComponent()) || (
            <AfirmativeLabel>LIKE</AfirmativeLabel>
          )}
        </AfirmativeLabelContainer>
        <NegativeLabelContainer style={{ opacity: nopeOpacity }}>
          {(custom && custom.negativeLabelComponent && custom.negativeLabelComponent()) || (
            <NegativeLabel>NOPE</NegativeLabel>
          )}
        </NegativeLabelContainer>
        {!custom && <Label>{name || ''}</Label>}
      </Container>
    );
  }
}

export default CardComponent;
