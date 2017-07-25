import React, { Component } from 'react';
import { Text, ScrollView, Dimensions, Image, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Card, CardSection } from '../common';

const { width } = Dimensions.get('window');

class Home extends Component {
  render() {
    return (
      <ScrollView>
        <Card>
          <CardSection>
            <Text style={{ fontSize: 25, fontFamily: 'avenir_heavy', color: '#000' }}>Westin Cooking Class</Text>
          </CardSection>
          <CardSection>
            <Image style={{ width: 0.93 * width, height: 0.7 * width, borderRadius: 4, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }} source={{ uri: 'https://img2.goodfon.com/wallpaper/big/6/19/android-5-0-lollipop-material-3638.jpg' }}>
              <Icon name='silverware-fork' size={50} color='#fff' padding={10} />
              <Icon name='silverware-spoon' size={50} color='#fff' padding={10} />
            </Image>
          </CardSection>
          <CardSection>
            <Text style={{ fontSize: 20, fontFamily: 'avenir_roman', color: '#bf3b3b' }}>Learn More</Text>
          </CardSection>
        </Card>

        <Card style={{ flex: 1, flexDirection: 'row' }}>
          <CardSection>
            <Text style={{ fontSize: 25, fontFamily: 'avenir_medium', color: '#000' }}>Guitar Teacher in Gachibowli</Text>
          </CardSection>
          <CardSection>
            <Image style={styles.headerStyle} source={{ uri: 'http://orig00.deviantart.net/d43e/f/2016/196/2/8/material_design_wallpaper_red_034_by_charlie_henson-daa22ts.png' }} />
            <View style={styles.containerStyle}>
              <Image style={styles.profileStyle} source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/anchorapp-feed3.appspot.com/o/man-14.png?alt=media&token=5181c70c-1310-4411-902e-415821685ffd' }} />
            </View>
            <View style={{ width: 0.93 * width, height: 0.09 * width }} />
          </CardSection>
          <CardSection>
            <View style={styles.textContainerStyle}>
              <Text style={styles.nameStyle}>Raghavendra</Text>
              <Text style={styles.classStyle}>Guitar</Text>
            </View>
          </CardSection>
        </Card>
      </ScrollView>
    );
  }
}


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
  nameStyle: {
    fontSize: 20,
    color: '#000',
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
  classStyle: {
    fontSize: 18,
    color: '#aaa',
  },
};

export { Home };
