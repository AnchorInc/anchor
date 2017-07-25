import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import axios from 'axios';
import ActivityDetail from './ActivityDetail';

class ActivityList extends Component {
  constructor() {
    super();
    this.state = { People: [] };
  }

  componentWillMount() {
    axios.get('https://anchorapp-feed3.firebaseio.com/People.json')
      .then(response => this.setState({ People: response.data }));
  }

  renderPeople() {
    return this.state.People.map(person => <ActivityDetail key={person.Name} person={person} />);
  }

  render() {
    console.log(this.state);

    return (
      <ScrollView>
        {this.renderPeople()}
      </ScrollView>
    );
  }
}

export { ActivityList };
