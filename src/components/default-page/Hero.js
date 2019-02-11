import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';


class Hero extends React.Component{
    constructor(props){
        super(props)

        this.state = {

        }
    }

    render(){
        return(
            <div>
                <div className="hero"></div>
                <div className="hero-text">
                    <div className="text">Sed amet aliquyam et et ipsum. Tempor stet stet consetetur diam voluptua takimata invidunt lorem sanctus, clita ipsum et magna.</div>
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
    return bindActionCreators({}, dispatch);
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Hero);
  

