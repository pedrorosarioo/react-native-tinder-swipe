import React from 'react';
import styled from 'styled-components/native';
import { Alert } from 'react-native';
const profileImage = require('./image1.jpg');

const Main = styled.View`
    height: 100%;
    width: 100%;
    background-color: #ddd;
    align-items: center;
    justify-content: center;
`
const Positive = styled.View`
    height: 40;
    width: 40;
    border-radius: 20;
    background-color: pink;
`

const Negative = styled(Positive)`
    background-color: blue;
`;

const Label = styled.Text`
    fontSize: 18;
    color: #D92;
    text-align: center;
`

const Button = styled.TouchableOpacity`
    background-color: #fff;
    border: 1px solid #f5f5f5;
    padding: 20px;
`;

const MainComponent = () => (
    <Main>
        <Button onPress={() => Alert.alert('All custom component functionalities still works')}>
            <Label>Press it!{'\n'}This is a customized card</Label>
        </Button>
    </Main>
)

const cardsPayload = [
    {   
        profileImage,
        name: 'Kashyra W.',
        age: 25
    },
    {   
        profileImage,
        name: 'Kashyra W.',
        age: 25,
        custom: {
            mainComponent: () => <MainComponent />,
            positiveLabelComponent: () => <Positive />,
            negativeLabelComponent: () => <Negative />,
        }
    },
    {   
        profileImage,
        name: 'Kashyra W.',
        age: 25

    },
    {   
        profileImage,
        name: 'Kashyra W.',
        age: 25,
        custom: {
            mainComponent: () => <MainComponent />,
            positiveLabelComponent: () => <Positive />,
            negativeLabelComponent: () => <Negative />,
        }
    },
    {   
        profileImage,
        name: 'Kashyra W.',
        age: 25
    },
    {   
        profileImage,
        name: 'Kashyra W.',
        age: 25,
        custom: {
            mainComponent: () => <MainComponent />,
            positiveLabelComponent: () => <Positive />,
            negativeLabelComponent: () => <Negative />,
        }
    },
    {   
        profileImage,
        name: 'Kashyra W.',
        age: 25
    },
    {   
        profileImage,
        name: 'Kashyra W.',
        age: 25,
        custom: {
            mainComponent: () => <MainComponent />,
            positiveLabelComponent: () => <Positive />,
            negativeLabelComponent: () => <Negative />,
        }
    },
    {   
        profileImage,
        name: 'Kashyra W.',
        age: 25
    },
    {   
        profileImage,
        name: 'Kashyra W.',
        age: 25,
        custom: {
            mainComponent: () => <MainComponent />,
            positiveLabelComponent: () => <Positive />,
            negativeLabelComponent: () => <Negative />,
        }
    },
    {   
        profileImage,
        name: 'Kashyra W.',
        age: 25
    },
    {   
        profileImage,
        name: 'Kashyra W.',
        age: 25,
        custom: {
            mainComponent: () => <MainComponent />,
            positiveLabelComponent: () => <Positive />,
            negativeLabelComponent: () => <Negative />,
        }
    },
    {   
        profileImage,
        name: 'Kashyra W.',
        age: 25
    },
    {   
        profileImage,
        name: 'Kashyra W.',
        age: 25,
        custom: {
            mainComponent: () => <MainComponent />,
            positiveLabelComponent: () => <Positive />,
            negativeLabelComponent: () => <Negative />,
        }
    },
    {   
        profileImage,
        name: 'Kashyra W.',
        age: 25
    },
    {   
        profileImage,
        name: 'Kashyra W.',
        age: 25,
        custom: {
            mainComponent: () => <MainComponent />,
            positiveLabelComponent: () => <Positive />,
            negativeLabelComponent: () => <Negative />,
        }
    },
]

export default cardsPayload;