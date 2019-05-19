import React from 'react';
import {AfirmativeLabel, AfirmativeLabelContainer, NegativeLabel, NegativeLabelContainer, Container, Label, ProfileImage} from './components';
import { Dimensions, Animated, PanResponder, PanResponderInstance } from 'react-native';


const { width } = Dimensions.get('window');


class CardComponent extends React.PureComponent<any, any> {

    public state = {
        cardPosition: new Animated.ValueXY({ x: 0, y: 0}),
    };

    private _offsets = {x: 0, y:0};

    private _getMoveValue = (liked: boolean, denied: boolean) => {
        return liked && width/2 || denied && -width/2 || 0;
    } 


    private _panResponder: PanResponderInstance = PanResponder.create({

        onMoveShouldSetPanResponder: (evt, gestureState) => true,
        
        onPanResponderMove: Animated.event([null, {
            dx: this.state.cardPosition.x,
            dy: this.state.cardPosition.y,
        }]),

        onPanResponderRelease: (e, gestureState) => {
            const { cardPosition } = this.state;

            this._offsets.x += gestureState.dx;
            this._offsets.y += gestureState.dy;

            const liked = this._offsets.x > width/4;
            const denied = this._offsets.x < -width/4;
            const hasAction = liked || denied;

            cardPosition.flattenOffset();

            cardPosition.setOffset({
                x: this._offsets.x,
                y: this._offsets.y,
            });

            cardPosition.setValue({
                x: 0,
                y: 0
            });

            if (!hasAction) {
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
                toValue: this._getMoveValue(liked, denied),
                duration: 200,
            }).start(() => {
                this._offsets.x = this._getMoveValue(liked, denied);
                cardPosition.setOffset({
                    x: this._offsets.x,
                    y: this._offsets.y
                });
                !hasAction && cardPosition.setValue({
                    x: 0,
                    y: 0,
                });
            });

        }

    });
    

    public render(){
        const { cardPosition: { x, y }} = this.state;
        
        const rotateZ = x.interpolate({
            inputRange: [-width/2, width/2],
            outputRange: [15 + "deg", -15 + "deg"],
        });

        const likeOpacity = x.interpolate({
            inputRange: [0, width/4],
            outputRange: [0, 1],
        });

        const nopeOpacity = x.interpolate({
            inputRange: [-width/4, 0],
            outputRange: [1, 0],
        });

        return (
        <Container
         {...this._panResponder.panHandlers}
         style={{transform: [{translateX: x}, {translateY: y}, {rotate: rotateZ}]}}
        >
            <ProfileImage source={this.props.profileImage}/>
            <AfirmativeLabelContainer style={{opacity: likeOpacity}}>
                <AfirmativeLabel>LIKE</AfirmativeLabel>
            </AfirmativeLabelContainer>
            <NegativeLabelContainer style={{opacity: nopeOpacity}}>
                <NegativeLabel>NOPE</NegativeLabel>
            </NegativeLabelContainer>
            <Label>{this.props.name || 'Anonymous User'}</Label>
        </Container>
        );
    }
}

export default CardComponent;