import React, { Component } from 'react';
import { View, Text, Button, Platform, StatusBar, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { fetchUser } from '../actions/login';
import MapComponent from './MapComponent'
import { bindActionCreators } from 'redux';
import { AreaChart, XAxis, BarChart, Grid } from 'react-native-svg-charts'
import * as shape from 'd3-shape'

const LoadingSession = (props) => {
  return(
    <View>
      <ActivityIndicator style={styles.spinner} size="large" color="#4dd6de" />
    </View>
    
  )
}

export class Home extends Component {


  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    }

  }

  componentWillMount() {
    this.props.fetchUser();
  }


  componentDidMount() {
    console.log("MOUNTING", this.props.login, this.props.userInfo);
    this.setState({loading:false})
    if (this.props.userInfo != null) {
      let object = this.props.userInfo.parkings
      console.log(object)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevPorps.userInfo.isParked !== this.props.) {
      if (this.state.loading) {
        setTimeout(() => {
          this.props.navigation.navigate('Map')
        }, 2000)
      }else{
        this.setState({loading:false})
      }
    }
  }
  render() {

    return (
      <ScrollView style={{ paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
        {this.state.loading ? <LoadingSession/> : null}
        {/*

        <BarChart
                style={ { height: 200 } }
                //keys={ keys }
                //colors={ colors }
                data={ data }
                //showGrid={ false }
                contentInset={ { top: 30, bottom: 30 } }
            />


        <AreaChart
          style={{ height: 200 }}
          data={[50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]}
          contentInset={{ top: 30, bottom: 30 }}
          curve={shape.curveNatural}
          svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
        >
          <Grid />
        </AreaChart>
        */}


        {/* <Text style={styles.text1}>OPTI<Text style={styles.text2}>PARK</Text></Text>
        <Text style={styles.text1}>OPTI<Text style={styles.text2}>PARK</Text></Text>
        <Text style={styles.text1}>OPTI<Text style={styles.text2}>PARK</Text></Text>
        <Text style={styles.text1}>OPTI<Text style={styles.text2}>PARK</Text></Text>
        <Text style={styles.text1}>OPTI<Text style={styles.text2}>PARK</Text></Text>
        <Text style={styles.text1}>OPTI<Text style={styles.text2}>PARK</Text></Text>
        <Text style={styles.text1}>OPTI<Text style={styles.text2}>PARK</Text></Text>
        <Text style={styles.text1}>OPTI<Text style={styles.text2}>PARK</Text></Text>
        <Text style={styles.text1}>OPTI<Text style={styles.text2}>PARK</Text></Text>
        <Text style={styles.text1}>OPTI<Text style={styles.text2}>PARK</Text></Text>
        <Text style={styles.text1}>OPTI<Text style={styles.text2}>PARK</Text></Text>
        {licencePlate ? <Text>Registered licence plate number: <Text style={styles.subText}>{licencePlate}</Text></Text> : <Text>No licencePlate</Text>}
        */}
      </ScrollView>
    )
  }
};


// get the user login here
const mapStateToProps = (reducer) => {

  const { login, userInfo } = reducer.database;
  return {
    login: login,
    userInfo: userInfo,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchUser }, dispatch);
}




export default connect(mapStateToProps, mapDispatchToProps)(Home);
const styles = StyleSheet.create({
  parking: {
    paddingTop: 5,
    paddingBottom: 5,
    marginTop: 5,
    marginBottom: 5,
    paddingLeft: 10,
    backgroundColor: 'black',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeParking: {
    paddingTop: 5,
    paddingBottom: 5,
    marginTop: 5,
    marginBottom: 5,
    paddingLeft: 10,
    backgroundColor: '#328ae3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text1: {
    fontSize: 50,
    fontWeight: 'bold',
    fontFamily: 'Cochin',
    textAlign: 'center',
    color: '#328ae3',
    paddingTop: 20,
    paddingBottom: 20,

  },
  text2: {
    fontSize: 50,
    fontWeight: 'bold',
    fontFamily: 'Cochin',
    color: 'black',
    textAlign: 'center',
    paddingBottom: 20,
    paddingTop: 20,
  },
  subText: {
    fontWeight: 'bold',
    fontFamily: 'Cochin',
  },
});