import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';

class TouchableDebounce extends Component {
  state = { disabled : false};
  render() {
    return (
      <TouchableOpacity
        style={this.props.style}
        activeOpacity={this.props.activeOpacity}
        disabled={this.state.disabled}
        onPress={() => {
            this.props.onPress()
            this.setState({ disabled: true })
          }
        }
      >
        {this.props.children}
      </TouchableOpacity>
    );
  }
}

export { TouchableDebounce };
