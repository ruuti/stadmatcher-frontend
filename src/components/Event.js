import React, { Component } from 'react';
import EventDetailRow from './EventDetailRow';
import Loadindicator from './Loadindicator';
import moment from 'moment';
import Config from '../Config';
import Helmet from 'react-helmet';
import DataSource from '../DataSource';

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

    let helmetData = <Helmet title={this.state.title} />;

    return (
      <div>
        { helmetData }
        <section className="EventListContainer">
          {content}
        </section>
      </div>
    );
  }
}

export default Event;
