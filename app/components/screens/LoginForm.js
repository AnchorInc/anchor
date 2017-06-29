import React, { Component } from 'react';
import { View, StatusBar, Image, Dimensions, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import * as colors from '../../config/data';
import { loginUserWithFB, loginUserWithGoogle } from '../../actions';
import LoginButton from '../common/LoginButton';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';

const loginHeader = require('../../resources/images/loginHeader.png');

const { width, height } = Dimensions.get('window');

class LoginForm extends Component {
  constructor() {
    super();
    this.state = { userLoggedIn: undefined };
  }

  componentWillMount() {
    AsyncStorage.getItem('user_data')
    .then(() => {
      this.setState({ userLoggedIn: true });
    })
    .catch(() => {
      this.setState({ userLoggedIn: false });
    });
  }

  onFBSignIn() {
    this.props.loginUserWithFB();
  }

  onGoogleSignIn() {
    this.props.loginUserWithGoogle();
  }

  onSignIn() {
    AsyncStorage.getItem('user_data')
    .then(() => {
      this.props.navigation.navigate('Main');
    });
  }

  render() {
    const {
      loginContainerStyle,
      containerStyle,
      logoStyle,
    } = styles;
    if (this.state.userLoggedIn === undefined) {
      return null;
    } else if (this.state.userLoggedIn) {
      this.props.navigation.navigate('Main');
      return null;
    }
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
<<<<<<< HEAD
        <ErrorMessage
          visible={this.props.isError}
          error={JSON.stringify(this.props.errorMessage)}
          button1Text='Try Again'
          button2Text='Cancel'
        />
        {console.log(this.props.signedIn)}
        {this.onSignedIn()}
=======
        {this.onSignIn()}
>>>>>>> 4d192c9c18e067b06a894130cc411d4e6a7bd2af
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
<<<<<<< HEAD
    user: state.auth.user,
    isError: state.auth.isError,
=======
>>>>>>> 4d192c9c18e067b06a894130cc411d4e6a7bd2af
  };
};

export default connect(mapStateToProps, { loginUserWithFB, loginUserWithGoogle })(LoginForm);
