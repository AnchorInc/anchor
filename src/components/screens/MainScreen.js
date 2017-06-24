import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import Header from '../common/Header';
import BottomBar from '../common/BottomBar';

class MainScreen extends Component {

  render() {
    return (
      <View style={styles.mainView}>
        <StatusBar
          backgroundColor={'#011023'}
        />
        <Header title='Anchor' />
        <View />
        <BottomBar />
      </View>
    );
  }
}

const styles = {
  mainView: {
    flex: 1,
    flexDirection: 'column',
  },
};

export default MainScreen;
