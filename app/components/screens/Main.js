import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { ClassesStack } from '../../navigation/Router';

class Main extends Component {
  componentWillMount() {
    if (!this.props.donePref) {
      this.props.navigation.navigate('ProfileEditing');
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
  if (state.user.user) {
    donePref = state.user.user.donePref;
  }
  return { donePref };
};

export default connect(mapStateToProps)(Main);
