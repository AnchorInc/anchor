import React from 'react';
import { Text, Image, View, Dimensions } from 'react-native';

import { PopupMenu, TouchableDebounce } from '../../lib';

const { width } = Dimensions.get('window');

const SearchDetail = ({ person, onPress }) => {
  return (
    <View style={styles.containerStyle}>
      <TouchableDebounce onPress={onPress} style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
        <View style={styles.profileContainerStyle}>
          <Image style={styles.profileStyle} source={{ uri: person.photoURL }} />
        </View>
        <View style={styles.textContainerStyle}>
          <Text style={styles.nameStyle}>{person.displayName}</Text>
          <Text style={styles.classStyle}>{person.subject}</Text>
        </View>
      </TouchableDebounce>
      <PopupMenu actions={['Contact']} onPress={() => console.log('pressed')} color='#888' />
    </View>
  );
};

const styles = {
  profileStyle: {
    height: 0.13 * width,
    width: 0.13 * width,
    borderRadius: (0.13 * width) / 2,
    alignSelf: 'center',
    resizeMode: 'cover',
  },
  profileContainerStyle: {
    width: 0.15 * width,
    height: 0.15 * width,
    borderRadius: (0.15 * width) / 2,
    backgroundColor: '#d5d5d5',
    paddingLeft: 5,
    paddingRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameStyle: {
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
  classStyle: {
    fontSize: 14,
    color: '#888',
    paddingBottom: 5,
  },
  containerStyle: {
    flexDirection: 'row',
    width,
    alignItems: 'center',
    padding: 10,
    flex: 1,
  },
};

export { SearchDetail };
