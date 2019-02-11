import React,{Component} from 'react';

class CarAnimation extends Component{
    constructor(props){
        super(props);

        this.state = {
            carStyle:{
                position:"absolute",
                top:"60vw",
                left:"60vw",
                background: "require('../../images/car.png') 0 0 no-repeat",
                backgroundSize: "cover",
                width:"50px",
                height:"50px",
                zIndex:"100",
            }
        }
    }

    render(){
        return(
            <>
            <div style={this.state.carStyle}></div>
            </>
        );
    }
}

export default CarAnimation;