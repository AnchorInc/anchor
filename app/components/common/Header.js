import React, { Component } from 'react';
import { View, Text, Dimensions, Platform, StatusBar, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HeaderProfileButton from './HeaderProfileButton';
import { MAIN_COLOR } from '../../config/';

const { width, height } = Dimensions.get('window');

class Header extends Component {

  handleChangeText = () => {
    this.props.handleChangeText(this.searchBar.getValue());
  }

  renderButtons = () => {
    if (!this.props.mainButtons) {
      return null;
    }
    return (
      <View style={styles.buttonContainerStyle}>
        <TouchableOpacity>
          <Icon name='forum' color='white' size={24} style={{ paddingRight: 20 }} />
        </TouchableOpacity>
        <HeaderProfileButton onPress={this.props.onPress} />
      </View>
    );
  }

  renderTitle = () => {
    return (
      <Text style={styles.headerStyle}>
        {this.props.title}
      </Text>
    );
  }

  renderHeader = () => {
    return (
      <View style={styles.normalContainerStyle} backgroundColor={MAIN_COLOR}>
        {this.renderTitle()}
        {this.renderButtons()}
      </View>
    );
  }

  render() {
    return (
      <View>
        <StatusBar />
        {this.renderHeader()}
      </View>
    );
  }
}

const styles = {
  normalContainerStyle: {
    justifyContent: 'space-between',
    height: 0.09 * height,
    paddingTop: (Platform.OS === 'ios') ? 15 : 0,
    flexDirection: 'row',
  },
  headerStyle: {
    fontSize: 20,
    fontFamily: 'avenir_heavy',
    color: 'white',
    paddingLeft: 0.05 * width,
    alignSelf: 'center',
  },
  buttonContainerStyle: {
    paddingRight: 0.05 * width,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignSelf: 'center',
  },
};

export { Header };
