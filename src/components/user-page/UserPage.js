import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import UserTab from './UserTab';
import MapClass from './MapClass';

class UserPage extends Component{

    constructor(props){
        super(props);

        this.state = {

        }
    }

    render(){
        return(
            <div className="userContent flex">
                <div className="tabs">
                    <UserTab/>
                </div>
                <div className="mapContainer">
                    <MapClass/>
                </div>
            </div>
        );
    }

}


const mapStateToProps = (reducer) => {    
    const {login} = reducer.data;
      return {
          login:login
      }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ }, dispatch);
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(UserPage);