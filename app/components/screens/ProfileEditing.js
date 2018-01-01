import React, { Component } from 'react';
import { View, Dimensions, TouchableOpacity, Image, ScrollView, Text, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Input } from '../common';
import { MAIN_COLOR } from '../../config';
import { updateUser } from '../../actions';

const { width, height } = Dimensions.get('window');

class ProfileEditing extends Component {
  updateUser = (user) => {
    this.props.updateUser(user);
  }

  renderEditableFields = () => {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.cardStyle}>
          <Text style={styles.nameStyle}>
            Edit Your Profile Pic
          </Text>
          <View style={styles.cardSectionStyle}>
            <TouchableOpacity onPress={() => console.log('editing profile pic')}>
              <Image source={{ uri: this.props.user.photoURL }} style={styles.imageStyle} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.cardStyle}>
          <Text style={styles.nameStyle}>
            Name
          </Text>
          <View style={styles.cardSectionStyle}>
            <Input
              placeholder='Name'
              defaultVal={this.props.user.displayName}
            />
          </View>
        </View>
        <View style={styles.cardStyle}>
          <Text style={styles.nameStyle}>
            Email
          </Text>
          <View style={styles.cardSectionStyle}>
            <Input
              placeholder='Email'
              defaultVal={this.props.user.email}
            />
          </View>
        </View>
        <View style={styles.cardStyle}>
          <Text style={styles.nameStyle}>
            Phone
          </Text>
          <View style={styles.cardSectionStyle}>
            <Input
              placeholder='Phone'
              defaultVal={this.props.user.phone}
            />
          </View>
        </View>
      </ScrollView>
    );
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <StatusBar />
        <View style={styles.containerStyle}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Icon name='arrow-left' size={24} style={styles.buttonStyle} />
          </TouchableOpacity>
          <Text style={styles.headerStyle}>
            Edit Your Profile
          </Text>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Icon name='check' size={24} style={styles.buttonStyle} />
          </TouchableOpacity>
        </View>
        {this.renderEditableFields()}
      </View>
    );
  }
}

const styles = {
  cardStyle: {
    backgroundColor: MAIN_COLOR,
    borderRadius: 4,
    marginTop: 15,
    marginBottom: 15,
    paddingTop: 30,
    paddingLeft: 5,
    paddingRight: 5,
    alignItems: 'center',
  },
  cardSectionStyle: {
    paddingLeft: 6,
    paddingRight: 6,
    paddingBottom: 30,
    paddingTop: 15,
    position: 'relative',
  },
  containerStyle: {
    backgroundColor: MAIN_COLOR,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width,
    height: height * 0.08,
    alignItems: 'center',
  },
  imageStyle: {
    width: 0.24 * width,
    height: 0.24 * width,
    borderRadius: (0.24 * width) / 2,
  },
  headerStyle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 22,
  },
  buttonStyle: {
    color: 'white',
    justifyContent: 'flex-start',
  },
  nameStyle: {
    color: 'white',
    fontSize: 18,
  },
};

const mapStateToProps = (state) => {
  let user;
  if (state.user.user) {
    user = state.user.user;
  }
  return { user };
};

export default connect(mapStateToProps, { updateUser })(ProfileEditing);
