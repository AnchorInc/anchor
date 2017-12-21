import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { SearchBar, SearchDetail, SubjectDetail } from '../common';
import { BACKGROUND_COLOR } from '../../config';

const algoliasearch = require('algoliasearch/reactnative');

const { width, height } = Dimensions.get('window');

class Search extends Component {
  state = {
    teachers: [],
    subjects: [],
    rating: 3.5,
    showSearchVal: false,
  };

  requestData = (queryObj) => {
    // this.setState({ teachers: [], subjects: [] });
    const client = algoliasearch('HZZZN58AJ0', 'fd2e8b88f354f7b81eced75ff5991de5');
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
      return this.state.teachers.map(teacher => <SearchDetail key={teacher.UID} person={teacher} />);
    }
    return null;
  }

  render() {
    return (
      <View style={styles.containerStyle}>
        <SearchBar searchCallback={queryobj => this.requestData(queryobj)} rkt="search" />
        <ScrollView style={{ flex: 1, backgroundColor: BACKGROUND_COLOR }}>
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
    backgroundColor: BACKGROUND_COLOR,
  },
  topResultTextStyle: {
    fontSize: 22,
    color: 'black',
    alignSelf: 'center',
    fontFamily: 'avenir_heavy',
  },
};

export { Search };
