import React, { Component } from 'react';
import { View, StatusBar, Dimensions, Image } from 'react-native';
import { connect } from 'react-redux';
import { MAIN_COLOR, STATUS_BAR_COLOR } from '../../config';
import { googleLoginRequest, fbLoginRequest, closeErrorMessage } from '../../actions';
import { LoginButton, LoginSpinner, ErrorMessage } from '../common';

const logo = require('../../res/Images/logo.png');

const { width, height } = Dimensions.get('window');

class Login extends Component {
  render() {
    const {
      loginContainerStyle,
      containerStyle,
      logoStyle,
    } = styles;
    return (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor={STATUS_BAR_COLOR} />
        <View style={containerStyle}>
        <Image
          style={logoStyle}
          source={logo}
          resizeMode='contain'
        />
        </View>
        <View style={{ backgroundColor: 'white', flex: 1.5, justifyContent: 'space-around' }}>
          <View style={loginContainerStyle}>
            <LoginButton title='Sign in with Facebook' iconName='facebook' onPress={this.props.fbLoginRequest} />
            <LoginButton title='Sign in with Google' iconName='google' onPress={this.props.googleLoginRequest} />
          </View>
        </View>

        <LoginSpinner visible={this.props.loading} title='Authenticating' />
        <ErrorMessage
          visible={this.props.error}
          message={this.props.errorMessage}
          button1Text='Ok'
          onPress={this.props.closeErrorMessage}
        />
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 2,
    justifyContent: 'center',
    backgroundColor: MAIN_COLOR,
  },
  loginContainerStyle: {
    alignItems: 'center',
  },
  logoStyle: {
    alignSelf: 'center',
    width: 0.5 * width,
    height: 0.6 * height,
  },
};

const mapStateToProps = (state) => {
  return {
    errorMessage: state.global.errorMessage,
    error: state.global.error,
    loading: state.auth.loading,
  };
};

export default connect(mapStateToProps, { googleLoginRequest, fbLoginRequest, closeErrorMessage })(Login);
