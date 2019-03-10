import React,{Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { StyleSheet, View, Text, Button} from 'react-native';
import { Input } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

import { getGeo } from "../actions/geo";
import { signInUser } from '../actions/login';

class DefaultContainer extends Component{
    constructor(props){
        super(props);

        this.state={
            email:"optipark@test.com",
            password:"optipark",
        }
    }
    
    componentWillMount(){
        this.props.getGeo("Library");
    }
    componentDidMount(){
        this.props.signInUser(this.state.email,this.state.password,this.props.navigation);
    }

    handleEmail = (e) =>{
        this.setState({
            email:e.nativeEvent.text,
        })
    }

    handlePassword = (e) =>{
        this.setState({
            password:e.nativeEvent.text,
        })
    }

    signIn = () => {        
        this.props.signInUser(this.state.email,this.state.password,this.props.navigation);
    }

    render(){        
        
        return(
            <View style={styles.wrapper}>
                <Input 
                    placeholder="email" 
                    onChange={this.handleEmail}
                    autoCapitalize = 'none'
                    value = {this.state.email}
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
                    autoCapitalize = 'none'
                    value = {this.state.password}
                    leftIcon={
                        <Icon
                        name='lock'
                        size={24}
                        color='black'
                        />
                    }
                />
                <Button onPress={this.signIn} title="Login"/>
            </View>
        );
    }


}

const mapStateToProps = (reducer) => {
    
    const {login, userInfo} = reducer.database;
    const {selected} = reducer.global;
    return{
        login:login,
        userInfo:userInfo,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({getGeo, signInUser}, dispatch);
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(DefaultContainer);





//Styles
const styles = StyleSheet.create({
    wrapper:{
        ...StyleSheet.absoluteFill,
        top:'3.5%',
        backgroundColor:'transparent'
    }
  });