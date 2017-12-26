import React, { Component } from 'react';
import { Dimensions, View } from 'react-native';
import { colorsFromUrl } from 'react-native-dominant-color';
import { MAIN_COLOR } from '../../config/';

const { width, height } = Dimensions.get('window');

class Cover extends Component {
  componentWillMount() {
    if (!this.props.header) {
      colorsFromUrl(this.props.url, (err, colors) => {
        if (!err) {
          this.props.updateUser({ header: colors.vibrantColor });
        }
      });
    }
  }

  render() {
    return (
      <View style={[styles.coverStyle, { backgroundColor: this.props.header ? this.props.header : MAIN_COLOR }]} />
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
