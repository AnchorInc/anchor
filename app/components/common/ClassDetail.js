import React from 'react';
import { Text, Image, View, Dimensions, TouchableOpacity } from 'react-native';
import { Card, CardSection } from './';


const { width } = Dimensions.get('window');

const ClassDetail = ({ person, onPress }) => {
    return (
      <TouchableOpacity onPress={onPress.bind(this, person)}>
        <Card style={{ flex: 1, flexDirection: 'row' }}>
          <CardSection>
            <Image style={styles.headerStyle} source={{ uri: person.Header }} />
            <View style={styles.containerStyle}>
              <Image style={styles.profileStyle} source={{ uri: person.Profile }} />
            </View>
            <View style={{ width: 0.93 * width, height: 0.09 * width }} />
          </CardSection>
          <CardSection>
            <View style={styles.textContainerStyle}>
              <Text style={styles.classStyle}>{person.Subject}</Text>
              <Text style={styles.nameStyle}>{person.Name}</Text>
            </View>
          </CardSection>
        </Card>
      </TouchableOpacity>
    );
};

const styles = {
  profileStyle: {
    height: 0.13 * width,
    width: 0.13 * width,
    alignSelf: 'center',
    resizeMode: 'cover',
  },
  containerStyle: {
    width: 0.18 * width,
    height: 0.18 * width,
    borderRadius: (0.18 * width) / 2,
    backgroundColor: '#d5d5d5',
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
