import React, { Component } from 'react';
import { View, Text } from 'react-native';
import StarRating from 'react-native-star-rating';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

class FilterComponent extends Component {

  render() {
    return (
      <View style={{ alignSelf: 'center', alignItems: 'center' }}>
        <Text style={styles.textStyle}>{`Rating (${this.props.rating} Stars)`}</Text>
        <StarRating
          rating={this.props.rating}
          halfStarEnabled
          iconSet='MaterialCommunityIcons'
          emptyStar='star-outline'
          halfStar='star-half'
          halfStarColor='white'
          fullStarColor='white'
          emptyStarColor='white'
          starSize={25}
          selectedStar={rating => this.props.updateRating(rating)}
        />
        <Text style={styles.textStyle}>{`Price (${this.props.multiSliderValue[0]} - ${this.props.multiSliderValue[1]})`}</Text>
        <MultiSlider
          values={[
            this.props.multiSliderValue[0],
            this.props.multiSliderValue[1],
          ]}
          sliderLength={280}
          onValuesChange={this.props.multiSliderValuesChange}
          min={150}
          max={1500}
          step={25}
          snapped
        />
      </View>
    );
  }
}

const styles = {
  textStyle: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'AvenirLTStd-Heavy',
    padding: 10,
  },
};

export { FilterComponent };
