import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, Button, ActivityIndicator } from 'react-native';
import { Input } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

import { getGeo } from "../actions/geo";
import { signInUser } from '../actions/login';
import { fetchUser } from '../actions/login';

class LoginScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
        }
    }

    componentWillMount() {
        this.props.getGeo();
        console.log("WILL MOUNT")
        this.props.signInUser("opti@park.com", "optipark", this.props.navigation);
        
        // only if successfull
    }

    componentDidMount() {
        
        
    }

    componentDidUpdate() {
        
    }

    printProp = () => {
        navigate
    }

    handleEmail = (e) => {
        this.setState({
            email: e.nativeEvent.text,
        })
    }

    handlePassword = (e) => {
        this.setState({
            password: e.nativeEvent.text,
        })
    }

    signIn = () => {
        this.props.signInUser(this.state.email, this.state.password, this.props.navigation)
        this.props.navigation.navigate('Home');
        this.setState({
            email: "",
            password: ""
        })
    }
    goToHome = () => {
        this.props.navigation.navigate('Home');
    }


    render() {

        return (
            <View style={{ paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
                <Text>Login</Text>
                <Input
                    placeholder="email"
                    onChange={this.handleEmail}
                    autoCapitalize='none'
                    value={this.state.email}
                    leftIcon={
                        <Icon
                            name='user'
                            size={24}
                            color='black'
                        />
                    }

                />
                <Input
                    placeholder="password"
                    onChange={this.handlePassword}
                    secureTextEntry={true}
                    autoCapitalize='none'
                    value={this.state.password}
                    leftIcon={
                        <Icon
                            name='lock'
                            size={24}
                            color='black'
                        />
                    }
                />
                <Button onPress={this.signIn} title="Login" />
                <Button onPress={this.goToHome} title="goToHome" />
                {this.props.isLoading ? <ActivityIndicator  size="large" color="000000" /> : <Text>Done loading</Text>}
            </View>
        );
    }


}

const mapStateToProps = (reducer) => {

    const { login, userInfo, isLoading } = reducer.database;
    const { selected } = reducer.global;
    return {
        login: login,
        userInfo: userInfo,
        isLoading: isLoading,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getGeo, signInUser, fetchUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);





//Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});