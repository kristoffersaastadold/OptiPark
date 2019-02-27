import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import MapView from 'react-native-maps';

const styles = StyleSheet.create({
    mapContainer: {
        width: '100%',
        height: 200
    },
    map: {
        width: '100%',
        height: '100%'
    }
});

export default class UsersMap extends Component {

    state = {
        userLocationMarker: null
    }

    constructor(props) {
        super(props);
    }





    render() {
        if (this.props.userLocation) {
            console.log("cool")
            this.setState({
                userLocationMarker: <MapView.Marker coordinate={this.props.userLocation} />
            })
        }
        console.log('Marker', this.state.userLocationMarker)
        return (
            <View style={styles.mapContainer}>
                <MapView initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                    region={this.props.userLocation}
                    style={styles.map}>
                    {this.state.userLocationMarker}
                </MapView>
            </View>
        );
    }
}