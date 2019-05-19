import { Animated } from 'react-native';
import styled from 'styled-components/native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const Container = styled(Animated.View)`
    position: relative;
    border-radius: ${hp(3)}px;
    height: ${hp(70)}px;
    width: ${wp(80)}px;
    align-items: center;
    justify-content: center;
    overflow: hidden;
`;

export const AfirmativeLabel = styled.Text`
    fontSize: ${wp(5)};
    padding: ${wp(2)}px;
    border: ${wp(0.8)}px solid green;
    border-radius: ${hp(1)}px;
    font-weight: bold;
    color: green;
    
`;

export const AfirmativeLabelContainer = styled(Animated.View)`
    transform: rotateZ(-25deg);
    position: absolute;
    height: auto;
    width: auto;
    top: ${hp(3)};
    left: ${hp(3)};
`;


export const NegativeLabel = styled(AfirmativeLabel)`
    color: red;
    border: ${wp(0.8)}px solid red;
`;

export const NegativeLabelContainer = styled(AfirmativeLabelContainer)`
    right: ${hp(3)};
    left: auto;
    transform: rotateZ(25deg);
`;

export const ProfileImage = styled.Image`
    z-index: -1;
    height: 100%;
    width: 100%;
`;

export const Label = styled.Text`
    color: #fff;
    fontSize: ${wp(7)}px;
    position: absolute;
    bottom: ${hp(3)};
    left: ${hp(3)};
`;



