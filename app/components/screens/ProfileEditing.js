import React, { Component } from 'react';
import { View, Dimensions, TouchableOpacity, Image, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Header, Cover, Input } from '../common';
import { DARK_GRAY } from '../../config';
import { updateUser } from '../../actions';

const { width } = Dimensions.get('window');

class ProfileEditing extends Component {
  updateUser = (user) => {
    this.props.updateUser(user);
  }

  render() {
    return (
      <View>
        <Header title={this.props.user.displayName} prefButtons onPress={() => this.props.navigation.goBack()} />
        <Cover url={this.props.user.photoURL} header={this.props.user.header} updateUser={this.updateUser} />
        <Image source={{ uri: this.props.user.photoURL }} style={styles.profileStyle} />
        <TouchableOpacity style={styles.profileStyle} onPress={() => console.log('editing photo')}>
          <View style={{ width: 32, height: 32, backgroundColor: DARK_GRAY, alignItems: 'center', justifyContent: 'center', borderRadius: 16 }}>
            <Icon name='pencil' size={22} color='white' />
          </View>
        </TouchableOpacity>
        <View style={{ height: 70 }} />
        <ScrollView>
          <Input placeholder='Name' cb={() => console.log('name')} defaultVal={this.props.user.displayName} />
          <Input placeholder='Email' cb={() => console.log('email')} defaultVal={this.props.user.email} />
          <Input placeholder='Phone' cb={() => console.log('phone')} defaultVal={this.props.user.phone} />
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  coverStyle: {
    height: 194,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  profileStyle: {
    width: 0.24 * width,
    height: 0.24 * width,
    borderRadius: (0.24 * width) / 2,
    paddingLeft: 5,
    paddingRight: 5,
    alignSelf: 'center',
    top: 204,
    position: 'absolute',
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
