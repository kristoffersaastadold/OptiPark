import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { Map, TileLayer, Marker, Popup} from 'react-leaflet';
import {Form, Col, Row, Button} from 'react-bootstrap';
import L from 'leaflet';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


import {getGeo} from '../../actions/geo';
import {selectSpot} from '../../actions/users'
import {bookSpotToUser, changeSpotStatus} from '../../actions/booking'

const entranceIcon = new L.Icon({
    iconUrl:require('../../images/entrance.png'),
    iconSize:[20,20],
    // iconAnchor: [22, 94],
    // popupAnchor: [-3, -76],
    // shadowUrl: 'my-icon-shadow.png',
    // shadowSize: [68, 95],
    // shadowAnchor: [22, 94]

});

const sensorIconSize = [17,17];

const sensorIconAvaliable = new L.Icon({
    iconUrl:require('../../images/sensorAvaliable.png'),
    iconSize:sensorIconSize,
    // iconAnchor: [22, 94],
    // popupAnchor: [-3, -76],
    // shadowUrl: 'my-icon-shadow.png',
    // shadowSize: [68, 95],
    // shadowAnchor: [22, 94]
});

const sensorIconTaken = new L.Icon({
    iconUrl:require('../../images/sensorTaken.png'),
    iconSize:sensorIconSize,
    // iconAnchor: [22, 94],
    // popupAnchor: [-3, -76],
    // shadowUrl: 'my-icon-shadow.png',
    // shadowSize: [68, 95],
    // shadowAnchor: [22, 94]
});


class MapClass extends Component{

    constructor(props){
        super(props);

        this.state = {
            bbox:[[0,0],[10,10]],
            center:{lat:34.417482, lng:-119.847636},
            zoom:100,
            entrance:[0,0],
            thisDate:new Date(),
            selected:{
                date: "",
                car:"",
                spot:0,
            },
        }
    }

    componentWillMount(){
        this.initMap();
    }

    componentDidMount(){
        
        if (this.props.userInfo!==null&&this.state.selected.car===""&&this.props.userInfo.cars!=null) {
            let first = this.props.userInfo.cars[Object.keys(this.props.userInfo.cars)[0]].type;                        
            this.setState({
                selected:{
                    ...this.state.selected,
                    car:first
                }
            })
        }
        if(this.props.userInfo.booked!==null){            
            this.props.changeSpotStatus();
        }
    }

    initMap = () => {
        this.calcBBox();
        this.setState({
            entrance:[this.props.geometry[0].geometry.coordinates[0],this.props.geometry[0].geometry.coordinates[1]],
        })         
    }

    calcBBox = () =>{
        let ul = [Math.pow(10, 1000),-Math.pow(10, 1000)];
        let lr = [-Math.pow(10, 1000),Math.pow(10, 1000)];
        let points = this.props.geometry[1].geometry.coordinates;
        Object.keys(points).forEach((item)=>{
            if (points[item][0]<ul[0]) {
                ul[0] = points[item][0]
            }
            if (points[item][0]>lr[0]) {
                lr[0] = points[item][0]
            }
            if (points[item][1]>ul[1]) {
                ul[1] = points[item][1]
            }
            if (points[item][1]<lr[1]) {
                lr[1] = points[item][1]
            }
        })        
        this.setState({bbox:[ul,lr]})
    }

    hoverMarker = ()=>{
        console.log("test");
        
    }

    handleDatePicker = (date) => {        
        this.setState({
            thisDate:date,
            selected:{
                ...this.state.selected,
                date: date.toLocaleString(),
            }
        })
    }

    selectSpot = (e) => {        
        let id = e.target.options.id.split("-")[1];
        this.setState({
            selected: {
                ...this.state.selected,
                spot:id,
            }
        });
    }

    selectCar = (e) =>{                
        this.setState({
            selected:{
                ...this.state.selected,
                car:this.inputVal.value,
            }  
        });
    }

    bookSpot = (e) =>{
        
        if(Object.keys(this.state.selected).length===3&&this.state.selected.date!==""&&this.state.selected.car!==""&&this.props.sensors[this.state.selected.spot].properties.status===0){            
            this.props.bookSpotToUser(this.state.selected);
        }else{
            alert("Booking not valid")
        }
    }

    render(){        

        return(
        <>
            <Map bounds={this.state.bbox} style={{width:"100%"}}>
                <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={this.state.entrance} icon={entranceIcon}></Marker>
                {this.props.sensors!=null?Object.keys(this.props.sensors).map((item,index)=>
                    <Marker onMouseOver={this.hoverMarker} id={"sensor-"+item} key={item} onClick={this.selectSpot} position={[this.props.sensors[item].geometry.coordinates[0],this.props.sensors[item].geometry.coordinates[1]]} icon={this.props.sensors[item].properties.status===0?sensorIconAvaliable:sensorIconTaken}>
                        <Popup id={"popup"+index}>
                            {this.props.sensors[this.state.selected.spot].properties.status===0?<Form className="popupForm">
                                <Row>Book {"parkingspot "+item}:</Row>
                                <Form.Group as={Row} controlId="selectCar">
                                    <Form.Label column sm={5}>Select car:</Form.Label>
                                    <Col sm={5.5}>
                                        <Form.Control onChange={this.selectCar} ref={val => {this.inputVal=val}} key={"item"+item} as="select"> 
                                            {this.props.userInfo.cars!=null?Object.keys(this.props.userInfo.cars).map((item2)=>
                                                <option value={this.props.userInfo.cars[item2].type} key={item2}>{this.props.userInfo.cars[item2].type}</option>
                                                ):<option>"Add a car first.."</option>}
                                        </Form.Control>  
                                    </Col>  
                                </Form.Group>
                                <Row>
                                    <Col sm={5}>Date:</Col>
                                    <Col sm={5.5}>
                                    <DatePicker
                                        className="bookDatePicker"
                                        selected={this.state.thisDate}
                                        onChange={this.handleDatePicker}
                                        showTimeSelect
                                        timeFormat="HH:mm"
                                        timeIntervals={15}
                                        dateFormat="MM/dd/yy h:mm aa"
                                        timeCaption="time"                                        
                                    />
                                    </Col>
                                </Row>
                                <Button variant="secondary" onClick={this.bookSpot}>Book</Button>
                            </Form>:"This spot is taken"}
                        </Popup>
                    </Marker>
                ):null}
            </Map>
        </>
        );
    }

}


const mapStateToProps = (reducer) => {    
    const {geometry, login, sensors, help_nodes, userInfo} = reducer.data;
    const {selectedSpot} = reducer.global;
    return {
        login:login,
        geometry:geometry,
        sensors:sensors,
        help_nodes:help_nodes,
        selectedSpot:selectedSpot,
        userInfo:userInfo
      }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({changeSpotStatus,selectSpot, getGeo, bookSpotToUser}, dispatch);
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(MapClass);