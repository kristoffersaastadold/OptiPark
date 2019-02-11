import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Modal, Row, Col, Button} from 'react-bootstrap';

import {addCarToUser} from '../../actions/users';

class CarTab extends Component{

    constructor(props){
        super(props);

        this.state = {
            cartype:"",
            regnr:"",
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

    addCar = () => {
        let car = {
          type:this.state.cartype,
          regnr:this.state.regnr,
        }        
        this.props.addCarToUser(car);
        this.setState({
            cartype:"",
            regnr:"",
            show:false,
        })
      }

    render(){
        return(
            <>
            {(this.props.login&&this.props.userInfo.cars!=null)?
                Object.keys(this.props.userInfo.cars).map((item,index)=>
                    <>
                    <Row><Col sm={6}><b>Car: </b> </Col><Col sm={5}><b>Reg Nr:</b> </Col></Row>
                    <Row key={index}>
                        <Col sm={6}>{this.props.userInfo.cars[item].type}</Col>
                        <Col sm={5}>{this.props.userInfo.cars[item].regnr}</Col>
                    </Row>
                    <hr/>
                    </>
                    
                )
            :"You havent added any cars"}
            <br/>
            <Button onClick={this.show}>Add</Button>
            <Modal show={this.state.show} onHide={this.show}>
                <Modal.Header closeButton>
                    <Modal.Title>Add car</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <form>
                    <input id="cartype" value={this.state.cartype} onChange={this.handleChange}></input>
                    <input id="regnr" value={this.state.regnr} onChange={this.handleChange}></input>
                </form>
                </Modal.Body>
                <Modal.Footer>
                    <button className="signin" onClick={this.addCar}>Done</button>    
                </Modal.Footer>
            </Modal>
            
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
    return bindActionCreators({ addCarToUser}, dispatch);
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(CarTab);