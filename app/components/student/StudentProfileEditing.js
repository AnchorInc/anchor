import React, { Component } from 'react';
import {
  View, Dimensions, ScrollView, TouchableOpacity,
  Image, Text, StatusBar, Slider, Platform,
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TextField } from 'react-native-material-textfield';

import { colors } from '../../config';
import { updateUser } from '../../actions';

const { width, height } = Dimensions.get('window');

// TODO: add change profile picture functionality
class StudentProfileEditing extends Component {
  constructor(props) {
    super(props);

    this.onSubmitFirstName = this.onSubmitFirstName.bind(this);
    this.onSubmitLastName = this.onSubmitLastName.bind(this);
    this.onSubmitEmail = this.onSubmitEmail.bind(this);
    this.onSubmitPhone = this.onSubmitPhone.bind(this);
    this.onSubmitLocation = this.onSubmitLocation.bind(this);

    this.firstnameRef = this.updateRef.bind(this, 'firstName');
    this.lastnameRef = this.updateRef.bind(this, 'lastName');
    this.emailRef = this.updateRef.bind(this, 'email');
    this.phoneRef = this.updateRef.bind(this, 'phone');
    this.locationRef = this.updateRef.bind(this, 'location');
  }

  state = {
    errors: {},
    editing: false,
    value: '',
    firstName: this.props.user.displayName.substr(0, this.props.user.displayName.indexOf(' ')) || '',
    lastName: this.props.user.displayName.substr(this.props.user.displayName.indexOf(' ') + 1, this.props.user.displayName.length) || '',
    email: this.props.user.email || '',
    phone: this.props.user.phone || '',
    age: this.props.user.age || 5,
    location: this.props.user.location || '',
  };

  onFocus = () => {
    const { errors = {} } = this.state;
    Object.entries(errors).forEach(([key]) => {
      const ref = this[key];
      if (ref && ref.isFocused()) {
        delete errors[key];
      }
    });

    ['firstName', 'lastName', 'email', 'phone', 'location']
    .map(name => ({ name, ref: this[name] }))
    .forEach(({ ref }) => {
      if (ref.isFocused()) {
        this.setState({ value: ref.value() });
      }
    });

    this.setState({ errors, editing: true });
  }

  onBlur = () => {
    this.setState({ editing: false, value: '' });
  }

  onSubmit() {
     ['firstName', 'lastName', 'email', 'phone', 'location']
     .map(name => ({ name, ref: this[name] }))
     .forEach(({ ref, name }) => {
       const value = ref.value();
       const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
       ref.blur();
       if (!value) {
         this.state.errors[name] = 'Should not be empty';
       } else if (name === 'phone' && value.length !== 10) {
         this.state.errors[name] = 'Needs a 10 digit phone number';
       } else if (name === 'location' && value.length !== 6) {
         this.state.errors[name] = 'Requires a 6 digit zip code';
       } else if (name === 'email' && !re.test(value)) {
         this.state.errors[name] = 'Enter a valid email address';
       }
     });
   }

  onSubmitFirstName() {
     this.lastName.focus();
   }

   onSubmitLastName() {
     this.email.focus();
   }

   onSubmitEmail() {
     this.location.focus();
   }

   onSubmitLocation() {
     this.phone.focus();
   }

   onSubmitPhone() {
     this.phone.focus();
   }

  onChangeText = (text) => {
    ['firstName', 'lastName', 'email', 'phone', 'location']
    .map(name => ({ name, ref: this[name] }))
    .forEach(({ name, ref }) => {
      if (ref.isFocused()) {
        this.setState({ [name]: text });
        this.setState({ value: text });
      }
    });
  }

