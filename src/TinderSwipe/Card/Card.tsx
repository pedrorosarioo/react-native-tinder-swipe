import { Animated } from 'react-native';
import styled from 'styled-components/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const Container = styled(Animated.View).attrs(props => {
  if (props.panResponder) {
    return { ...props.panResponder.panHandlers };
  }
  return null;
})`
  position: absolute;
  border-radius: ${hp(3)}px;
  ${props => (!props.hasCustom ? `height: ${hp(70)}px; width: ${wp(80)}px` : null)}
  align-items: center;
  justify-content: center;
  overflow: visible;
  align-self: center;
  z-index: ${props => props.zIndex};
`;

export const AfirmativeLabel = styled.Text`
  font-size: ${wp(5)};
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
  font-size: ${wp(7)}px;
  position: absolute;
  bottom: ${hp(3)};
  left: ${hp(3)};
`;
