import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../config';

const { width } = Dimensions.get('window');

const ListDetail = ({ title, value }) => {
  return (
    <View style={styles.containerStyle}>
      <Text style={styles.titleTextStyle}>
        {title}
      </Text>
      <Text style={styles.valueTextStyle}>
        {value}
      </Text>
      <View style={{ width, height: StyleSheet.hairlineWidth, backgroundColor: '#b5b5b5' }} />
    </View>
  );
};

const styles = {
  titleTextStyle: {
    fontFamily: 'avenir_heavy',
    fontSize: 14,
    paddingBottom: 5,
    color: colors.primary.light,
  },
  valueTextStyle: {
    fontFamily: 'avenir_medium',
    fontSize: 16,
    color: 'black',
    paddingBottom: 4,
  },
  containerStyle: {
    padding: 10,
    paddingLeft: 15,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
};

export { ListDetail };