  updateUser = () => {
    this.onSubmit();
    const user = {
      displayName: this.state.firstName.concat(' ', this.state.lastName),
      email: this.state.email,
      phone: this.state.phone,
      age: this.state.age,
      location: this.state.location,
      uid: this.props.user.uid,
    };
    if (this.state.errors && Object.keys(this.state.errors).length === 0) {
      this.updateDonePref();
      this.props.updateUser(user);
      this.props.navigation.goBack();
    }
  }

  updateDonePref = () => {
    if (!this.props.user.donePref) {
      this.props.updateUser({ donePref: true });
    }
  }

  clearText = () => {
    ['firstName', 'lastName', 'email', 'phone', 'location']
    .map(name => ({ name, ref: this[name] }))
    .forEach(({ ref }) => {
      if (ref.isFocused()) {
        ref.clear();
        this.setState({ value: '' });
      }
    });
  }

  showClearTextButton = () => {
    if (this.state.value !== '' && this.state.editing) {
      return (
        <TouchableOpacity onPress={this.clearText}>
          <Icon size={24} name="close-circle" />
        </TouchableOpacity>
      );
    }
    return null;
  }

  updateRef(name, ref) {
    this[name] = ref;
  }

  render() {
    const {
      headerContainerStyle,
      headerStyle,
      headerTextStyle,
      profileStyle,
      profileContainerStyle,
      buttonContainerStyle,
      nameStyle,
      nameContainerStyle,
    } = styles;
    return (
      <View style={{ flex: 1 }} behavior="height" enabled>
        <StatusBar />
        <ScrollView
          keyboardShouldPersistTaps='always'
          contentContainerStyle={{ paddingBottom: 15 }}
        >
          <View style={headerContainerStyle}>
            <View style={headerStyle}>
              <View style={buttonContainerStyle}>
                <TouchableOpacity
                  disabled={!this.props.user.donePref}
                  style={{ padding: 15, height: 0.08 * height }}
                  onPress={() => this.props.navigation.goBack()}
                  visibility={this.props.user.donePref}
                >
                  <Icon name='arrow-left' size={24} color={this.props.user.donePref ? 'white' : colors.primary.normal} />
                </TouchableOpacity>
                <Text style={headerTextStyle}>
                  Edit Profile
                </Text>
                <TouchableOpacity style={{ padding: 15, height: 0.08 * height }} onPress={() => this.updateUser()}>
                  <Icon name='check' size={24} color='white' />
                </TouchableOpacity>
              </View>
            </View>
            <View style={profileContainerStyle}>
              <Image source={{ uri: this.props.user.photoURL }} style={profileStyle} />
            </View>
          </View>
          <View style={nameContainerStyle}>
            <Text style={nameStyle}>
              {this.props.user.displayName}
            </Text>
          </View>
          <View style={styles.containerStyle}>
            <TextField
              containerStyle={styles.textInputStyle}
              label='First Name'
              value={this.state.firstName}
              returnKeyType='next'
              titleFontSize={14}
              onChangeText={this.onChangeText}
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              onSubmitEditing={this.onSubmitFirstName}
              renderAccessory={this.showClearTextButton}
              ref={this.firstnameRef}
              tintColor={colors.primary.light}
              error={this.state.errors.firstName}
            />
          </View>
          <View style={styles.containerStyle}>
            <TextField
              containerStyle={styles.textInputStyle}
              label='Last Name'
              value={this.state.lastName}
              returnKeyType='next'
              titleFontSize={14}
              onChangeText={this.onChangeText}
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              onSubmitEditing={this.onSubmitLastName}
              renderAccessory={this.showClearTextButton}
              ref={this.lastnameRef}
              tintColor={colors.primary.light}
              error={this.state.errors.lastName}
            />
          </View>
          <View style={styles.containerStyle}>
            <TextField
              containerStyle={styles.textInputStyle}
              label='Email'
              value={this.state.email}
              returnKeyType='next'
              titleFontSize={14}
              keyboardType='email-address'
              onChangeText={this.onChangeText}
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              onSubmitEditing={this.onSubmitEmail}
              renderAccessory={this.showClearTextButton}
              ref={this.emailRef}
              tintColor={colors.primary.light}
              error={this.state.errors.email}
            />
          </View>
          <View style={styles.containerStyle}>
            <TextField
              containerStyle={styles.textInputStyle}
              label='Location/Zip Code'
              keyboardType='numeric'
              returnKeyType='next'
              value={this.state.location}
              titleFontSize={14}
              onChangeText={this.onChangeText}
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              onSubmitEditing={this.onSubmitLocation}
              renderAccessory={this.showClearTextButton}
              ref={this.locationRef}
              tintColor={colors.primary.light}
              error={this.state.errors.location}
            />
          </View>
          <View style={styles.containerStyle}>
            <TextField
              containerStyle={styles.textInputStyle}
              label='Phone'
              prefix='+91'
              keyboardType='numeric'
              returnKeyType='next'
              value={this.state.phone}
              titleFontSize={14}
              onChangeText={this.onChangeText}
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              onSubmitEditing={this.onSubmitPhone}
              renderAccessory={this.showClearTextButton}
              ref={this.phoneRef}
              tintColor={colors.primary.light}
              error={this.state.errors.phone}
            />
          </View>
          <View style={styles.pillContainerStyle}>
            <View style={{
              width: 0.95 * width,
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              }}
            >
              <Text style={styles.titleTextStyle}>Age</Text>
              <Text style={styles.textStyle}>{this.state.age}</Text>
            </View>
            <Slider
              style={{ width: 0.95 * width }}
              value={this.props.user.age}
              onValueChange={value => this.setState({ age: value })}
              maximumValue={99}
              minimumValue={5}
              step={1}
              minimumTrackTintColor={colors.primary.light}
              thumbTintColor={colors.primary.light}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  headerContainerStyle: {
    alignItems: 'center',
    marginTop: (Platform.OS === 'ios') ? height * 0.03 : 0,
  },
  buttonContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width,
  },
  headerStyle: {
    height: 0.3 * height,
    backgroundColor: colors.primary.normal,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width,
  },
  headerTextStyle: {
    fontFamily: 'AvenirLTStd-Heavy',
    fontSize: 20,
    color: 'white',
    padding: 15,
  },
  profileContainerStyle: {
    position: 'absolute',
    top: (height * 0.3) - ((0.27 * width) / 2),
    width: width * 0.26,
    height: width * 0.26,
    backgroundColor: colors.other.bgColor,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileStyle: {
    width: width * 0.25,
    height: width * 0.25,
    borderRadius: (width * 0.25) / 2,
  },
  nameContainerStyle: {
    paddingTop: 0.125 * width,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  nameStyle: {
    fontSize: 20,
    fontFamily: 'AvenirLTStd-Medium',
    color: 'black',
    padding: 5,
  },
  pillStyle: {
    flexDirection: 'row',
    width: 0.95 * width,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: colors.secondary.normal,
    height: 0.1 * width,
    borderRadius: 100,
    padding: 5,
  },
  textStyle: {
    fontFamily: 'AvenirLTStd-Heavy',
    paddingTop: 10,
    paddingRight: 15,
    fontSize: 14,
    color: '#909094',
  },
  titleTextStyle: {
    paddingTop: 10,
    paddingLeft: 15,
    fontFamily: 'AvenirLTStd-Heavy',
    fontSize: 14,
    paddingBottom: 5,
    color: colors.primary.light,
  },
  textInputStyle: {
    width: 0.9 * width,
    paddingBottom: 0,
  },
  pillContainerStyle: {
    paddingTop: 5,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  containerStyle: {
    paddingBottom: 5,
    paddingLeft: 15,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
};

const mapStateToProps = (state) => {
  let user;
  if (state.user.user) {
    user = state.user.user;
  }
  return { user };
};

export default connect(mapStateToProps, { updateUser })(StudentProfileEditing);
