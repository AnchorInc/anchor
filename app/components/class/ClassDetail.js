import React, { Component } from 'react';
import {
 Text,
 Image,
 View,
 Dimensions,
 TouchableOpacity,
 LayoutAnimation,
 UIManager,
 Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import StarRating from 'react-native-star-rating';

import { colors } from '../../config';
import { Card, CardSection, TouchableDebounce } from '../../lib';

const { width } = Dimensions.get('window');

class ClassDetail extends Component {
  state = {
    buttonClicked: false,
  };

  componentDidMount() {
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true); // enables experimental animation features that are required
    }
  }

  _onPressMore = () => {
    LayoutAnimation.linear();
    this.setState({ buttonClicked: true });
  }

  _onPressBack = () => {
    LayoutAnimation.linear();
    this.setState({ buttonClicked: false });
  }

  render() {
    const teacher = this.props.batch;
    if (!this.state.buttonClicked) {
      return (
        <Card style={{ flex: 1, flexDirection: 'row' }}>
          <CardSection>
            <View style={styles.textContainerStyle}>
              <Icon style={{ paddingLeft: 11 }} color='white' name='dots-vertical' size={0} />
              <Text style={styles.nameStyle}>{teacher.displayName}</Text>
              <TouchableDebounce onPress={this.props.onPressContact.bind(this, teacher.teacherUID, teacher.displayName)}>
                <Icon name='dots-vertical' size={24} color='black' />
              </TouchableDebounce>
            </View>
            <View style={styles.headerStyle} />
            <TouchableDebounce style={styles.containerStyle} onPress={this.props.onPress.bind(this, teacher.teacherUID)}>
              <Image style={styles.profileStyle} source={{ uri: teacher.photoURL }} />
            </TouchableDebounce>
            <View style={{ width: 0.93 * width, height: 0.09 * width }} />
          </CardSection>
          <TouchableOpacity activeOpacity={0.3} onPress={() => this._onPressMore()}>
            <LinearGradient
              colors={[colors.secondary.light, colors.secondary.normal]}
              style={styles.detailButtonStyle}
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.moreTextStyle}>
                See More
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </Card>
      );
    } return (
      <Card style={{ flex: 1, flexDirection: 'row' }}>
        <CardSection>
          <LinearGradient
            colors={[colors.secondary.light, colors.secondary.normal]}
            style={styles.seeMoreStyle}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
          >
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                padding: 15,
                }}
              onPress={() => this._onPressBack()}
            >
              <Icon name='arrow-left' size={24} color='white' />
            </TouchableOpacity>
            <Text style={styles.detailsTextStyle}>
              {teacher.subject}
            </Text>
            <Text style={styles.detailsTextStyle}>
              {teacher.time}
            </Text>
            <Text style={styles.detailsTextStyle}>
              {teacher.place}
            </Text>
          </LinearGradient>
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  profileStyle: {
    height: 0.25 * width,
    width: 0.25 * width,
    borderRadius: (0.25 * width) / 2,
    alignSelf: 'center',
    resizeMode: 'cover',
  },
  seeMoreStyle: {
    width: 0.96 * width,
    height: (0.58 * width),
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerStyle: {
    width: 0.25 * width,
    height: 0.25 * width,
    borderRadius: 100,
    backgroundColor: 'white',
    paddingLeft: 5,
    paddingRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    top: 60,
    position: 'absolute',
  },
  nameStyle: {
    fontSize: 18,
    color: 'black',
    fontFamily: 'AvenirLTStd-Heavy',
  },
  headerStyle: {
    width: 0.936 * width,
    height: 0.25 * width,
    borderRadius: 8,
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreTextStyle: {
    fontSize: 14,
    color: 'white',
    fontFamily: 'AvenirLTStd-Medium',
    paddingBottom: 0,
  },
  detailsTextStyle: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'AvenirLTStd-Heavy',
    paddingBottom: 10,
    textAlign: 'center',
  },
  detailButtonStyle: {
    width: 0.96 * width,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    padding: 15,
  },
};

export { ClassDetail };
