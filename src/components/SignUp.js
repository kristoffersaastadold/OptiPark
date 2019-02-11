import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Modal, Form, Button} from 'react-bootstrap';

import {createUser} from '../actions/login';

class SignUp extends Component{

    constructor(props){
        super(props);

        this.state = {
            email:"",
            password:"",
            passwordVeri:"",
            show:false,
        }
    }

    show = () =>{
        this.setState({
            show:!this.state.show
        })
    }

    handleChange = (e) =>{
        this.setState({
            [e.target.id]:e.target.value,
        })
    }

    signUp = (e) => {
        console.log(e);
        e.preventDefault();
        if (this.state.password===this.state.passwordVeri) {
            this.props.createUser(this.state.email,this.state.password);
            this.setState({
                email:"",password:"",show:false,
            })    
        }else{
            alert("Passwords does not match!")
        }
        
    }

    render(){
        return(
            <>
            <div className="signItem" onClick={this.show}>SignUp</div>
            <Modal show={this.state.show} onHide={this.show}>
                <Modal.Header closeButton>
                    <Modal.Title>Sign Up</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form onSubmit={this.signUp}>
                    <Form.Group controlId="email">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control onChange={this.handleChange} type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control onChange={this.handleChange} type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group controlId="passwordVeri">
                        <Form.Label>Password</Form.Label>
                        <Form.Control onChange={this.handleChange} type="password" placeholder="Repeat password" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                </Modal.Body>
            </Modal>
                
                
                
            </>
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
    return bindActionCreators({ createUser}, dispatch);
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(SignUp);