import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, Button } from 'react-native';
import { Input } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

import { getGeo } from "../actions/geo";
import { createUser } from '../actions/login';
import { fetchUser } from '../actions/login';

class RegisterScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
        }
    }

    componentWillMount() {

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

    createUser = () => {
        this.props.createUser(this.state.email, this.state.password, this.props.navigation)
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
                <Text>Register</Text>
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
                <Button onPress={this.createUser} title="Create user" />
                <Button onPress={this.goToHome} title="goToHome" />
                {this.props.isLoadingRegister ? <Text>Creating user...</Text> : <Text></Text>}
            </View>
        );
    }


}

const mapStateToProps = (reducer) => {
    const { isLoadingRegister } = reducer.database;
    return {
        isLoadingRegister: isLoadingRegister,
    }

}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ createUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);





//Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});