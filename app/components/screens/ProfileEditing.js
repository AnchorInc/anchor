import React, { Component } from 'react';
import { View, Dimensions, Text, TextInput, TouchableOpacity, DatePickerAndroid, Image } from 'react-native';
import { connect } from 'react-redux';
import { Header } from '../common';
import { MAIN_COLOR } from '../../config';

const { width, height } = Dimensions.get('window');

/**
 * TODO:
 * finish gathering responses from each question
 * finish checkForChanges method
 * implement userDone protocol
*/
class ProfileEditing extends Component {
  state = {
    questions: [
      ['displayName', 'What is your name?'],
      ['email', 'What is your email address?'],
      ['phoneNumber', 'What is your phone number?'],
      ['age', 'How old are you?'],
      ['photoURL', 'Please choose your profile photo'],
      ['header', 'Please choose your   cover photo'],
    ],
    response: {},
    questionIndex: 0,
    editField: false,
  };

  prefBackButton = () => this.setState({ questionIndex: this.state.questionIndex - 1 });
  prefNextButton = () => this.setState({ questionIndex: this.state.questionIndex + 1 });

  renderTextInput = (defaultValue, placeHolder, keyboardType) => {
    return (<TextInput
      style={styles.responseTextInputStyle}
      placeholder={placeHolder}
      placeholderTextColor='#4f5d6d'
      defaultValue={defaultValue}
      underlineColorAndroid='transparent'
      keyboardType={keyboardType}
      caretHidden
    />);
  }

  async renderDatePicker() {
    try {
      // TODO: set up date picker for IOS
      const { action, year, month, day } = await DatePickerAndroid.open({
        date: new Date(1999, 4, 25),
      });
      if (action === DatePickerAndroid.dateSetAction) {
        const rmonth = month + 1;
        if (rmonth > 0 && rmonth < 10) {
          console.log(`${day}/0${rmonth}/${year}`);
        } else {
          console.log(`${day}/${rmonth}/${year}`);
        }
        this.setState({ editField: false });
      }
    } catch ({ code, message }) {
      console.warn(`Cannot open date picker: ${message}`);
    }
  }

  renderAgeInput = () => {
    if (this.state.editField) {
      this.renderDatePicker();
    }
    return (
      <TouchableOpacity onPress={() => this.setState({ editField: true })}>
        <View style={styles.dobButtonContainerStyle}>
          <Text style={styles.dobButtonTextStyle}>
            {this.props.user.dob ? this.props.user.dob : 'Set Birthday'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  renderPhotoURL = () => {
    if (this.state.editField) {
      return null;
    }
    return (
      <TouchableOpacity onPress={() => this.setState({ editField: false })}>
        <Image
          style={{ justifyContent: 'center', alignSelf: 'center', height: 0.2 * height, width: 0.35 * width, borderRadius: 100 }}
          source={{ uri: this.props.user.photoURL }}
        />
      </TouchableOpacity>
    );
  }

  renderOptions = () => {
    switch (this.state.questions[this.state.questionIndex][0]) {
      case 'displayName':
        return this.renderTextInput(this.props.user.displayName, 'Enter Full Name');
      case 'email':
        return this.renderTextInput(this.props.user.email, 'Enter Email Address');
      case 'phoneNumber':
        return this.renderTextInput(this.props.user.phoneNumber, 'Enter Phone Number', 'numeric');
      case 'age':
        return this.renderAgeInput();
      case 'photoURL':
        return this.renderPhotoURL();
      case 'header':
        // TODO: finish renderHeader method
        return null;
      default:
        return null;
    }
  }

  renderQuestions = () => {
    return (
      <View style={styles.questionContainerStyle}>
        <Text style={styles.questionTextStyle}>
          {this.state.questions[this.state.questionIndex][1]}
        </Text>
      </View>
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }} >
        <Header
          title="Profile"
          showPrefBackButton={(this.state.questionIndex > 0)}
          showPrefNextButton={(this.state.questionIndex < this.state.questions.length - 1)}
          prefBackButton={this.prefBackButton}
          prefNextButton={this.prefNextButton}
          prefButtons
        />
        {this.renderQuestions()}
        <View style={styles.responseContainerStyle} >
          {this.renderOptions()}
        </View>
      </View>
    );
  }
}

const styles = {
  questionContainerStyle: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: MAIN_COLOR,
  },
  questionTextStyle: {
    fontFamily: 'avenir_heavy',
    fontSize: 30,
    color: 'white',
    textAlign: 'center',
  },
  responseContainerStyle: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  responseTextInputStyle: {
    fontFamily: 'avenir_roman',
    fontSize: 20,
    color: 'black',
    width: 0.8 * width,
    textAlign: 'center',
  },
  dobButtonContainerStyle: {
    backgroundColor: MAIN_COLOR,
    width: 0.6 * width,
    height: 0.08 * height,
    justifyContent: 'center',
  },
  dobButtonTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'avenir_roman',
    fontSize: 20,
  },
};

const mapStateToProps = (state) => {
  return { user: state.user.user };
};

export default connect(mapStateToProps)(ProfileEditing);
