import React, { Component } from 'react';
import { View, Text, Dimensions, Platform, StatusBar, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { HeaderProfileButton } from './';
import { MAIN_COLOR, STATUS_BAR_COLOR } from '../../config/';

const { width, height } = Dimensions.get('window');

class Header extends Component {
  renderMainButtons() {
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

  renderPrefButtons() {
    if (this.props.prefButtons) {
      return (
        <View style={styles.buttonContainerStyle}>
          <TouchableOpacity>
            <Icon name='check' color='white' size={24} />
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  }

  render() {
    return (
      <View>
        <StatusBar
          backgroundColor={STATUS_BAR_COLOR}
        />
        <View style={styles.containerStyle} backgroundColor={MAIN_COLOR}>
          <Text style={styles.headerStyle}>
            {this.props.title}
          </Text>
          {this.renderMainButtons()}
          {this.renderPrefButtons()}
        </View>
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    justifyContent: 'space-between',
    alignContent: 'center',
    height: 0.08 * height,
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
    paddingTop: 0.25 * 0.07 * height,
    paddingRight: 0.05 * width,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
};

export { Header };
