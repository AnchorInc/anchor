import React, { Component } from 'react';
import { Text, TextInput, TouchableWithoutFeedback, TouchableOpacity, View, Dimensions, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { MAIN_COLOR } from '../../config';

const { width, height } = Dimensions.get('window');

class SearchBar extends Component {

  state = { search: false, editingInput: false };

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

  showClearTextButton = () => {
    if (this.state.editingInput) {
      return (
        <TouchableOpacity onPress={() => {
          this.searchBar.clear();
          this.setState({ editingInput: false });
          this.props.searchCallback('');
          }}
        >
          <Icon size={24} name="close" color='#4f5d6d' style={styles.iconStyle} />
        </TouchableOpacity>
      );
    }
    return null;
  }

  showSearchBar = () => {
    if (this.state.search) {
      return (
        <View style={styles.containerStyle}>
          <TouchableOpacity onPress={() => { this.setState({ search: false, editingInput: false }); this.props.searchCallback(''); }}>
            <Icon size={24} name="keyboard-backspace" color='#4f5d6d' style={styles.iconStyle} />
          </TouchableOpacity>
          <TextInput style={styles.inputStyle} placeholder="Search" placeholderTextColor='#4f5d6d' underlineColorAndroid='transparent' autoCapitalize='words' onChangeText={this.onChangeText} returnKeyType={this.props.rkt} autoFocus ref={(ref) => { this.searchBar = ref; }} />
          {this.showClearTextButton()}
        </View>
      );
    }
    return (
      <TouchableWithoutFeedback onPress={() => this.setState({ search: true })}>
        <View style={styles.searchContainerStyle} backgroundColor={MAIN_COLOR}>
          <View style={styles.searchBoxStyle} backgroundColor='#02254e'>
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#02254e',
    width,
    height: 62,
  },
  inputStyle: {
    width: 0.75 * width,
    alignSelf: 'center',
    padding: 10,
    fontFamily: 'avenir_heavy',
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
    height: 0.06 * height,
    width: 0.96 * width,
    padding: 10,
    borderRadius: 4,
    flexDirection: 'row',
  },
  searchTextStyle: {
    fontFamily: 'avenir_heavy',
    fontSize: 20,
    color: '#4f5d6d',
  },
  searchContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: (Platform.OS === 'ios' ? 52 : 62),
    width,
  },
};

export { SearchBar };
