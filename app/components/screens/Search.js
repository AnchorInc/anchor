import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import algoliasearch from 'algoliasearch/reactnative';

import { algoliaConfig } from '../../config';
import { SearchBar, SearchDetail, SubjectDetail } from '../common';

const { width, height } = Dimensions.get('window');

class Search extends Component {
  state = {
    teachers: [],
    subjects: [],
    rating: 3.5,
    showSearchVal: false,
  };

  onPress = (person) => {
    this.props.navigation.navigate('TeacherProfile', { person, action: 'forum' });
  }

  requestData = (queryObj) => {
    // this.setState({ teachers: [], subjects: [] });
    const client = algoliasearch(algoliaConfig.adminID, algoliaConfig.apiKey);
    const queries = [{
      indexName: 'teachers',
      query: queryObj,
      filters: 'Rating >= 3.5',
    }, {
      indexName: 'subjects',
      query: queryObj,
    }];
    if (queryObj === '') {
      this.setState({ showSearchVal: false, teachers: [], subjects: [] });
    } else {
      client.search(queries, this.searchCallback.bind(this));
    }
  }

  searchCallback = (err, content) => {
    if (err) {
      console.error(err);
      return;
    }
    this.setState({ teachers: content.results[0].hits, subjects: content.results[1].hits });
  }

  renderSubjects = () => {
    if (this.state.subjects.length >= 1 && !this.state.showSearchVal) {
      return this.state.subjects.map(subject => <SubjectDetail key={subject.objectID} subject={subject} />);
    }
    return null;
  }

  renderTeachers = () => {
    if (this.state.teachers.length >= 1 && !this.state.showSearchVal) {
      return this.state.teachers.map(teacher => <SearchDetail key={teacher.UID} onPress={() => this.onPress(teacher)} person={teacher} />);
    }
    return null;
  }

  render() {
    return (
      <View style={styles.containerStyle}>
        <SearchBar searchCallback={queryobj => this.requestData(queryobj)} rkt="search" />
        <ScrollView style={{ flex: 1 }}>
          <Text style={styles.topResultTextStyle}>
            {this.state.subjects.length >= 1 ? 'Subjects' : ''}
          </Text>
          {this.renderSubjects()}
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
  },
  topResultTextStyle: {
    fontSize: 22,
    color: 'black',
    alignSelf: 'center',
    fontFamily: 'avenir_heavy',
  },
};

export { Search };
