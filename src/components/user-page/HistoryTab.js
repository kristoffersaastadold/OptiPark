import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Row, Col} from 'react-bootstrap';

class HistoryTab extends Component{

    constructor(props){
        super(props);

        this.state = {
        }
    }

    render(){
        return(
            <>
            {(this.props.login&&this.props.userInfo.history!=null)?
                Object.keys(this.props.userInfo.history).map((item,index)=>
                <div key={item}>
                    <Row><Col>{"Spot: "+this.props.userInfo.history[item].spot}</Col></Row>
                    <Row><Col>{"Car: "+this.props.userInfo.history[item].car}</Col></Row>
                    <Row><Col>{"Date: "+this.props.userInfo.history[item].date}</Col></Row>
                <hr/>
                </div>)
                :"You have no history"}
                
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
    return bindActionCreators({}, dispatch);
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(HistoryTab);