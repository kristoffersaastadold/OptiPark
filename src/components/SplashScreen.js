import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, Image, Platform, StatusBar } from 'react-native';
import { Dimensions } from "react-native";


var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full heigh
export class SplashScreen extends Component {




    constructor(props) {
        super(props);
    }
    t
    componentWillMount() {
        const { navigate } = this.props.navigation;
        console.log("mounting")
        setTimeout(() => {
            console.log("navigating")
            navigate('WelcomeScreen')
            console.log("navigating")
        }, 1000);

    }


    render() {

        return (
            <View style={{
                paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight,
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Text style={styles.text}>OPTIPARK</Text>
                <Image
                    style={styles.stretch}
                    source={{ uri: 'https://www.smartparking.com/media/1427/spjan15-87.jpg' }}
                />
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

    }
});

export default SplashScreen;