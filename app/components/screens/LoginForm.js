import React, { Component } from 'react';
import { View, StatusBar, Image, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import * as colors from '../../config/data';
import { loginUserWithFB, loginUserWithGoogle } from '../../actions';
import LoginButton from '../common/LoginButton';
import LoadingSpinner from '../common/LoadingSpinner';

const loginHeader = require('../../resources/images/loginHeader.png');

const { width, height } = Dimensions.get('window');

class LoginForm extends Component {
  onFBSignIn() {
    this.props.loginUserWithFB();
  }

  onGoogleSignIn() {
    this.props.loginUserWithGoogle();
  }

  onSignedIn() {
    if (this.props.user !== null && !this.props.loading) {
      this.props.navigation.navigate('Main');
    }
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
          backgroundColor={colors.STATUS_BAR}
        />

        <View reacstyle={containerStyle}>
          <Image source={loginHeader} style={logoStyle} />
        </View>

        <View style={{ backgroundColor: 'white', flex: 1.5, justifyContent: 'space-around' }}>
          <View style={loginContainerStyle}>
            <LoginButton title='Sign in with Facebook' iconName='facebook' onPress={this.onFBSignIn.bind(this)} />
            <LoginButton title='Sign in with Google' iconName='google' onPress={this.onGoogleSignIn.bind(this)} />
          </View>
        </View>

        <LoadingSpinner visible={this.props.loading} title='Authenticating...' />
        {console.log(this.props.signedIn)}
        {this.onSignedIn()}
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
    error: state.auth.error,
    loading: state.auth.loading,
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, { loginUserWithFB, loginUserWithGoogle })(LoginForm);
