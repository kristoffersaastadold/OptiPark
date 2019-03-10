import React, { Component } from 'react';
import { View, Text, Button, Platform, StatusBar, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { fetchUser } from '../actions/login';
import MapComponent from './MapComponent'
import { bindActionCreators } from 'redux';
import { AreaChart, XAxis, BarChart, Grid } from 'react-native-svg-charts'
import * as shape from 'd3-shape'

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

    if (this.props.userInfo != null) {
      let object = this.props.userInfo.parkings
      console.log(object)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.loading !== this.state.loading) {
      setTimeout(() => {

        this.props.navigation.navigate('MapComponent')
      }, 2000)
    }
  }
  render() {
    if (this.props.userInfo && !this.state.loading) {
      if (this.props.userInfo.isParked) {
        this.setState({
          loading: true,
        })
      }
    }
    const { navigate } = this.props.navigation;
    console.log(this.props.userInfo);
    let previousParkings;
    let activeParkings;
    let licencePlate;
    let history;
    if (this.props.userInfo) {
      previousParkings = this.props.userInfo.history;
      activeParkings = this.props.userInfo.parkings;
      if (this.props.userInfo.cars) {
        licencePlate = this.props.userInfo.cars.lp;
      }
    }


    //{licencePlate ? <Text>{licencePlate}</Text> : <Text>No licencePlate</Text>}
    // 



    // render parking sessions here (a list)
    // if it updates - get update stuff; then run the get navigation

    const data = [
      {
        month: new Date(2015, 0, 1),
        value: 3840,
      },
      {
        month: new Date(2015, 1, 1),
        value: 1600,
      },
      {
        month: new Date(2015, 2, 1),
        value: 640,
      },
      {
        month: new Date(2015, 3, 1),
        value: 3320,
      },
    ]

    const colors = ['#7b4173', '#a55194', '#ce6dbd', '#de9ed6']
    return (
      <ScrollView style={{ paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
        {this.state.loading ? <ActivityIndicator style={styles.spinner} size="large" color="#4dd6de" /> : null}
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
        <Text style={styles.text1}>OPTI<Text style={styles.text2}>PARK</Text></Text>
        {licencePlate ? <Text>Registered licence plate number: <Text style={styles.subText}>{licencePlate}</Text></Text> : <Text>No licencePlate</Text>}

        <View style={{ paddingTop: 15 }}></View>
        {activeParkings ? <Text>You have the following active parking sessions: </Text> : <Text>You have no parkings</Text>}
        {activeParkings ?
          <View>
            {
              Object.keys(activeParkings).map((activeParking) =>
                //projects in case we don't have any projects
                <Text style={styles.activeParking} key={activeParking.imgId}>
                  {activeParkings[activeParking].lp}

                </Text>
              )
            }</View>
          : <Text>No parking</Text>
        }

        <View style={{ paddingTop: 15 }}></View>
        {previousParkings ? <Text>You have the following previous parking sessions: </Text> : <Text>You have no parkings</Text>}
        {previousParkings ?
          <View>
            {
              Object.keys(previousParkings).map((previousParking) =>
                //projects in case we don't have any projects
                <Text style={styles.parking} key={previousParking.imgId}>
                  {previousParkings[previousParking].lp}

                </Text>
              )
            }</View>
          : <Text>No parking</Text>
        }
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
  }
});