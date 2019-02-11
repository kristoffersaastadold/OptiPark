import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import Hero from './Hero';
import CarAnimation from './CarAnimation';

class DefaultPage extends Component{

    constructor(props){
        super(props);

        this.state = {

        }
    }

    render(){
        return(
            <div className="frontPage">
                <Hero/>
                <CarAnimation/>
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(DefaultPage);