import React, { Component } from 'react';
import { View, Text, Modal, Dimensions } from 'react-native';
import firebase from 'firebase';

const { width, height } = Dimensions.get('window');

class ProfileScreen extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      phoneNumber: '',
      profilePictureURL: '',
    };
  }

  componentWillMount() {
    const { displayName, email, phoneNumber, photoURL } = firebase.auth().currentUser;
    this.setState({
      name: displayName,
      email,
      phoneNumber,
      profilePictureURL: photoURL,
    });
  }

  render() {
    console.log(this.state);
    return (
      <Modal visible={this.props.visible} transparent animationType='fade' onRequestClose={() => console.log('closing')}>
        <View style={styles.modalStyle} />
      </Modal>
    );
  }
}

const styles = {
  modalStyle: {
    width,
    height,
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export { ProfileScreen };
