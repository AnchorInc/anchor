import React, { Component } from 'react';
import { View, Dimensions, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { Header } from '../common';
import { STATUS_BAR_COLOR } from '../../config';

const { width, height } = Dimensions.get('window');

class Preferences extends Component {
  state = { userFinished: false };

  checkIfUserIsDone = () => {
    console.log('checking if user is done');
    // TODO: update the donePref AsyncStorage var to true
    this.props.navigation.goBack();
  }

  render() {
    const { containerStyle } = styles;
    return (
      <View>
        <StatusBar backgroundColor={STATUS_BAR_COLOR} />
        <View style={containerStyle}>
          <Header title='Preferences' onPress={() => this.checkIfUserIsDone()} prefButtons />
        </View>
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    width,
    height,
    backgroundColor: 'white',
  },
};

const mapStateToProps = (state) => {
  return { user: state.user.user };
};

export default connect(mapStateToProps)(Preferences);
