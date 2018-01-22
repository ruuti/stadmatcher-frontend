import React, { Component } from 'react';
import Moment from 'react-moment';
import EventRowStyles from './EventRow.scss';
import {
  Link
} from 'react-router-dom';

class EventDetailRow extends Component {

  constructor(props) {
    super(props);
    this.event = props.event;
  }

  teamLogo(team) {
    
    let image = <div className={EventRowStyles.eventDetailTeamLogoEmpty}></div>
    if(team.logo) {
      image = <img className={EventRowStyles.eventDetailTeamLogo} alt={team.title} src={team.logo} />
    }
    return image
  }

  render() {
    const event = this.event;
    return (
      <article itemScope itemType={'http://schema.org/SportsEvent'} className={EventRowStyles.Event+ ' '+EventRowStyles.eventDetail}>
        <header className={EventRowStyles.EventHeader}>
          <div className={EventRowStyles.column+ ' '+EventRowStyles.team}>
            { this.teamLogo(event.home_team) }
            <h2 itemProp={'homeTeam'}>{event.home_team.title}</h2>
          </div>
          <div className={EventRowStyles.column+ ' '+EventRowStyles.eventDetailTime}>
            <time dateTime={event.datetime} itemProp={'startDate'} content={event.datetime}>
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
            <h2 itemProp={'awayTeam'}>{event.away_team.title}</h2>
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
