import React, { Component } from 'react';
import { TouchableOpacity, Dimensions, Image, View } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

class HeaderProfileButton extends Component {
  renderProfile = () => {
    if (this.props.photoURL != null) {
      return <Image style={styles.profileStyle} source={{ uri: this.props.photoURL }} />;
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

const mapStateToProps = (state) => {
  return { photoURL: state.user.photoURL };
};

export default connect(mapStateToProps)(HeaderProfileButton);
