import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';

import reducers from './src/reducers';

import DefaultContainer from './src/components/DefaultContainer';

const store = createStore(reducers, {} ,applyMiddleware(reduxThunk));


export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <DefaultContainer/>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
