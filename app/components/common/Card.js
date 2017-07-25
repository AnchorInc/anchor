import React from 'react';
import { View } from 'react-native';

const Card = ({ children }) => {
  return (
    <View style={styles.containerStyle}>
      {children}
    </View>
  );
};

const styles = {
  containerStyle: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 8,
    marginRight: 8,
    marginTop: 10,
  },
};

export { Card };
