import React, { Component } from 'react';
import EventListStyles from './EventList.scss';
import moment from 'moment';
import EventRow from './EventRow'
import DateHeader from './DateHeader';
import Loadindicator from './Loadindicator';
import SportFilter from './SportFilter';
import noResultIcon from '../img/icons8-delete-100.png';
import { Link } from 'react-router-dom';
import DataSource from '../DataSource';
import ReactGA from 'react-ga';

class EventList extends Component {

  constructor(props) {
    super(props);
    this.sports = ['Ice hockey', 'Bandy', 'Soccer', 'Basketball', 'Handball', 'Volleyball'];
    if(props.events.length === 0){
      this.state = {
        events : props.events,
        cities : props.cities,
        selectedCity : 'all',
        filteredEvents : JSON.parse(JSON.stringify(props.events)),
        loading : true,
        selectedSports : JSON.parse(JSON.stringify(this.sports))
      };
    }else{
      this.state = {
        events : props.events,
        cities : props.cities,
        selectedCity : 'all',
        filteredEvents : JSON.parse(JSON.stringify(props.events)),
        loading : false,
        selectedSports : JSON.parse(JSON.stringify(this.sports))
      };
    }

    this.dataSource = new DataSource();
    this.handleCityChange = this.handleCityChange.bind(this);
    this.toggleSportFilter = this.toggleSportFilter.bind(this);
  }

  componentDidMount() {
    if(this.props.cities.length === 0 || this.props.events.length === 0){
      this.fetchData();
    }
  }

  fetchData(){

    return this.dataSource.getInitialdata().then((data) => {
      this.setState({
        'cities' : data.cities,
        'events' : data.events,
        'filteredEvents' : data.events,
        'loading' : false
      });
    });
  }

  handleCityChange(event) {
    this.setState({selectedCity: event.target.value}, function() {
      this.filterEvents();
      ReactGA.event({
        category: 'Filter',
        action: 'Filter by city',
        label: this.state.selectedCity
      });
    })
  }

  filterEvents() {
    const selectedCity = this.state.selectedCity;
    const selectedSports = this.state.selectedSports;
    const filteredEvents = [];
    if(selectedCity !== 'all') {
      for (var i = 0; i < this.state.events.length; i++) {
        const eventObj = this.state.events[i];
        if(eventObj['arena']['city'] === selectedCity && selectedSports.indexOf(eventObj.home_team.league.sport.title) > -1){
          filteredEvents.push(this.state.events[i]);
        }
      }
    }else{
      for (var c = 0; c < this.state.events.length; c++) {
        const eventObj = this.state.events[c];
        if(selectedSports.indexOf(eventObj.home_team.league.sport.title) > -1){
          filteredEvents.push(this.state.events[c]);
        }
      }
    }
    this.setState({
      filteredEvents: filteredEvents
    });
  }

  showLoading(loadingStatus){
    let loading = ''
    if(loadingStatus) {
      loading = <Loadindicator />
    }
    return loading;
  }

  noResults(filteredEvents, loading){
    if(filteredEvents.length === 0  && !loading){
      return (<div className={EventListStyles.NoResults}>
        <img src={noResultIcon} alt="No upcoming events" />
        <p>Inga kommande event hittades.<br/>Välj en annan stad eller sport.</p>
        </div>);
    }else{
      return;
    }
  }

  toggleSportFilter(e){
    const sport = e.target.value;
    const checked = e.target.checked;
    const sportsArr = JSON.parse(JSON.stringify(this.state.selectedSports));
    
    if(!checked){
      sportsArr.splice(sportsArr.indexOf(sport),1);
    }else{
      sportsArr.push(sport);
    }
    this.setState({
      selectedSports : sportsArr
    }, function() {
      this.filterEvents();
    })
  }

  render() {
    const {events, cities} = this.props;
    return (
      <div>
        <nav className={ EventListStyles.nav }>          
          <form>
            <div className={ EventListStyles.citySelectContainer }>
              <select className={ EventListStyles.select } onChange={this.handleCityChange} value={this.state.selectedCity}>
                  <option value="all">Alla städer</option>
                  { this.state.cities.map((x, i) => {
                    return <option value={x.city} key={i}>{x.city}</option>
                  })}
              </select>
            </div>

            <SportFilter sports={this.sports} toggleFilterFx={this.toggleSportFilter} />
          </form>
        </nav>
        <section className={ EventListStyles.EventListContainer }>

          { this.showLoading(this.state.loading) }

          {this.state.filteredEvents.map((x, i) => {
            if(i === 0 || moment(this.state.filteredEvents[i-1].datetime).format('YYYY-MM-DD') !== moment(x.datetime).format('YYYY-MM-DD')){
              return <div key={x.id}><DateHeader date={x.datetime} /><Link title={x.home_team.title+' - '+x.away_team.title + ' '+moment(x.datetime).format('YYYY-MM-DD')+', '+x.arena.title+', '+x.arena.city} to={{ pathname: '/match/'+x.id }}><EventRow event={x} /></Link></div>;
            }else{
              return <Link key={x.id} title={x.home_team.title+' - '+x.away_team.title + ' '+moment(x.datetime).format('YYYY-MM-DD')+', '+x.arena.title+', '+x.arena.city} to={{ pathname: '/match/'+x.id }}><EventRow event={x} /></Link>;
            }
          })}
          { this.noResults(this.state.filteredEvents, this.state.loading) }
        </section>
      </div>
    );
  }
}

export default EventList;
