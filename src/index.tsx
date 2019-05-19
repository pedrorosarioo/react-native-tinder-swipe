import React from 'react';
import Card from './components/Card';


class TinderSwipe extends React.Component<any, any> {
    public render(){
        return (
            <Card 
                name="Kashyra W."
                profileImage={require('./assets/image1.jpg')}
                age={25}
            />
        );
    }
}

export default TinderSwipe;