import React, { Component } from 'react';
import SportFilterStyles from './SportFilter.scss';
import hockeyIcon from '../img/icons8-hockey-100-white.png';
import basketballIcon from '../img/icons8-basketball-100.png';
import bandyIcon from '../img/bandy.png';
import soccerIcon from '../img/icons8-soccer-ball-100.png';
import handballIcon from '../img/icons8-handball-filled-100.png';

class SportFilter extends Component {
  constructor(props) {
    super(props);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(event) {
    this.props.toggleFilterFx(event);
  }

  sportImage(sport){
    let sportIcon = hockeyIcon;
    switch(sport) {
      case 'Ice hockey':
        sportIcon = <img alt={sport} title={sport} className={SportFilterStyles.sport} src={hockeyIcon} />;
        break;
      case 'Bandy':
        sportIcon = <img alt={sport} title={sport} className={SportFilterStyles.sport} src={bandyIcon} />;
        break;
      case 'Basketball':
        sportIcon = <img alt={sport} title={sport} className={SportFilterStyles.sport} src={basketballIcon} />;
        break;
      case 'Soccer':
        sportIcon = <img alt={sport} title={sport} className={SportFilterStyles.sport} src={soccerIcon} />;
        break;
      case 'Handball':
        sportIcon = <img alt={sport} title={sport} className={SportFilterStyles.sport} src={handballIcon} />;
        break;
      default:
        sportIcon = <img alt={sport} title={sport} className={SportFilterStyles.sport} src={hockeyIcon} />;
    }
    return sportIcon;
  }

  render() {
    const sports = this.props.sports;
    return (
      <ul className={SportFilterStyles.sportSelect}>
        { sports.map((x, i) => {
          return (<li key={i} className={SportFilterStyles.sportSelectLi}>
            <label className={SportFilterStyles.sportSelectLabel}>
              <input type="checkbox" onChange={this.handleOnChange} defaultChecked={true} value={x}  className={SportFilterStyles.sportSelectInput} />
              { this.sportImage(x) }
              <div className={SportFilterStyles.checkmark}></div>
            </label>
          </li>)
        })}
      </ul>
    );
  }
}

export default SportFilter;
