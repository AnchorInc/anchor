import React, { Component } from 'react';
import { Text, Modal, Dimensions, View } from 'react-native';
import firebase from 'firebase';
import {
  AppBarLayout,
  CoordinatorLayout,
  CollapsingToolbarLayout,
  CollapsingParallax,
  NestedScrollView,
} from 'react-native-collapsing-toolbar';
import { MAIN_COLOR } from '../../config';

const { width, height } = Dimensions.get('window');

class Profile extends Component {
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
      <Modal visible={this.props.visible} transparent animationType='slide' onRequestClose={() => console.log('closing')}>
        <CoordinatorLayout>
          <AppBarLayout style={{ height: 300, backgroundColor: '#000' }}>
            <CollapsingToolbarLayout
              title='Collapsing Toolbar'
              contentScrimColor={MAIN_COLOR}
              expandedTitleColor='#ffffff'
              expandedTitleGravity='BOTTOM'
              scrimAnimationDuration={500}
              expandedTitleMarginStart={22}
              expandedTitleMarginBottom={22}
              scrollFlags={AppBarLayout.SCROLL_FLAG_SCROLL | AppBarLayout.SCROLL_FLAG_EXIT_UNTIL_COLLAPSED | AppBarLayout.SCROLL_FLAG_SNAP}
            >
              <CollapsingParallax parallaxMultiplier={0.6}>
                <View collapsable={false} style={{height: 300, justifyContent: 'center' }}>
                  <Text>Some Custom Text Inside the Parallax</Text>
                </View>
              </CollapsingParallax>
            </CollapsingToolbarLayout>
          </AppBarLayout>
          <NestedScrollView>
            <Text>Test</Text>
            <Text>Test</Text>
            <Text>Test</Text>
            <Text>Test</Text>
            <Text>Test</Text>
            <Text>Test</Text>
            <Text>Test</Text>
            <Text>Test</Text>
            <Text>Test</Text>
            <Text>Test</Text>
            <Text>Test</Text>
            <Text>Test</Text>
            <Text>Test</Text>
            <Text>Test</Text>
            <Text>Test</Text>
            <Text>Test</Text>
            <Text>Test</Text>
            <Text>Test</Text>
            <Text>Test</Text>
          </NestedScrollView>
        </CoordinatorLayout>
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
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
};

export { Profile };
