import React, { Component } from 'react';
import { View, Text, Button, Platform, StatusBar, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { fetchUser } from '../actions/login';
import { bindActionCreators } from 'redux';

export class Home extends Component {

  constructor(props) {
    super(props);

  }


  componentDidMount() {
    console.log("MOUNTING", this.props.login, this.props.userInfo);
    this.props.fetchUser();

    if (this.props.userInfo != null) {
      let object = this.props.userInfo.parkings
      console.log(object)
    }
  }
  render() {
    const { navigate } = this.props.navigation;
    console.log('inside homescreen')
    let previousParkings;
    let licencePlate;
    let history;
    if (this.props.userInfo) {
      previousParkings = this.props.userInfo.history;
      activeParkings = this.props.userInfo.parkings;
      if (this.props.userInfo.cars) {
        licencePlate = this.props.userInfo.cars.lp;
      }
        //{licencePlate ? <Text>{licencePlate}</Text> : <Text>No licencePlate</Text>}
        // 
    }

    // render parking sessions here (a list)
    // if it updates - get update stuff; then run the get navigation
    return (
      <ScrollView style={{ paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
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
                <Text style={styles.activeParking}key={activeParking.imgId}>
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
                <Text style={styles.parking}key={previousParking.imgId}>
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