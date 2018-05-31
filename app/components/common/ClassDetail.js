import React from 'react';
import { Text, Image, View, Dimensions, TouchableOpacity } from 'react-native';

// import { colors } from '../../config';
import { Card, CardSection } from './';

const { width } = Dimensions.get('window');

const ClassDetail = ({ person, onPress }) => {
    return (
      <View>
        <Card style={{ flex: 1, flexDirection: 'row' }}>
          <CardSection>
            <View style={styles.textContainerStyle}>
              <Text style={styles.nameStyle}>{person.displayName}</Text>
            </View>
            <View style={styles.headerStyle} />
            <TouchableOpacity style={styles.containerStyle} onPress={onPress.bind(this, person)}>
              <Image style={styles.profileStyle} source={{ uri: person.photoURL }} />
            </TouchableOpacity>
            <View style={{ width: 0.93 * width, height: 0.09 * width }} />
          </CardSection>
          <CardSection>
            <TouchableOpacity style={styles.detailButtonStyle} />
          </CardSection>
        </Card>
      </View>
    );
};

const styles = {
  profileStyle: {
    height: 0.2 * width,
    width: 0.2 * width,
    borderRadius: 100,
    alignSelf: 'center',
    resizeMode: 'cover',
  },
  containerStyle: {
    width: 0.21 * width,
    height: 0.21 * width,
    borderRadius: 100,
    backgroundColor: 'white',
    paddingLeft: 5,
    paddingRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    top: 75,
    position: 'absolute',
  },
  nameStyle: {
    fontSize: 18,
    color: 'black',
    fontFamily: 'avenir_heavy',
    paddingBottom: 5,
  },
  headerStyle: {
    width: 0.936 * width,
    height: 0.25 * width,
    borderRadius: 8,
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsTextStyle: {
    fontSize: 14,
    color: 'white',
    fontFamily: 'avenir_book',
    paddingBottom: 5,
  },
  detailButtonStyle: {
    width: 0.96 * width,
    height: 45,
    backgroundColor: '#056ae4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    paddingTop: 20,
  },
};

export { ClassDetail };
