import React, { Component } from 'react';
import Moment from 'react-moment';
import EventRowStyles from './EventRow.scss';

class EventRow extends Component {

  constructor(props) {
    super(props);
    this.event = props.event;
  }

  teamLogo(team) {
    
    let image = <div className={EventRowStyles.TeamLogoEmpty}></div>
    if(team.logo) {
      image = <img className={EventRowStyles.TeamLogo} alt={team.title} src={team.logo} />
    }
    return image
  }

  sportIcon(event) {
    let image = <div className={EventRowStyles.sportsName + ' ' +EventRowStyles.icehockey +' '+EventRowStyles.sportNameIcon}></div>
    const sport = event.home_team.league.sport;
    if(sport.id === 1){
      image = <div className={EventRowStyles.sportsName + ' ' +EventRowStyles.icehockey +' '+EventRowStyles.sportNameIcon}></div>
    } else if(sport.id === 2){
      image = <div className={EventRowStyles.sportsName + ' ' +EventRowStyles.bandy +' '+EventRowStyles.sportNameIcon}></div>
    } else if(sport.id === 3){
      image = <div className={EventRowStyles.sportsName + ' ' +EventRowStyles.basketball +' '+EventRowStyles.sportNameIcon}></div>
    } else if(sport.id === 4){
      image = <div className={EventRowStyles.sportsName + ' ' +EventRowStyles.soccer +' '+EventRowStyles.sportNameIcon}></div>
    } else if(sport.id === 5){
      image = <div className={EventRowStyles.sportsName + ' ' +EventRowStyles.handball +' '+EventRowStyles.sportNameIcon}></div>
    } else if(sport.id === 6){
      image = <div className={EventRowStyles.sportsName + ' ' +EventRowStyles.volleyball +' '+EventRowStyles.sportNameIcon}></div>
    }
    return image
  }

  render() {
    const event = this.event;
    return (
      <article itemScope itemType={'http://schema.org/SportsEvent'} className={EventRowStyles.Event}>
        <header className={EventRowStyles.EventHeader} itemProp={'name'} content={event.home_team.title+' - '+event.away_team.title}>
          <div className={EventRowStyles.category+ ' ' +EventRowStyles.column}>
            <div className={EventRowStyles.categoryIcon}>
              {this.sportIcon(event)}
            </div>
            <p className={EventRowStyles.league}>{event.home_team.league.title}</p>
          </div>
          <div className={EventRowStyles.team+ ' ' +EventRowStyles.column}>
            { this.teamLogo(event.home_team) }
            <h2 itemProp={'homeTeam'}>{event.home_team.title}</h2>
          </div>
          <div className={EventRowStyles.time+ ' ' +EventRowStyles.column}>
            <time dateTime={event.datetime} itemProp={'startDate'} content={event.datetime}>
              <Moment format="HH:mm">
                {event.datetime}
              </Moment>
            </time>
            <p className={EventRowStyles.arena} itemProp={'location'} itemScope itemType={'http://schema.org/Place'}> <span itemProp={'name'}>{event.arena.title}</span>, <span itemProp={'address'} itemScope itemType={'http://schema.org/PostalAddress'}><span itemProp={'addressRegion'}>{event.arena.city}</span></span></p>
          </div>
          <div className={EventRowStyles.team+ ' ' +EventRowStyles.column}>
            { this.teamLogo(event.away_team) }
            <h2 itemProp={'awayTeam'}>{event.away_team.title}</h2>
          </div>
          <div className={EventRowStyles.clearFix}></div>
        </header>
      </article>
    );
  }
}

export default EventRow;
