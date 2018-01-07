import React, { Component } from 'react';
import { Text, TextInput, TouchableWithoutFeedback, TouchableOpacity, View, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../config';

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
          <TouchableOpacity onPress={() => { this.setState({ search: false, editingInput: false }); this.props.searchCallback(''); }}>
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
      <TouchableWithoutFeedback onPress={() => this.setState({ search: true })}>
        <View style={styles.searchContainerStyle} backgroundColor={colors.primary.normal}>
          <View style={styles.searchBoxStyle} backgroundColor={colors.primary.light}>
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
    backgroundColor: '#3e62f6',
    width,
    height: 0.09 * height,
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
    color: 'white',
  },
  searchContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 0.09 * height,
    width,
  },
};

export { SearchBar };
