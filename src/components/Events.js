import React, { Component } from 'react';
import EventList from './EventList';
import Config from '../Config';
import Helmet from 'react-helmet';

class Events extends Component {

  constructor(props) {
    super(props);
  }
  render() {
    const {events, cities} = this.props;
    return (
      <div>
        <Helmet
          title="Ishockey, bandy, fotboll, basketboll matcher i Sverige"
        />
        <EventList events={events} cities={cities} />
      </div>
    );
  }
}

export default Events;
