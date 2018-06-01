import React from 'react';
import { Text, Image, View, Dimensions, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { colors } from '../../config';
import { Card, CardSection, TouchableDebounce, PopupMenu } from './';

const { width } = Dimensions.get('window');

const ClassDetail = ({ person, onPress }) => {
    return (
      <Card style={{ flex: 1, flexDirection: 'row' }}>
        <CardSection style={{ borderRadius: 10 }}>
          <View style={styles.textContainerStyle}>
            <Icon style={{ paddingLeft: 10 }} name='more-vert' size={24} color='white' />
            <Text style={styles.nameStyle}>{person.displayName}</Text>
            <PopupMenu color='black' actions={['Contact']} onPress={() => console.log('contact pressed')} />
          </View>
          <View style={styles.headerStyle} />
          <TouchableDebounce style={styles.containerStyle} onPress={onPress.bind(this, person)}>
            <Image style={styles.profileStyle} source={{ uri: person.photoURL }} />
          </TouchableDebounce>
          <View style={{ width: 0.93 * width, height: 0.09 * width }} />
        </CardSection>
        <CardSection>
          <TouchableOpacity activeOpacity={0.5}>
            <LinearGradient colors={[colors.secondary.light, colors.secondary.normal]} style={styles.detailButtonStyle} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }}>
              <Text style={styles.detailsTextStyle}>
                See More
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </CardSection>
      </Card>
    );
};

const styles = {
  profileStyle: {
    height: 0.22 * width,
    width: 0.22 * width,
    borderRadius: 100,
    alignSelf: 'center',
    resizeMode: 'cover',
    elevation: 2,
  },
  containerStyle: {
    width: 0.22 * width,
    height: 0.22 * width,
    borderRadius: 100,
    backgroundColor: 'white',
    paddingLeft: 5,
    paddingRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    top: 65,
    position: 'absolute',
    elevation: 50,
  },
  nameStyle: {
    fontSize: 18,
    color: 'black',
    fontFamily: 'avenir_heavy',
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
    fontFamily: 'avenir_medium',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    paddingTop: 20,
    padding: 10,
  },
};

export { ClassDetail };
