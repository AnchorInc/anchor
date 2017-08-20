import React, { Component } from 'react';
import { View, StatusBar, Image, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { STATUS_BAR_COLOR } from '../../config';
import { googleLoginRequest, fbLoginRequest, closeErrorMessage } from '../../actions';
import { LoginButton, LoginSpinner, ErrorMessage } from '../common';

const loginHeader = require('../../resources/images/loginImage.png');

const { width, height } = Dimensions.get('window');

class Login extends Component {
  constructor() {
    super();
    this.state = { userLoggedIn: undefined };
  }

  onFBLoginRequest() {
    this.props.fbLoginRequest();
  }

  onGoogleLoginRequest() {
    this.props.googleLoginRequest();
  }

  render() {
    const {
      loginContainerStyle,
      containerStyle,
      logoStyle,
    } = styles;
    return (
      <View style={{ flexDirection: 'column', flex: 1 }}>
        <StatusBar
          backgroundColor={STATUS_BAR_COLOR}
        />

        <View reacstyle={containerStyle}>
          <Image source={loginHeader} style={logoStyle} />
        </View>

        <View style={{ backgroundColor: 'white', flex: 1.5, justifyContent: 'space-around' }}>
          <View style={loginContainerStyle}>
            <LoginButton title='Sign in with Facebook' iconName='facebook' onPress={this.onFBLoginRequest.bind(this)} />
            <LoginButton title='Sign in with Google' iconName='google' onPress={this.onGoogleLoginRequest.bind(this)} />
          </View>
        </View>

        <LoginSpinner visible={this.props.loading} title='Authenticating...' />
        <ErrorMessage
          visible={this.props.isError}
          message={'Unable to Login'}
          button1Text='Ok'
          onPress={() => { this.props.closeErrorMessage(); }}
        />
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
};

const mapStateToProps = (state) => {
  return {
    errorMessage: state.auth.errorMessage,
    loading: state.auth.loading,
    isError: state.auth.isError,
  };
};

export default connect(mapStateToProps, { googleLoginRequest, fbLoginRequest, closeErrorMessage })(Login);
