import React, { Component } from 'react';
import Moment from 'react-moment';
import 'moment/locale/sv';
import DateHeaderStyles from './DateHeader.scss';

class DateHeader extends Component {

  constructor(props) {
    super(props);
    this.date = props.date;
  }
  render() {
    return (
      <div className={DateHeaderStyles.DateHeader}><p className={DateHeaderStyles.DateHeaderText}><Moment locale="sv" format="MMMM DD YYYY">{this.date}</Moment></p></div>
    );
  }
}

export default DateHeader;
