import React, { Component } from 'react';
import { Text, StatusBar, Modal, Dimensions, View } from 'react-native';
import firebase from 'firebase';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  AppBarLayout,
  CoordinatorLayout,
  CollapsingToolbarLayout,
  CollapsingParallax,
} from 'react-native-collapsing-toolbar';
import { MAIN_COLOR, STATUS_BAR_COLOR } from '../../config';

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
      <Modal visible={this.props.visible} transparent animationType='slide' onRequestClose={() => console.log(' ')}>
        <StatusBar transparent backgroundColor={STATUS_BAR_COLOR} />
        {/*<View style={styles.statusBar} />*/}
        <CoordinatorLayout style={styles.modalStyle}>
            <AppBarLayout style={{ height: 250, backgroundColor: 'black' }}>
              <CollapsingToolbarLayout
                title={this.state.name}
                contentScrimColor={MAIN_COLOR}
                expandedTitleColor='white'
                collapsedTitleTextColor='white'
                collapsedTitleTypeface='avenir_book'
                collapsedTitleGravity='CENTER'
                scrimAnimationDuration={300}
                expandedTitleGravity='BOTTOM'
                scrimVisibleHeightTrigger={150}
                expandedTitleMarginStart={20}
                expandedTitleMarginBottom={22}
                expandedTitleTypeface='avenir_book'
                scrollFlags={AppBarLayout.SCROLL_FLAG_SNAP | AppBarLayout.SCROLL_FLAG_SCROLL | AppBarLayout.SCROLL_FLAG_EXIT_UNTIL_COLLAPSED}
              >
                <CollapsingParallax parallaxMultiplier={0.6}>
                  <View collapsable={false} style={{ height: 250, justifyContent: 'center' }} />
                </CollapsingParallax>
                <Icon.ToolbarAndroid
                  navIconName="keyboard-backspace"
                  iconColor='white'
                  actions={[{ title: 'SAVE', show: 'never' }]}
                  overflowIconName='dots-vertical'
                />
              </CollapsingToolbarLayout>
            </AppBarLayout>
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
  },
  statusBar: {
    height: 24,
  },
};

export { Profile };
