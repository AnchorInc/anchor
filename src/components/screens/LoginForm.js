import React, { Component } from 'react';
import { View, StatusBar, TouchableOpacity, Text, Image, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { loginUserWithFB } from '../../actions';
import LoginButton from '../common/LoginButton';

const loginHeader = require('../../resources/images/loginHeader.png');

const { width, height } = Dimensions.get('window');

class LoginForm extends Component {
  onFBSignIn() {
    this.props.loginUserWithFB();
  }

  render() {
    const {
      loginContainerStyle,
      registerTextStyle,
      containerStyle,
      logoStyle,
    } = styles;

    return (
      <View style={{ flexDirection: 'column', flex: 1 }}>
        <StatusBar
          backgroundColor={'#011023'}
        />

        <View reacstyle={containerStyle}>
          <Image source={loginHeader} style={logoStyle} />
        </View>

        <View style={{ backgroundColor: '#fff', flex: 1.5, justifyContent: 'space-around' }}>
          <View style={loginContainerStyle}>
            <LoginButton title='Sign in with Facebook' iconName='facebook' onPress={this.onFBSignIn.bind(this)} />
            <LoginButton title='Sign in with Email' iconName='email-outline' />
            <TouchableOpacity>
              <View>
                <Text style={registerTextStyle}>
                  {"Don't have an Account? Click here."}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 2,
    justifyContent: 'center',
  },
  loginContainerStyle: {
    alignItems: 'center',
  },
  logoStyle: {
    alignSelf: 'center',
    width,
    height: 0.6 * height,
    transform: [
      {
        scaleX: 1.04,
      },
      {
        scaleY: 1,
      },
    ],
  },
  registerTextStyle: {
    color: '#bf3b3b',
  },
};

export default connect(null, { loginUserWithFB })(LoginForm);
