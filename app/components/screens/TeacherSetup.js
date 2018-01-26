import React, { Component } from 'react';
import { View, Dimensions, ScrollView, TouchableOpacity, Image, Text, StatusBar, Picker, Slider } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TextField } from 'react-native-material-textfield';
import { colors } from '../../config';
import { updateUser } from '../../actions';

const { width, height } = Dimensions.get('window');

class TeacherSetup extends Component {
  constructor(props) {
    super(props);

    this.subjectRef = this.updateRef.bind(this, 'subject');
  }

  state = {
    value: '',
    editing: false,
    errors: '',
    experience: '0',
    studentAge: 'Elementary School',
    price: 100,
    userType: 'teachers',
    location: 'Student\'s Location',
    subject: '',
    user: this.props.navigation.state.params.user,
  };

  updateRef(name, ref) {
    this[name] = ref;
  }

  updateUser = () => {
    this.onSubmit();
    const user = {
      displayName: this.state.user.displayName,
      email: this.state.user.email,
      phone: this.state.user.phone,
      photoURL: this.props.user.photoURL,
      location: this.state.location,
      price: this.state.price,
      studentAge: this.state.studentAge,
      experience: this.state.experience,
      subject: this.state.subject,
      UID: this.state.user.uid,
      userType: this.state.userType,
    };
    this.props.updateUser(user);
    this.props.navigation.navigate('Main');
  }

  onSubmit() {
    this.subject.blur();
    const value = this.subject.value();
    if (!value) {
      this.setState({ errors: 'Should not be empty' });
    }
  }

  showClearTextButton = () => {
    if (this.state.value !== '' && this.state.editing) {
      return (
        <TouchableOpacity onPress={() => {
          this.subject.clear();
          this.setState({ value: '' });
        }}
        >
          <Icon size={24} name="close-circle" />
        </TouchableOpacity>
      );
    }
    return null;
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
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor={colors.primary.dark} />
        <View style={headerContainerStyle}>
          <View style={headerStyle}>
            <View style={buttonContainerStyle}>
              <TouchableOpacity style={{ padding: 15 }} onPress={() => this.props.navigation.goBack()}>
                <Icon name='arrow-left' size={24} color='white' />
              </TouchableOpacity>
              <Text style={headerTextStyle}>
                Tutor Signup
              </Text>
              <TouchableOpacity style={{ padding: 15 }} onPress={this.updateUser}>
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
        <ScrollView
          keyboardShouldPersistTaps='always'
          contentContainerStyle={{ paddingBottom: 15 }}
        >
          <View style={styles.containerStyle}>
            <TextField
              containerStyle={styles.textInputStyle}
              label='Subject'
              value={this.state.firstName}
              returnKeyType='next'
              titleFontSize={14}
              onChangeText={text => this.setState({ subject: text, value: text })}
              onFocus={() => this.setState({ errors: '', editing: true, value: this.subject.value() })}
              onBlur={() => this.setState({ editing: false, value: '' })}
              renderAccessory={this.showClearTextButton}
              ref={this.subjectRef}
              tintColor={colors.primary.light}
              error={this.state.errors}
            />
          </View>
          <View style={styles.pillContainerStyle}>
            <Text style={styles.titleTextStyle}>Years of Experience</Text>
            <Picker
              selectedValue={this.state.experience}
              onValueChange={itemValue => this.setState({ experience: itemValue })}
              style={{ width: 0.95 * width, alignSelf: 'center' }}
            >
              <Picker.Item label="0" value="0" />
              <Picker.Item label="1" value="1" />
              <Picker.Item label="2-5" value="2-5" />
              <Picker.Item label="5-10" value="5-10" />
              <Picker.Item label="10+" value="10+" />
            </Picker>
          </View>
          <View style={styles.pillContainerStyle}>
            <Text style={styles.titleTextStyle}>Student Age Group</Text>
            <Picker
              selectedValue={this.state.studentAge}
              onValueChange={itemValue => this.setState({ studentAge: itemValue })}
              style={{ width: 0.95 * width, alignSelf: 'center' }}
            >
              <Picker.Item label="Elementary School" value="Elementary School" />
              <Picker.Item label="Middle School" value="Middle School" />
              <Picker.Item label="High School" value="High School" />
              <Picker.Item label="College" value="College" />
              <Picker.Item label="Adult" value="Adult" />
            </Picker>
          </View>
          <View style={styles.pillContainerStyle}>
            <View style={{ width: 0.95 * width, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
              <Text style={styles.titleTextStyle}>Price per Class</Text>
              <Text style={styles.textStyle}>₹{this.state.price}</Text>
            </View>
            <Slider style={{ width: 0.95 * width }} value={this.state.price} onValueChange={value => this.setState({ price: value })} maximumValue={2500} minimumValue={100} step={25} maximumTrackTintColor={colors.primary.light} thumbTintColor={colors.primary.light} />
          </View>
          <View style={styles.pillContainerStyle}>
            <Text style={styles.titleTextStyle}>Class Location</Text>
            <Picker
              selectedValue={this.state.location}
              onValueChange={itemValue => this.setState({ location: itemValue })}
              style={{ width: 0.95 * width, alignSelf: 'center' }}
            >
              <Picker.Item label="Student's Location" value="Student's Location" />
              <Picker.Item label="Custom Location" value="Custom Location" />
            </Picker>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  headerContainerStyle: {
    alignItems: 'center',
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
    fontFamily: 'avenir_heavy',
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
    borderRadius: 100,
  },
  nameContainerStyle: {
    paddingTop: 0.125 * width,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  nameStyle: {
    fontSize: 20,
    fontFamily: 'avenir_medium',
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
    fontFamily: 'avenir_heavy',
    paddingTop: 10,
    paddingRight: 15,
    fontSize: 14,
    color: '#909094',
  },
  titleTextStyle: {
    paddingTop: 10,
    paddingLeft: 15,
    fontFamily: 'avenir_heavy',
    fontSize: 14,
    paddingBottom: 5,
    color: colors.primary.light,
  },
  textInputStyle: {
    width: 0.85 * width,
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

export default connect(mapStateToProps, { updateUser })(TeacherSetup);
