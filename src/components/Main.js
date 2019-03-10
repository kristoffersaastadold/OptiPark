import React,{Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { StyleSheet, View, Text, Button} from 'react-native';

import {fetchUser, signOutUser} from '../actions/login'
import MapComponent from './MapComponent.js';

class Main extends Component{

    componentWillMount(){
        this.props.fetchUser();
    }

    logout = () => {
        this.props.signOutUser(this.props.navigation);  
    }

    componentDidUpdate(prevProps, prevState){
        if (prevState.loading!=this.state.loading) {
            setTimeout(() => {
                navigate
            }, 1000);
        }
    }

    render(){
        if(this.props.userInfo){
            if(this.props.userInfo.isParked){
                this.setState({
                    loading:true,
                })
            }
        }
        return(
                this.props.login?
                <View style={styles.wrapper}>
                    <MapComponent/>
                    <Text>Logged in</Text>
                    <View style={styles.logoutBtn}>
                        <Button onPress={this.logout} title="Log out"/> 
                    </View>
                </View>             
                :<Text>Logged out</Text>
            
        );
    }
}

const styles = StyleSheet.create({
    wrapper:{
        ...StyleSheet.absoluteFill,
        top:'3.5%',
        backgroundColor:'transparent'
    },
    logoutBtn:{
        position:'absolute',
        top:'90%',
        left:'1%',
    }
})


const mapStateToProps = (reducer) => {
    
    const {login, userInfo} = reducer.database;
    const {selected} = reducer.global;
    return{
        login:login,
        userInfo:userInfo,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({fetchUser, signOutUser}, dispatch);
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Main);