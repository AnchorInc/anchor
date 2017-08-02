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

  searchText(searchValue) {
    this.setState({ values: [] });
    const ref = firebase.database().ref('users/teachers');
    ref.orderByChild('Subject').equalTo(searchValue).on('child_added', (snap) => {
      console.log(snap.val());
      this.setState({ showSearchVal: true, values: this.state.values.concat([snap.val()]) });
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
        <Input icon="search" label="Search" cb={this.searchText.bind(this)} />
        <ScrollView>
          {this.renderSearchVal()}
        </ScrollView>
      </View>
    );
  }
}

export { Search };
