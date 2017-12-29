import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { ClassesStack } from '../../navigation/Router';

class Main extends Component {
  render() {
    if (!this.props.donePref && this.props.batchList && this.props.user) {
      this.props.navigation.navigate('ProfileEditing');
    }
    return (
      <View style={{ flex: 1 }}>
        <ClassesStack />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  let donePref;
  let batchList;
  let user = false;
  if (state.user.user) {
      batchList = state.user.user.batchList;
      user = true;
  }
  if (state.user.user) {
    donePref = state.user.user.donePref;
  }
  return { donePref, batchList, user };
};

export default connect(mapStateToProps)(Main);
