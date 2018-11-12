import React, { Component } from 'react';
import { Text, TextInput, TouchableWithoutFeedback, TouchableOpacity, View, Dimensions, UIManager, LayoutAnimation, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { colors } from '../../config';

const { width } = Dimensions.get('window');

class SearchBar extends Component {

  state = { search: false, editingInput: false, buttonClicked: false };

  componentDidMount() {
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  componentWillReceiveProps() {
    this.searchBar.focus();
  }

  onChangeText = (input) => {
    if (input !== '') {
      this.setState({ editingInput: true });
    } else {
      this.setState({ editingInput: false });
    }
    this.props.searchCallback(input);
  }

  _onPressMore = () => {
    LayoutAnimation.easeInEaseOut();
    this.setState({ search: true });
  }

  _onPressBack = () => {
    LayoutAnimation.easeInEaseOut();
    this.setState({ search: false, editingInput: false });
    this.props.searchCallback('');
  }

  showClearTextButton = () => {
    if (this.state.editingInput) {
      return (
        <TouchableOpacity onPress={() => {
          this.searchBar.clear();
          this.setState({ editingInput: false });
          this.props.searchCallback('');
          }}
        >
          <Icon size={24} name="close" color='white' style={styles.iconStyle} />
        </TouchableOpacity>
      );
    }
    return null;
  }

  showSearchBar = () => {
    if (this.state.search) {
      return (
        <View style={styles.containerStyle}>
          <TouchableOpacity onPress={() => this._onPressBack()}>
            <Icon size={24} name="keyboard-backspace" color='white' style={styles.iconStyle} />
          </TouchableOpacity>
          <TextInput
            style={styles.inputStyle}
            placeholder="Search"
            placeholderTextColor='white'
            underlineColorAndroid='transparent'
            autoCapitalize='words'
            onChangeText={this.onChangeText}
            returnKeyType={this.props.rkt}
            ref={(ref) => { this.searchBar = ref; }}
            selectionColor={'white'}
            autoFocus
          />
          {this.showClearTextButton()}
        </View>
      );
    }
    return (
      <TouchableWithoutFeedback onPress={() => this._onPressMore()}>
        <View style={styles.searchContainerStyle} backgroundColor={colors.primary.normal}>
          <View style={styles.searchBoxStyle} backgroundColor='#232fa8'>
            <Text style={styles.searchTextStyle}>
              Search
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  render() {
    return this.showSearchBar();
  }
}

const styles = {
  containerStyle: {
    paddingTop: (Platform.OS === 'ios') ? 15 : 0,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#232fa8',
    width,
    height: 64,
  },
  inputStyle: {
    width: 0.75 * width,
    alignSelf: 'center',
    padding: 10,
    fontFamily: 'AvenirLTStd-Heavy',
    fontSize: 20,
    color: 'white',
  },
  iconStyle: {
    alignSelf: 'center',
    padding: 10,
  },
  searchBoxStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 44,
    width: 0.96 * width,
    padding: 10,
    borderRadius: 4,
    flexDirection: 'row',
  },
  searchTextStyle: {
    fontFamily: 'AvenirLTStd-Heavy',
    fontSize: 20,
    color: 'white',
  },
  searchContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 64,
    width,
  },
};

export { SearchBar };
