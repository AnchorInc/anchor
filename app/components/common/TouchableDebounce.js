import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import debounce from '../../debounceFunction';

class TouchableDebounce extends Component {
  render() {
    return (
      <TouchableOpacity
        style={this.props.style}
        activeOpacity={this.props.activeOpacity}
        onPress={
          debounce(() => {
          this.props.onPress();
        }, 200)
        }
      >
        {this.props.children}
      </TouchableOpacity>
    );
  }
}

export { TouchableDebounce };
