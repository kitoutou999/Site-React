import React from 'react';
import { Button } from 'react-native';

export default function ButtonTick(props) {

    return (
        
        <Button
            onPress = {() => props.tick()}
            title = {props.name}
            color = "#32a873"
        />

    )
}