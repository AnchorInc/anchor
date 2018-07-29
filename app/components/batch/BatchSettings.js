import React, { Component } from 'react';
import {
  Dimensions,
  ScrollView,
  View,
  StatusBar,
  Text,
  Button,
  Picker,
  TimePickerAndroid,
} from 'react-native';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import { TextField } from 'react-native-material-textfield';
import RNGooglePlaces from 'react-native-google-places';
import moment from 'moment';

import { FAB } from '../../lib/FAB';
import { TouchableDebounce } from '../../lib';
import { colors, userTypes } from '../../config';

const { width, height } = Dimensions.get('window');

class BatchSettings extends Component {
  state = {
    teacher: null,
    batch: {
      location: null,
      size: null,
      maxSize: null,
      day: 'Sunday',
      startTime: null,
      endTime: null,
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
      this.setState((prevState, props) => {
        let newState = prevState;
        newState.batch.location = place;
        return newState;
      });
    }).catch(error => console.log('Google Places Place Picker Error:', error));
  }

  pickStartTime = () => {
    TimePickerAndroid.open().then((data) => {
      if (data.action === 'timeSetAction') {
        this.setState((prevState, props) => {
          let newState = prevState;
          newState.batch.startTime = new Date(1970, 1, 1, data.hour, data.minute) ;
          return newState;
        });
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  pickEndTime = () => {
    TimePickerAndroid.open().then((data) => {
        if (data.action === 'timeSetAction') {
          this.setState((prevState, props) => {
            let newState = prevState;
            newState.batch.endTime = new Date(1970, 1, 1, data.hour, data.minute) ;
            return newState;
          });
        }
    }).catch((err) => {
      console.log(err);
    });
  }

  showStartTime = () => {
    if (this.state.batch.startTime) {
      return (<Text style={{ ...styles.containerStyle, marginTop: 15, marginLeft: 15 }}>
        {moment(this.state.batch.startTime).format('LT')}
      </Text>);
    }
    return null;
  }

  showEndTime = () => {
    if (this.state.batch.endTime) {
      return (<Text style={{ ...styles.containerStyle, marginTop: 15, marginLeft: 15 }}>
        {moment(this.state.batch.endTime).format('LT')}
      </Text>);
    }
    return null;
  }

  displayLocation = () => {
    if (this.state.batch.location) {
      return <Text style={{ ...styles.containerStyle, marginTop: 15, marginLeft: 15 }}>{this.state.batch.location.address}</Text>;
    }
    return null;
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
          <View style={{ ...styles.containerStyle, margin: 15 }}>
            <TouchableDebounce
              containerStyle={styles.textInputStyle}
              style={styles.iconStyle}
              onPress={this.setLocation}
            >
              <Button
                style={styles.containerStyle}
                onPress={this.setLocation}
                title="Set Location"
              />
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
            <Picker
              selectedValue={this.state.batch.day}
              style={{ height: 50, width: 200 }}
              onValueChange={(itemValue, itemIndex) => this.setState((prevState, props) => {
                let newState = prevState;
                newState.batch.day = itemValue;
                return newState;
              })}
            >
              <Picker.Item label="Sunday" value="Sunday" />
              <Picker.Item label="Monday" value="Monday" />
              <Picker.Item label="Tuesday" value="Tuesday" />
              <Picker.Item label="Wednesday" value="Wednesday" />
              <Picker.Item label="Thursday" value="Thursday" />
              <Picker.Item label="Saturday" value="Friday" />
              <Picker.Item label="Saturday" value="Saturday" />
            </Picker>
            <Button
              style={styles.containerStyle}
              onPress={this.pickStartTime}
              title="Choose Start Time"
            />
            {this.showStartTime()}
            <Button
              style={styles.containerStyle}
              onPress={this.pickEndTime}
              title="Choose End Time"
            />
            {this.showEndTime()}
          </View>
        </ScrollView>
        <FAB icon='save' onPress={this.save} />
      </View>
    );
  }
}
const styles = {
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
