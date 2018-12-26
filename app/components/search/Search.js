import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions, Platform } from 'react-native';
import algoliasearch from 'algoliasearch/reactnative';
import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';

import { algoliaConfig } from '../../config';
import { SearchBar, SearchDetail } from './';

const { width, height } = Dimensions.get('window');

class Search extends Component {
  state = {
    queryObj: '',
    teachers: [],
    rating: 3.5,
    multiSliderValue: [250, 1250],
    showSearchVal: false,
  };

  componentWillMount() {
    if (Platform.OS === 'android') AndroidKeyboardAdjust.setAdjustNothing();
  }

  onPress = (uid) => {
    console.log(uid);
    this.props.navigation.navigate('TeacherProfile', { uid, action: 'forum' });
  }

  requestData = (queryObj, rating, multiSliderValue) => {
    this.setState({ queryObj });
    const client = algoliasearch(algoliaConfig.adminID, algoliaConfig.apiKey);
    const index = client.initIndex('teachers');
    const query = {
      query: queryObj,
      filters: `rating >= ${rating} AND (price:${multiSliderValue[0]} TO ${multiSliderValue[1]})`,
    };
    if (queryObj === '') {
      this.setState({ showSearchVal: false, teachers: [] });
    } else {
      index.search(query, this.searchCallback.bind(this));
    }
  }

  searchCallback = (err, content) => {
    if (err) {
      console.error(err);
      return;
    }
    if (this.state.teachers !== content.hits) {
      this.setState({ teachers: content.hits });
    }
    console.log(content.hits);
  }

  updateRating = (rating) => {
    this.setState({ rating });
    this.requestData(this.state.queryObj, rating, this.state.multiSliderValue);
  }

  // renderSubjects = () => {
  //   if (this.state.subjects.length >= 1 && !this.state.showSearchVal) {
  //     return this.state.subjects.map(subject => <SubjectDetail key={subject.objectID} subject={subject} />);
  //   }
  //   return null;
  // }

  multiSliderValuesChange = (values) => {
    this.setState({
      multiSliderValue: values,
    });
    this.requestData(this.state.queryObj, this.state.rating, values);
  };

  renderTeachers = () => {
    if (this.state.teachers.length >= 1 && !this.state.showSearchVal) {
      return this.state.teachers.map(teacher => <SearchDetail key={teacher.uid} onPress={() => this.onPress(teacher.uid)} person={teacher} />);
    }
    return null;
  }

  render() {
    return (
      <View style={styles.containerStyle}>
        <SearchBar
          searchCallback={queryobj => this.requestData(queryobj, this.state.rating, this.state.multiSliderValue)}
          rkt="search"
          rating={this.state.rating}
          multiSliderValue={this.state.multiSliderValue}
          multiSliderValuesChange={this.multiSliderValuesChange}
          updateRating={this.updateRating}
        />
        <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps='always'>
          <Text style={styles.topResultTextStyle}>
            {this.state.teachers.length >= 1 ? 'Teachers' : ''}
          </Text>
          {this.renderTeachers()}
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    width,
    height,
    alignItems: 'center',
    flex: 1,
    marginTop: (Platform.OS === 'ios') ? height * 0.03 : 0,
  },
  topResultTextStyle: {
    fontSize: 22,
    padding: 10,
    color: 'black',
    alignSelf: 'center',
    fontFamily: 'AvenirLTStd-Heavy',
  },
};

export { Search };
