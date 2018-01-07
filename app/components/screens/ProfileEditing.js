import React, { Component } from 'react';
import { View, Dimensions, TouchableOpacity, Image, Text, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { MAIN_COLOR } from '../../config';
import { updateUser } from '../../actions';

const { width, height } = Dimensions.get('window');

class ProfileEditing extends Component {
  updateUser = (user) => {
    this.props.updateUser(user);
  }

  showPhotoEditMenu() {
  }

  render() {
    const {
      headerContainerStyle,
      headerStyle,
      headerTextStyle,
      headerIconStyle,
      profPicStyle,
      profImageStyle,
      profPicContainerStyle,
      textStyle,
    } = styles;
    return (
      <View>
        <StatusBar />
        <View style={headerContainerStyle}>
          <View style={headerStyle}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Icon name='keyboard-backspace' size={24} style={headerIconStyle} />
            </TouchableOpacity>
            <Text style={headerTextStyle}>
              Edit Profile
            </Text>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Icon name='check' size={22} style={headerIconStyle} />
            </TouchableOpacity>
          </View>
          <View style={profPicContainerStyle}>
            <View style={profPicStyle}>
              <Image source={{ uri: this.props.user.photoURL }} style={profImageStyle} />
            </View>
            <Text style={textStyle}>
              {this.props.user.displayName}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = {
  headerContainerStyle: {
    backgroundColor: MAIN_COLOR,
    height: 0.4 * height,
  },
  headerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 5,
    flex: 1,
  },
  headerTextStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    padding: 5,
  },
  headerIconStyle: {
    color: 'white',
    paddingTop: 5,
    paddingLeft: 0.05 * width,
    paddingRight: 0.05 * width,
  },
  profPicContainerStyle: {
    flex: 3,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 30,
  },
  profPicStyle: {
    width: width * 0.3,
    height: width * 0.3,
    backgroundColor: 'rgba(255,255,255,0.4)',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profImageStyle: {
    width: width * 0.27,
    height: width * 0.27,
    borderRadius: 100,
  },
  textStyle: {
    fontSize: 20,
    color: 'white',
    paddingRight: 20,
    paddingLeft: 20,
  },
};

const mapStateToProps = (state) => {
  let user;
  if (state.user.user) {
    user = state.user.user;
  }
  return { user };
};

export default connect(mapStateToProps, { updateUser })(ProfileEditing);
