import React, { Component } from 'react';
import { View, Modal, Dimensions, StatusBar } from 'react-native';
import { Header } from '../common';
import { STATUS_BAR_COLOR } from '../../config';

const { width, height } = Dimensions.get('window');

class Preferences extends Component {
  state = { userFinished: false, user: null };

  checkIfUserIsDone = () => {
    console.log('checking if user is done');
    // TODO: update the donePref AsyncStorage var to true
    this.props.onPress();
  }

  render() {
    const { modalStyle } = styles;
    return (
      <Modal
        visible={this.props.visible}
        transparent
        animationType='slide'
        onRequestClose={() => console.log('Modal has been closed')}
      >
        <StatusBar backgroundColor={STATUS_BAR_COLOR} />
        <View style={modalStyle}>
          <Header title='Preferences' prefButtons onPress={this.checkIfUserIsDone} />
        </View>
      </Modal>
    );
  }
}

const styles = {
  modalStyle: {
    width,
    height,
    backgroundColor: 'white',
  },
};

export default Preferences;
