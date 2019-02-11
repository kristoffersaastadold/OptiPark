import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Row, Col} from 'react-bootstrap';
import {releaseSpotFromUser} from '../../actions/booking';
import {addHistory} from '../../actions/users';

class CarTab extends Component{

    constructor(props){
        super(props);

        this.state = {
            show:false,
        }
    }

    handleChange = (e) =>{        
        this.setState({
          [e.target.id]:e.target.value,
        })
    }

    show = () =>{
        this.setState({show:!this.state.show})
    }

    removeSpot = (e) =>{
        let split = e.target.id.split(" ");        
        this.props.addHistory(this.props.userInfo.booked[split[0]]);
        this.props.releaseSpotFromUser(split[0], split[1]);
        
    }

    render(){
        return(
            <>
            {(this.props.login&&this.props.userInfo.booked!=null)?
                Object.keys(this.props.userInfo.booked).map((item,index)=>
                <div key={item}>
                    <Row><Col>{"Spot: "+this.props.userInfo.booked[item].spot}</Col></Row>
                    <Row><Col sm={9}>{"Car: "+this.props.userInfo.booked[item].car}</Col> <Col sm={1} id={item+" "+this.props.userInfo.booked[item].spot} onClick={this.removeSpot} className="deleteBook">-</Col></Row>
                    <Row><Col>{"Date: "+this.props.userInfo.booked[item].date}</Col></Row>
                <hr/>
                </div>)
                :"You have no bookings"}
                
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
    return bindActionCreators({addHistory, releaseSpotFromUser}, dispatch);
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(CarTab);