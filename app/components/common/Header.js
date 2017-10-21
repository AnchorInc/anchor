import React, { Component } from 'react';
import { View, Text, Dimensions, Platform, StatusBar, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HeaderProfileButton from './HeaderProfileButton';
import { MAIN_COLOR, STATUS_BAR_COLOR } from '../../config/';

const { width } = Dimensions.get('window');

class Header extends Component {

  handleChangeText = () => {
    this.props.handleChangeText(this.searchBar.getValue());
  }

  renderMainButtons = () => {
    if (this.props.mainButtons) {
      return (
        <View style={styles.buttonContainerStyle}>
          <TouchableOpacity>
            <Icon name='forum' color='white' size={24} style={{ paddingRight: 20 }} />
          </TouchableOpacity>
          <HeaderProfileButton onPress={this.props.onPress} />
        </View>
      );
    }
    return null;
  }

  renderPrefBackButton = () => {
    if (this.props.showPrefBackButton) {
      return (
        <TouchableOpacity style={{ paddingRight: 10 }} onPress={this.props.prefBackButton}>
          <Icon name='arrow-left' color='white' size={24} />
        </TouchableOpacity>
      );
    }
    return null;
  }

  renderPrefNextButton = () => {
    if (this.props.showPrefNextButton) {
      return (
        <TouchableOpacity onPress={this.props.prefNextButton}>
          <Icon name='arrow-right' color='white' size={24} />
        </TouchableOpacity>
      );
    }
    return null;
  }

  renderPrefDoneButton = () => {
    if (this.props.showPrefDoneButton) {
      return (
        <TouchableOpacity onPress={this.props.prefDoneButton}>
          <Icon name='check' color='white' size={24} />
        </TouchableOpacity>
      );
    }
    return null;
  }

  renderPrefButtons = () => {
    if (this.props.prefButtons) {
      return (
        <View style={styles.buttonContainerStyle}>
          {this.renderPrefBackButton()}
          {this.renderPrefNextButton()}
          {this.renderPrefDoneButton()}
        </View>
      );
    }
    return null;
  }

  renderTitle = () => {
    return (
      <Text style={styles.headerStyle}>
        {this.props.title}
      </Text>
    );
  }

  renderNormal = () => {
    return (
      <View style={styles.normalContainerStyle} backgroundColor={MAIN_COLOR}>
        {this.renderTitle()}
        {this.renderMainButtons()}
        {this.renderPrefButtons()}
      </View>
    );
  }

  render() {
    return (
      <View>
        <StatusBar backgroundColor={STATUS_BAR_COLOR} />
        {this.renderNormal()}
      </View>
    );
  }
}

const styles = {
  normalContainerStyle: {
    justifyContent: 'space-between',
    height: (Platform.OS === 'ios' ? 52 : 62),
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
