import React from 'react';
import { View } from 'react-native';

const CardSection = ({ children }) => {
  return (
    <View style={styles.sectionStyle}>
      { children }
    </View>
  );
};

const styles = {
  sectionStyle: {
    padding: 5,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    position: 'relative',
  },
};

export default CardSection;
