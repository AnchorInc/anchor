import React from 'react';
import { Text, View, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

const SubjectDetail = ({ subject, onPress }) => {
  return (
    <View style={styles.containerStyle}>
      <TouchableOpacity onPress={onPress} style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
        <View style={styles.iconContainerStyle}>
          <Icon name="run" size={24} />
        </View>
        <View style={styles.textContainerStyle}>
          <Text style={styles.subjectStyle}>{subject.Subject}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  iconContainerStyle: {
    width: 0.15 * width,
    height: 0.15 * width,
    borderRadius: (0.15 * width) / 2,
    backgroundColor: '#d5d5d5',
    paddingLeft: 5,
    paddingRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subjectStyle: {
    fontSize: 16,
    fontFamily: 'avenir_roman',
    color: '#000',
    paddingBottom: 5,
  },
  textContainerStyle: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: 40,
    padding: 10,
  },
  containerStyle: {
    flexDirection: 'row',
    width,
    alignItems: 'center',
    padding: 10,
    flex: 1,
  },
};

export { SubjectDetail };
