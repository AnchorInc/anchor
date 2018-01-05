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

  render() {
    return (
      <View>
        <StatusBar />
        <View style={styles.headerContainerStyle}>
          <View style={styles.headerStyle}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Icon name='keyboard-backspace' size={24} style={styles.backIconStyle} />
            </TouchableOpacity>
            <Text style={styles.headerTextStyle}>
              Edit Profile
            </Text>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Icon name='check' size={22} style={styles.saveIconStyle} />
            </TouchableOpacity>
          </View>
          <View style={styles.profPicContainerStyle}>
            <TouchableOpacity style={styles.profPicStyle}>
              <Image source={{ uri: this.props.user.photoURL }} style={styles.profImageStyle} />
            </TouchableOpacity>
            <Text style={styles.textStyle}>
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
  backIconStyle: {
    color: 'white',
    paddingTop: 5,
    paddingLeft: 0.05 * width,
  },
  saveIconStyle: {
    color: 'white',
    paddingTop: 5,
    paddingRight: 0.05 * width,
  },
  profPicContainerStyle: {
    flex: 3,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profPicStyle: {
<<<<<<< HEAD
    width: 105,
    height: 105,
    backgroundColor: 'rgba(255,255,255,0.4)',
    borderRadius: 52.5,
=======
    width: 100,
    height: 100,
    backgroundColor: 'rgba(255,255,255,0.4)',
    borderRadius: 100,
>>>>>>> dc99c38cdc33fac3ac888860f3128e99be189a3b
    justifyContent: 'center',
    alignItems: 'center',
  },
  profImageStyle: {
    width: 90,
    height: 90,
    borderRadius: 100,
  },
  textStyle: {
    fontSize: 20,
    color: 'white',
    paddingBottom: 15,
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
