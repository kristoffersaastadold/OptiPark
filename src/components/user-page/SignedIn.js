import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {getUserInfo} from '../../actions/users';
import {signOutUser} from '../../actions/login';

class SignedIn extends Component{

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
            <>
                <div className="signItem" onClick={this.logout}>Logout</div>
                <div className="signItem">{this.props.userInfo.username}</div>
            </>
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
    return bindActionCreators({getUserInfo, signOutUser}, dispatch);
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(SignedIn);