import React, { Component } from 'react';
import { View, Dimensions, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import { Header } from '../common';

const { width, height } = Dimensions.get('window');

class ProfileEditing extends Component {
  render() {
    return (
      <View>
        <Header title="Edit Profile" prefButtons onPress={() => console.log('check button')} />
        <Text>Edit your Profile</Text>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return { user: state.user.user };
};

export default connect(mapStateToProps)(ProfileEditing);
