import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Picker, ScrollView, Dimensions, DatePickerAndroid } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../config';

const { width } = Dimensions.get('window');

class InputForm extends Component {

  constructor(props) {
    super(props);

    this.onSubmitFirstName = this.onSubmitFirstName.bind(this);
    this.onSubmitLastName = this.onSubmitLastName.bind(this);
    this.onSubmitEmail = this.onSubmitEmail.bind(this);
    this.onSubmitPhone = this.onSubmitPhone.bind(this);

    this.firstnameRef = this.updateRef.bind(this, 'firstName');
    this.lastnameRef = this.updateRef.bind(this, 'lastName');
    this.emailRef = this.updateRef.bind(this, 'email');
    this.phoneRef = this.updateRef.bind(this, 'phone');
  }

  state = {
    errors: {},
    editing: false,
    value: '',
    firstName: this.props.user.displayName.substr(0, this.props.user.displayName.indexOf(' ')),
    lastName: this.props.user.displayName.substr(this.props.user.displayName.indexOf(' ') + 1, this.props.user.displayName.length),
    email: this.props.user.email,
    phone: this.props.user.phone,
    age: 'mm/yy/dd',
    gender: '',
  };

  onFocus = () => {
    const { errors = {} } = this.state;
    for (const name in errors) {
      const ref = this[name];

      if (ref && ref.isFocused()) {
        delete errors[name];
      }
    }

    ['firstName', 'lastName', 'email', 'phone']
    .map(name => ({ name, ref: this[name] }))
    .forEach(({ ref }) => {
      if (ref.isFocused()) {
        this.setState({ value: ref.value() });
      }
    });

    this.setState({ errors, editing: true });
  }

  onBlur = () => {
    this.setState({ error: '', editing: false, value: '' });
  }

  onSubmitFirstName() {
     this.lastName.focus();
   }

   onSubmitLastName() {
     this.email.focus();
   }

   onSubmitEmail() {
     this.phone.focus();
   }

   onSubmitPhone() {
     this.phone.blur();
     this.datePicker();
   }

   onSubmit() {
     const errors = {};

     ['firstName', 'lastName', 'email', 'phone']
     .forEach((name) => {
       const value = this[name].value();

       if (!value) {
         errors[name] = 'Can\'t be Empty';
       }
     });

     this.setState({ errors });
   }

  onChangeText = (text) => {
    ['firstName', 'lastName', 'email', 'phone']
    .map(name => ({ name, ref: this[name] }))
    .forEach(({ name, ref }) => {
      if (ref.isFocused()) {
        this.setState({ [name]: text });
        this.setState({ value: text });
      }
    });
  }

  clearText = () => {
    ['firstName', 'lastName', 'email', 'phone']
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

  async datePicker() {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        // Use `new Date()` for current date.
        // May 25 2020. Month 0 is January.
        date: new Date(),
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        // Selected year, month (0-11), day
      }
    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message);
    }
  }

  render() {
    // console.log(this.state.value);
    return (
      <ScrollView
        keyboardShouldPersistTaps='always'
        contentContainerStyle={{ paddingBottom: 15 }}
      >
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
          />
        </View>
        <View style={styles.containerStyle}>
          <TextField
            containerStyle={styles.textInputStyle}
            label='Phone'
            prefix='+91'
            characterRestriction={10}
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
          />
        </View>
        <View style={styles.pillContainerStyle}>
          <Text style={styles.titleTextStyle}>
            Age
          </Text>
          <TouchableOpacity style={styles.pillStyle} onPress={this.datePicker}>
            <Icon name='calendar' color='white' size={24} />
          </TouchableOpacity>
        </View>
        <View style={styles.pillContainerStyle}>
          <Text style={styles.titleTextStyle}>
            Gender
          </Text>
          <Picker
            style={{ width: 200, paddingLeft: 5 }}
            selectedValue={this.state.gender}
            onValueChange={(itemValue) => this.setState({ gender: itemValue })}>
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
            <Picker.Item label="Other" value="other" />
          </Picker>
        </View>

      </ScrollView>
    );
  }
}

const styles = {
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
  titleTextStyle: {
    paddingTop: 10,
    paddingLeft: 10,
    fontFamily: 'avenir_heavy',
    fontSize: 14,
    paddingBottom: 5,
    color: colors.primary.light,
  },
  textInputStyle: {
    width: 0.85 * width,
  },
  pillContainerStyle: {
    paddingTop: 5,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  containerStyle: {
    paddingTop: 5,
    paddingLeft: 15,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
};

export { InputForm };
