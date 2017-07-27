import React, { Component } from 'react';
import { TouchableOpacity, Dimensions, Image, View } from 'react-native';
import { getCurrentUser } from '../../models/User';
import { LIGHT_GRAY } from '../../config';

const { width } = Dimensions.get('window');


class HeaderProfileButton extends Component {
  constructor() {
    super();
    this.state = {
      profilePictureURL: '',
    };
    getCurrentUser().then(currentUser => this.setState({ profilePictureURL: currentUser.photoURL }));
  }

  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View>
          <Image source={{ uri: this.state.profilePictureURL }} style={styles.profileStyle} />
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = {
  profileStyle: {
    width: 0.07 * width,
    height: 0.07 * width,
    borderRadius: (0.07 * width) / 2,
    paddingLeft: 5,
    paddingRight: 5,
  },
  containerStyle: {
    width: 0.07 * width,
    height: 0.07 * width,
    borderRadius: (0.07 * width) / 2,
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: LIGHT_GRAY,
  },
};

export { HeaderProfileButton };
