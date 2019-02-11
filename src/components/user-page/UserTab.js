import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Tabs, Tab} from 'react-bootstrap';

import {addCarToUser, getUserInfo} from '../../actions/users';

import CarTab from './CarTab'
import BookTab from './BookTab'
import HistoryTab from './HistoryTab'

class UserTab extends Component{

    constructor(props){
        super(props);

        this.state = {
            key:"booking",   
        }
    }

    componentDidMount(){
      this.props.getUserInfo();
    }

    

    addCar = () => {
        let car = {
          type:this.state.cartype,
          regnr:this.state.regnr,
        }
        this.props.addCarToUser(car);
      }

    render(){
        return(
            <>
            <b>Book spot</b>
            <Tabs id="controlled-tab-example" defaultActiveKey={this.state.key} onSelect={key => this.setState({ key })}>
              <Tab eventKey="booking" title="Book">
                <BookTab/>
              </Tab>
              <Tab eventKey="history" title="History">
                <HistoryTab/>
              </Tab>
              <Tab eventKey="cars" title="Cars">
                <CarTab/>
              </Tab>
            </Tabs>
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
    return bindActionCreators({addCarToUser,getUserInfo}, dispatch);
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(UserTab);