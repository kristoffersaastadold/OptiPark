import React, { Component } from 'react';
import { View, Text, Button, Platform, StatusBar, StyleSheet } from 'react-native';
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
    let parkings;
    if (this.props.userInfo) {
      parkings = this.props.userInfo.parkings;
    }

    // render parking sessions here (a list)
    // if it updates - get update stuff; then run the get navigation
    return (
      <View style={{ paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
        
        <Text>This is the home screen</Text>
        <Button title="testing" onPress={() => navigate('LoginScreen')} />
        {parkings ? <Text>Parkings</Text> : <Text>No parkings</Text>}
        {parkings ?
          <View>
            {
              Object.keys(parkings).map((parking) =>
                //projects in case we don't have any projects
                <Text style={styles.parking}key={parking}>
                  {parkings[parking]}

                </Text>
              )
            }</View>
          : <Text>No parking</Text>
        }
      </View>
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
      backgroundColor: 'grey',
      alignItems: 'center',
      justifyContent: 'center',
  },
});