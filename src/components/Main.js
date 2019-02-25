import React,{Component} from 'react';
import { StyleSheet, View, Text, Button} from 'react-native';
export default class Main extends Component{

    render(){
        const {navigate} = this.props.navigation;
        return(
            <Button onPress={()=>navigate('Login')} title="GoBack"/>
        );
    }
}