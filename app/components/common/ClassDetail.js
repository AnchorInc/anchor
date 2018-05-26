import React from 'react';
import { Text, Image, View, Dimensions, TouchableOpacity } from 'react-native';

import { colors } from '../../config';
import { Card, CardSection } from './';

const { width } = Dimensions.get('window');

const ClassDetail = ({ person, onPress }) => {
    return (
      <TouchableOpacity activeOpacity={1} onPress={onPress.bind(this, person)}>
        <Card style={{ flex: 1, flexDirection: 'row' }}>
          <CardSection>
            <View style={styles.headerStyle} />
            <View style={styles.containerStyle}>
              <Image style={styles.profileStyle} source={{ uri: person.photoURL }} />
            </View>
            <View style={{ width: 0.93 * width, height: 0.09 * width }} />
          </CardSection>
          <CardSection>
            <View style={styles.textContainerStyle}>
              <Text style={styles.classStyle}>{person.subject}</Text>
              <Text style={styles.nameStyle}>{person.displayName}</Text>
            </View>
          </CardSection>
        </Card>
      </TouchableOpacity>
    );
};

const styles = {
  profileStyle: {
    height: 0.17 * width,
    width: 0.17 * width,
    borderRadius: 100,
    alignSelf: 'center',
    resizeMode: 'cover',
  },
  containerStyle: {
    width: 0.18 * width,
    height: 0.18 * width,
    borderRadius: 100,
    backgroundColor: 'white',
    paddingLeft: 5,
    paddingRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    top: 65,
    position: 'absolute',
  },
  classStyle: {
    fontSize: 20,
    color: 'black',
    paddingBottom: 5,
  },
  headerStyle: {
    width: 0.93 * width,
    height: 0.25 * width,
    borderRadius: 4,
    flex: 2,
    backgroundColor: colors.primary.normal,
  },
  textContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  nameStyle: {
    fontSize: 18,
    color: '#aaa',
  },
};

export { ClassDetail };
