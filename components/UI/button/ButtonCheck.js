import React from 'react';
import { Button } from 'react-native';

export default function ButtonCkeck (props) {

    return (
        
        <Button
            onPress = {() => props.check()}
            title = {props.name}
            color = {props.state ? "#3498db" : "#cfd1d0"}
            disabled = {!props.state}
        />

    )
}