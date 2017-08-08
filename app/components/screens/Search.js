import React, { Component } from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import firebase from 'firebase';
import { Input, SearchDetail } from '../common';

const { width, height } = Dimensions.get('window');

class Search extends Component {
  constructor() {
    super();
    this.state = {
      showSearchVal: false,
      values: [''],
    };
  }

  // searchText(searchValue) {
  //   this.setState({ values: [] });
  //   const ref = firebase.database().ref('users/teachers');
  // }

  requestData(queryObj) {
    const key = firebase.database().ref().child('search/request').push({
      index: 'firebase',
      type: 'user',
      q: queryObj,
    }).key;
    return firebase.database().ref().child(`search/response/${key}/hits/hits`).on('value', (data) => {
      console.log(data.val());
    });
  }

  renderSearchVal() {
    if (this.state.showSearchVal) {
      return this.state.values.map(value => <SearchDetail key={value.UID} person={value} />);
    }
    return null;
  }

  render() {
    return (
      <View style={{ width, height, alignItems: 'center' }}>
        <Input icon="search" label="Search" cb={this.requestData.bind(this)} />
        <ScrollView horizontal>
          {this.renderSearchVal()}
        </ScrollView>
      </View>
    );
  }
}

export { Search };
