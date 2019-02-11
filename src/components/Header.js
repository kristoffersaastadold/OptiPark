import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';


import SignUp from './SignUp';
import SignIn from './SignIn';
import SignedIn from './user-page/SignedIn';

class Header extends Component{

    constructor(props){
        super(props);

        this.state = {
        }
    }

    logout = () => {
        this.props.signOutUser()
    }

    render(){
        return(
            <div className="header">
            <div className="logo"></div>
            {this.props.login?
                <div className="loginFields">
                    <SignedIn/>
                </div>
            :
                <div className="loginFields">
                    <SignUp/>
                    <SignIn/>
                </div>
            }
            </div>
        );
    }

}


const mapStateToProps = (reducer) => {    
    const {login, userInfo} = reducer.data;
    return {
        login:login,
        userInfo:userInfo,
      }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch);
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Header);