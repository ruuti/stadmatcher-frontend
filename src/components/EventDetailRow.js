import React, { Component } from 'react';
import Moment from 'react-moment';
import EventRowStyles from './EventRow.scss';
import hockeyIcon from '../img/icons8-hockey-100-white.png';
import basketballIcon from '../img/icons8-basketball-100.png';
import bandyIcon from '../img/bandy.png';
import soccerIcon from '../img/icons8-soccer-ball-100.png';
import emptyTeamLogo from '../img/team-empty.png';
import {
  Link
} from 'react-router-dom';

class EventDetailRow extends Component {

  constructor(props) {
    super(props);
    this.event = props.event;
  }

  teamLogo(team) {
    
    let image = <img className={EventRowStyles.eventDetailTeamLogo} alt={team.title} src={emptyTeamLogo} />
    if(team.logo) {
      image = <img className={EventRowStyles.eventDetailTeamLogo} alt={team.title} src={team.logo} />
    }
    return image
  }

  sportIcon(event) {
    let image = <img className={EventRowStyles.sportsName} alt="Ice hockey" src={hockeyIcon} />
    const sport = event.home_team.league.sport;
    if(sport.id === 1){
      image = <img className={EventRowStyles.sportsName} alt="Ice hockey" src={hockeyIcon} />
    } else if(sport.id === 3){
      image = <img className={EventRowStyles.sportsName} alt="Bandy" src={bandyIcon} />
    } else if(sport.id === 4){
      image = <img className={EventRowStyles.sportsName} alt="Basketball" src={basketballIcon} />
    }
    return image
  }

  render() {
    const event = this.event;
    return (
      <article className={EventRowStyles.Event+ ' '+EventRowStyles.eventDetail}>
        <header className={EventRowStyles.EventHeader}>
          <div className={EventRowStyles.column+ ' '+EventRowStyles.team}>
            { this.teamLogo(event.home_team) }
            <h2>{event.home_team.title}</h2>
          </div>
          <div className={EventRowStyles.column+ ' '+EventRowStyles.eventDetailTime}>
            <time dateTime="{event.datetime}">
              <Moment className={EventRowStyles.eventDetailDatetime} locale="sv" format="MMMM DD YYYY">
                {event.datetime}
              </Moment>
              <Moment format="HH:mm">
                {event.datetime}
              </Moment>
            </time>
            <p className={EventRowStyles.arena}> {event.arena.title}, {event.arena.city}</p>
          </div>
          <div className={EventRowStyles.column+ ' '+EventRowStyles.team}>
            { this.teamLogo(event.away_team) }
            <h2>{event.away_team.title}</h2>
          </div>
          <div className={EventRowStyles.clearFix}></div>
        </header>

        <div className={EventRowStyles.textCenter}>
          <Link className={EventRowStyles.browseAllButton} to={{ pathname: '/' }}>Visa alla matcher</Link>
        </div>

      </article>
    );
  }
}

export default EventDetailRow;
