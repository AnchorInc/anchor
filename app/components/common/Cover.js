import React, { Component } from 'react';
import { Dimensions, View } from 'react-native';
import { colorsFromUrl } from 'react-native-dominant-color';

const { width, height } = Dimensions.get('window');

class Cover extends Component {
  state = {
    color: '#ffffff',
  };

  componentWillMount() {
    if (!this.props.header) {
      colorsFromUrl(this.props.url, (err, colors) => {
        if (!err) {
          this.setState({ color: colors.vibrantColor });
        }
      });
      this.props.updateUser({ header: this.state.color });
    }
  }

  render() {
    return (
      <View style={[styles.coverStyle, { backgroundColor: this.props.header ? this.props.header : this.state.color }]} />
    );
  }
}

const styles = {
  coverStyle: {
    width,
    height: 0.25 * height,
  },
};

export { Cover };
