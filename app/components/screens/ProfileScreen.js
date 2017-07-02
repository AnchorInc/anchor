import React, { Component } from 'react';
import { Text, Modal, Dimensions, View, ToolbarAndroid, Animated } from 'react-native';
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

class ProfileScreen extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      phoneNumber: '',
      profilePictureURL: '',
      scrollY: new Animated.Value(0)
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

  handleOffsetChanged = (e) => {
    Animated.event(
      [{ nativeEvent: { offset: this.state.scrollY }}, { useNativeDriver: true }]
    )(e, this.state)
  }

  render() {
    console.log(this.state);
    return (
      <Modal visible={this.props.visible} transparent animationType='slide' onRequestClose={() => console.log(' ')}>
        <View style={{ flex: 1 }}>
          <CoordinatorLayout>
            <AppBarLayout  onOffsetChanged={this.handleOffsetChanged} style={{ height: 250, backgroundColor: '#fff' }}>
              <CollapsingToolbarLayout
                title='Collapsing Toolbar'
                contentScrimColor='#673AB7'
                expandedTitleColor='black'
                collapsedTitleTextColor='black'
                expandedTitleGravity='BOTTOM'
                scrimVisibleHeightTrigger={100}
                scrimAnimationDuration={400}
                expandedTitleMarginStart={22}
                expandedTitleMarginBottom={22}
                scrollFlags={
                  AppBarLayout.SCROLL_FLAG_SCROLL || AppBarLayout.SCROLL_FLAG_EXIT_UNTIL_COLLAPSED
                }
              >
                <CollapsingParallax parallaxMultiplier={0.6}>
                  <View collapsable={false} style={{ height: 250, justifyContent: 'center' }}>
                    <Text>Some Custom Text Inside the Parallax</Text>
                  </View>
                </CollapsingParallax>
                <ToolbarAndroid />
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
        </View>
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

export { ProfileScreen };
