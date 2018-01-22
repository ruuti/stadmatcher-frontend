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
          meta={[
            {property: "og:title", content: "Ishockey, bandy, fotboll, basketboll matcher i Sverige"},
            {name: "twitter:title", content: "Ishockey, bandy, fotboll, basketboll matcher i Sverige"},
            {property: "og:description", content: "Bläddra bland sportevenemang i Sverige"},
            {name: "twitter:description", content: "Bläddra bland sportevenemang i Sverige"},
            {property: "og:url", content: 'https://stadmatcher.se'}
          ]}
          link={[
            {rel:"canonical", href: "https://stadmatcher.se"}
          ]}
        />
        <EventList events={events} cities={cities} />
      </div>
    );
  }
}

export default Events;
