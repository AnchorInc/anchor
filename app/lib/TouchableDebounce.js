import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';

class TouchableDebounce extends Component {
  state = { disabled: false };
  componentWillMount() {
    this.setState({ disabled: false });
  }

  render() {
    return (
      <TouchableOpacity
        style={this.props.style}
        activeOpacity={this.props.activeOpacity}
        disabled={this.state.disabled}
        onPress={() => {
            this.props.onPress();
            this.setState({ disabled: true });
            setInterval(() => { this.setState({ disabled: false }); }, 500);
          }
        }
      >
        {this.props.children}
      </TouchableOpacity>
    );
  }
}

export { TouchableDebounce };
