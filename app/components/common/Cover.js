import React, { Component } from 'react';
import { Dimensions, View } from 'react-native';
import { colorsFromUrl } from 'react-native-dominant-color';

const { width, height } = Dimensions.get('window');

class Cover extends Component {
  state = {
    color: '#ffffff',
  };

  componentWillMount() {
    colorsFromUrl(this.props.url, (err, colors) => {
      if (!err) {
        this.setState({ color: colors.vibrantColor });
      }
    });
  }

  render() {
    return (
      <View style={[styles.coverStyle, { backgroundColor: this.state.color }]} />
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
