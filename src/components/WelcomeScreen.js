import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, Image, Platform, StatusBar } from 'react-native';
import { Dimensions } from "react-native";


var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full heigh

export class WelcomeScreen extends Component {




    constructor(props) {
        super(props);
    }
    t
    componentWillMount() {

    }




    render() {
        const { navigate } = this.props.navigation;

        return (
            <View style={{
                paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight,
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Text style={styles.text}>OPTIPARK</Text>
                <Button onPress={() => navigate('LoginScreen')} title="Login" />
                <Button onPress={() => navigate('RegisterScreen')} title="Register" />
                
            </View>
        )
    }
};

const styles = StyleSheet.create({
    stretch: {
        width: width,
        height: 200
    },
    text: {
        fontSize: 40,
        paddingBottom: 70,
        fontWeight: 'bold',
        fontFamily: 'Cochin',
        textAlign: 'center'

    },
    button: {
        width: width,
        paddingTop: 10,
    }
});

export default WelcomeScreen;