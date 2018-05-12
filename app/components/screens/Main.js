import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { userTypes } from '../../config';
import { ClassesStack } from '../../navigation/Router';

class Main extends Component {
  componentWillMount() {
    if (!this.props.donePref) {
      if (this.props.userType === userTypes.STUDENT) {
        this.props.navigation.navigate('ProfileEditing');
      } else {
        this.props.navigation.navigate('TeacherSetup');
      }
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ClassesStack />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  let donePref;
  let userType;
  if (state.user.user) {
    donePref = state.user.user.donePref;
  }
  if (state.user.type) {
    userType = state.user.type;
  }
  return { donePref, userType };
};

export default connect(mapStateToProps)(Main);
