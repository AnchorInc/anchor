import React, { Component } from 'react';
import {
  StatusBar, Text, TextInput, TouchableWithoutFeedback, TouchableOpacity,
  View, Dimensions, UIManager, LayoutAnimation, Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { colors } from '../../config';
import { FilterComponent } from '.';

const { width } = Dimensions.get('window');
class SearchBar extends Component {
  state = {
    search: false,
    editingInput: false,
    containerHeight: 64,
  };

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
    this.setState({
      search: false,
      editingInput: false,
      containerHeight: 64,
      renderFilterMenu: false,
    });
    this.props.searchCallback('');
  }

  showClearTextButton = () => {
    if (this.state.editingInput) {
      return (
        <TouchableOpacity onPress={() => {
          this.searchBar.clear();
          this.setState({ editingInput: false, containerHeight: 64, renderFilterMenu: false });
          this.props.searchCallback('');
          }}
        >
          <Icon size={24} name="close" color='white' style={styles.iconStyle} />
        </TouchableOpacity>
      );
    }
    return null;
  }

  showFilterButton = () => {
    if (this.state.editingInput) {
      return (
        <TouchableOpacity onPress={() => {
          LayoutAnimation.linear();
          const toggleHeight = (this.state.containerHeight === 64) ? 200 : 64;
          this.setState({ containerHeight: toggleHeight, renderFilterMenu: !this.state.renderFilterMenu });
        }}
        >
          <Icon size={24} name="filter-variant" color='white' style={styles.iconStyle} />
        </TouchableOpacity>
      );
    }
    return null;
  }

  showSearchBar = () => {
    if (this.state.search) {
      return (
        <View style={[styles.containerStyle, { height: this.state.containerHeight }]}>
          <StatusBar />
          <View style={{
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexDirection: 'row',
            paddingTop: 5,
            paddingLeft: 2,
            }}
          >
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
              selectionColor='white'
              autoFocus
            />
            {this.showFilterButton()}
            {this.showClearTextButton()}
          </View>
          {this.renderFilterMenu()}
        </View>
      );
    }
    return (
      <View>
        <StatusBar />
        <TouchableWithoutFeedback onPress={() => this._onPressMore()}>
          <View style={styles.searchContainerStyle} backgroundColor={colors.primary.normal}>
            <View style={styles.searchBoxStyle} backgroundColor='#232fa8'>
              <Text style={styles.searchTextStyle}>
                Search
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }

  renderFilterMenu = () => {
    if (this.state.renderFilterMenu) {
      return <FilterComponent rating={this.props.rating} multiSliderValue={this.props.multiSliderValue} multiSliderValuesChange={this.props.multiSliderValuesChange} updateRating={this.props.updateRating} />;
    } return null;
  }

  render() {
    return this.showSearchBar();
  }
}

const styles = {
  containerStyle: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'column',
    backgroundColor: '#232fa8',
    width,
  },
  inputStyle: {
    width: 0.65 * width,
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
