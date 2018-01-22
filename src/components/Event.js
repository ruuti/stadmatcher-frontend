import React, { Component } from 'react';
import EventDetailRow from './EventDetailRow';
import Loadindicator from './Loadindicator';
import moment from 'moment';
import Config from '../Config';
import Helmet from 'react-helmet';
import DataSource from '../DataSource';
import EventListStyles from './EventList.scss';

class Event extends Component {

  constructor(props) {
    super(props);
    if(props.event && props.event.id && props.match.params.matchId == props.event.id){
      this.state = {
        event : props.event,
        loading : false,
        title : this.setTitle(props.event)
      };
    }else{
      this.state = {
        event : {},
        loading : true
      };
    }
    this.dataSource = new DataSource();
  }
  componentDidMount(){
    if(!this.state.event.id){
      this.dataSource.getEvent(this.props.match.params.matchId).then(data => {
        this.setState({
          event: data,
          loading : false,
          'title' : this.setTitle(data)
        });
      });
    }
  }
  setTitle = (eventData) => {
    const event = eventData;
    const home_team = event.home_team.title;
    const away_team = event.away_team.title;
    const league = event.home_team.league.title;
    const datetime = event.datetime;
    const dateandtime = moment(datetime).format("DD.MM.YYYY")
    const title =  home_team+' - '+away_team+' '+ dateandtime +' | '+league;
    return title;
  }

  showLoading(loadingStatus){
    let loading = ''
    if(loadingStatus) {
      loading = <Loadindicator />
    }
    return loading;
  }

  render() {
    let content = <Loadindicator />;
    if(!this.state.loading) {
      content = <EventDetailRow event={this.state.event} />
    }

    let helmetData = (<Helmet 
      title={this.state.title} 
      meta={[
        {property: "og:title", content: this.state.title},
        {name: "twitter:title", content: this.state.title},
        {property: "og:url", content: 'https://stadmatcher.se/match/'+this.props.match.params.matchId},
        {property: "og:description", content: "Ishockey, bandy, fotboll, basketboll matcher i Sverige"},
        {name: "twitter:description", content: "Ishockey, bandy, fotboll, basketboll matcher i Sverige"}
      ]}
      link={[
        {rel:"canonical", href: "https://stadmatcher.se/match/"+this.props.match.params.matchId}
      ]} />);

    return (
      <div>
        { helmetData }
        <section className={ EventListStyles.EventListContainer }>
          {content}
        </section>
      </div>
    );
  }
}

export default Event;
