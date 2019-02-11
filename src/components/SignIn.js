import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Modal, Form, Button} from 'react-bootstrap';

import {signInUser} from '../actions/login';

class SignIn extends Component{

    constructor(props){
        super(props);

        this.state = {
            email:"",
            password:"",
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

    signIn = (e) => {
        
        e.preventDefault();
        this.props.signInUser(this.state.email,this.state.password);
        this.setState({
            email:"",password:"",show:false,
        })
    }

    render(){
        return(
            <>
            <div className="signItem" onClick={this.show}>SignIn</div>
            <Modal show={this.state.show} onHide={this.show} >
                <Modal.Header closeButton>
                    <Modal.Title>Sign In</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form onSubmit={this.signIn}>
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
    return bindActionCreators({ signInUser}, dispatch);
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(SignIn);