import React, { Component } from 'react';
import { View, StatusBar, Dimensions, Image, Picker } from 'react-native';
import { connect } from 'react-redux';
import { colors, userTypes } from '../../config';
import { googleLoginRequest, fbLoginRequest, closeErrorMessage } from '../../actions';
import { LoginButton, LoginSpinner, ErrorMessage } from '../common';

const logo = require('../../res/images/logo.png');

const { width, height } = Dimensions.get('window');

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {userType: userTypes.STUDENT};
  }

  render() {
    const {
      loginContainerStyle,
      containerStyle,
      logoStyle,
    } = styles;
    return (
      <View style={{ flex: 1 }}>
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
              style={{width: 150}}
              selectedValue={this.state.userType}
              mode='dropdown'
              onValueChange={(itemValue) => this.setState({userType: itemValue})}>
              <Picker.Item label='Student' value={userTypes.STUDENT} />
              <Picker.Item label='Teacher' value={userTypes.TEACHER} />
            </Picker>
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
  };
};

export default connect(mapStateToProps, { googleLoginRequest, fbLoginRequest, closeErrorMessage })(Login);
