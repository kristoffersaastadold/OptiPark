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
            email:"",
            password:"",
        }
    }

    componentWillMount(){
        this.props.getGeo();
    }

    printProp = () => {
        console.log("test");
        
        console.log(this.props);
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
        this.props.signInUser(this.state.email,this.state.password)
        this.setState({
            email:"",
            password:""
        })
    }

    render(){        
        return(
            <>
            <Button onPress={this.printProp} title="props"/>
            <Text>{this.props.login?"in":"out"}</Text>
            <Text>Test</Text>
            <Input 
                placeholder="email" 
                onChange={this.handleEmail}
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
                leftIcon={
                    <Icon
                      name='lock'
                      size={24}
                      color='black'
                    />
                }
            />
            <Button
                onPress={this.signIn}
                title="PressMe"
                accessibilityLabel="Press this"
            />
            {this.props.userInfo!=null&&this.props.login?                
                Object.keys(this.props.userInfo.cars).map((item)=>
                    <Text>{this.props.userInfo.cars[item].type}</Text>
                )
                :
                null}
            </>
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