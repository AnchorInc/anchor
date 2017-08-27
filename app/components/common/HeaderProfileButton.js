import React, { Component } from 'react';
import { TouchableOpacity, Dimensions, Image, View, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getUser } from '../../models/User';

const { width } = Dimensions.get('window');

class HeaderProfileButton extends Component {
  state = {
    profilePhoto: '',
    iconVisible: true,
  };

  componentWillMount() {
    AsyncStorage.getItem('profile').then((profile) => {
      if (profile != null) {
        this.setState({ profilePhoto: profile, iconVisible: false });
      } else {
        this.setState({ iconVisible: true });
        getUser().then((user) => {
          AsyncStorage.setItem('profile', user.photoURL);
          this.setState({ profilePhoto: user.photoURL, iconVisible: false });
        }).catch((error) => {
          this.setState({ iconVisible: true });
          console.log(error);
        });
      }
    });
  }

  renderProfile = () => {
    if (!this.state.iconVisible) {
      return <Image style={styles.profileStyle} source={{ uri: this.state.profilePhoto }} />;
    }
    return <Icon name='account-circle' color='white' size={24} />;
  }

  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View>
          {this.renderProfile()}
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
};

export { HeaderProfileButton };
