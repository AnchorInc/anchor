import React, { Component } from 'react';
import { View, StatusBar, Dimensions, Image, Picker } from 'react-native';
import { connect } from 'react-redux';
import DialogBox from 'react-native-dialogbox';

import { colors, userTypes } from '../../config';
import { googleLoginRequest, fbLoginRequest, closeErrorMessage, showErrorMessage, resetLogin } from '../../actions';
import { LoginButton, LoginSpinner } from '../common';

import logo from '../../res/images/logo.png';

const { width, height } = Dimensions.get('window');

class Login extends Component {
  state = { userType: userTypes.STUDENT };

  showErrorMessage = () => {
    if (this.props.loginFail) {
      this.dialogbox.alert(this.props.message, { style: { backgroundColor: colors.primary.normal } });
    }
  }

  closeErrorMessage = () => {
    this.props.resetLogin();
    this.props.closeErrorMessage();
  }

  render() {
    const {
      loginContainerStyle,
      containerStyle,
      logoStyle,
    } = styles;
    return (
      <View style={{ flex: 1 }}>
        {this.showErrorMessage()}
        <StatusBar backgroundColor={colors.primary.dark} />
        <View style={containerStyle}>
          <Image
            style={logoStyle}
            source={logo}
            resizeMode='contain'
          />
        </View>
        <View style={{ backgroundColor: 'white', flex: 1.5, justifyContent: 'space-around' }}>
          <View style={loginContainerStyle}>
            <LoginButton title='Sign in with Facebook' iconName='facebook' onPress={this.props.fbLoginRequest.bind(this, this.state.userType)} />
            <LoginButton title='Sign in with Google' iconName='google' onPress={this.props.googleLoginRequest.bind(this, this.state.userType)} />
            <Picker
              style={{ width: 150 }}
              selectedValue={this.state.userType}
              mode='dropdown'
              onValueChange={itemValue => this.setState({ userType: itemValue })}
            >
              <Picker.Item label='Student' value={userTypes.STUDENT} />
              <Picker.Item label='Teacher' value={userTypes.TEACHER} />
            </Picker>
          </View>
        </View>

        <LoginSpinner visible={this.props.loading} title='Authenticating' />
        <DialogBox ref={(dialogbox) => { this.dialogbox = dialogbox; }} />
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 2,
    justifyContent: 'center',
    backgroundColor: colors.primary.normal,
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
    loginFail: state.auth.loginFail,
    message: state.auth.message,
  };
};

export default connect(mapStateToProps, { googleLoginRequest, fbLoginRequest, closeErrorMessage, showErrorMessage, resetLogin })(Login);
