import React, { Component } from 'react';
import {
  Dimensions,
  ScrollView,
  View,
  StatusBar,
  Text,
} from 'react-native';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import { TextField } from 'react-native-material-textfield';
import RNGooglePlaces from 'react-native-google-places';

import { FAB } from '../../lib/FAB';
import { TouchableDebounce, Card, CardSection } from '../../lib';
import { colors, userTypes } from '../../config';

const { width, height } = Dimensions.get('window');

class BatchSettings extends Component {
  state = {
    teacher: null,
    batch: {
      location: null,
      size: null,
      maxSize: null,
      times: {
        Sunday: null,
        Monday: null,
        Tuesday: null,
        Wednesday: null,
        Thursday: null,
        Friday: null,
        Saturday: null,
      },
    },
  };

  componentWillMount() {
    if (this.props.user.type === userTypes.STUDENT) {
      console.log('Student Batch Settings not yet implemented');
      // this.getTeacher();
    } else {
      this.setState({ teacher: this.props.user });
    }
  }

  setLocation = () => {
    RNGooglePlaces.openPlacePickerModal().then((place) => {
      console.log(place);
    }).catch(error => console.log('Google Places Place Picker Error:', error));
  }

  displayLocation = () => {
    if (this.props.location) {
      return <Text>Location</Text>;
    }
    return <View />;
  }

  save = () => {
    console.log('Saving Batch!');
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor={colors.primary.dark} />
        <ScrollView
          keyboardShouldPersistTaps='always'
          contentContainerStyle={{ paddingBottom: 15 }}
        >
          {this.displayLocation()}
          <View style={styles.containerStyle}>
            <TouchableDebounce
              containerStyle={styles.textInputStyle}
              style={styles.iconStyle}
              onPress={this.setLocation}
            >
              <Card>
                <CardSection>
                  <Text style={styles.button}>
                    Set Location
                  </Text>
                </CardSection>
              </Card>
            </TouchableDebounce>
            <TextField
              containerStyle={styles.textInputStyle}
              label='Maximum Size'
              value={this.state.maxSize}
              keyboardType='numeric'
              returnKeyType='next'
              titleFontSize={14}
              // onChangeText={this.onChangeText}
              // onFocus={this.onFocus}
              // onBlur={this.onBlur}
              // onSubmitEditing={this.onSubmitFirstName}
              renderAccessory={this.showClearTextButton}
              ref={this.maxSizeRef}
              tintColor={colors.primary.light}
              // error={this.state.errors.firstName}
            />
          </View>
        </ScrollView>
        <FAB icon='save' onPress={this.save} />
      </View>
    );
  }
}
const styles = {
  cardHeaderStyle: {
    padding: 15,
    fontFamily: 'avenir_heavy',
    fontSize: 17,
    color: 'black',
  },
  textInputStyle: {
    width: 0.85 * width,
    paddingBottom: 0,
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

export default connect(mapStateToProps)(BatchSettings);
