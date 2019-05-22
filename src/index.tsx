import React, { useState,  useReducer } from 'react';
import { View, FlatList, ImageSourcePropType } from 'react-native';
import Card, { CardInfo } from './components/Card';
import styled from 'styled-components/native';

const CardsContainer = styled.View`
    flex: 1;
    position: relative;
    align-items: center;
    justify-content: center;
    width: 100%;
`;

const TinderSwipe = (props: {data: CardInfo[], blockY?: boolean, blockX?: boolean, blockZ?: boolean}) => { 
    return (
        <CardsContainer>
            { props.data.map((item, index) => {
                return (
                    <Card 
                        key={`card-${index}`}
                        name={item.name}
                        age={item.age}
                        profileImage={item.profileImage}
                        custom={item.custom}
                        blockRotateZ={props.blockZ!}
                        blockTranslateX={props.blockX!}
                        blockTranslateY={props.blockY!}
                    />
                );
            }) }
        </CardsContainer>
    );
};

export default TinderSwipe;