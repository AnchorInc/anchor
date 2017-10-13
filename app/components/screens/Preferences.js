import React, { Component } from 'react';
import { View, Dimensions, StatusBar, Text, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { Header } from '../common';
import { STATUS_BAR_COLOR, ACCENT_COLOR } from '../../config';

const { width, height } = Dimensions.get('window');

class Preferences extends Component {
  state = { userFinished: false };

  checkIfUserIsDone = () => {
    console.log('checking if user is done');
    // TODO: update the donePref AsyncStorage var to true
    this.props.navigation.goBack();
  }

  render() {
    const { containerStyle, headerStyle } = styles;
    return (
      <View>
        <StatusBar backgroundColor={STATUS_BAR_COLOR} />
        <View style={containerStyle}>
          <Header title='Preferences' onPress={() => this.checkIfUserIsDone()} prefButtons />
          <Text style={headerStyle}>
            Tell us more...
          </Text>
          <TextInput placeholder='Phone Number' placeholderTextColor='#555' underlineColorAndroid={ACCENT_COLOR} keyboardType='numeric' />
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
  headerStyle: {
    fontSize: 25,
    fontFamily: 'avenir_heavy',
    color: 'black',
    paddingLeft: 17,
    padding: 10,
    alignSelf: 'center',
  },
};

const mapStateToProps = (state) => {
  return { user: state.user.user };
};

export default connect(mapStateToProps)(Preferences);
