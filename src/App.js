import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';
import Events from './components/Events';
import Event from './components/Event';
import AppStyles from './App.scss';

class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className={AppStyles.container}>
          <Router>
            <div>
              <header className={AppStyles.AppHeader}>
                <div className={AppStyles.AppHeader.container}>
                  <div className={AppStyles.AppHeader.container.logoContainer}>
                    <Link to='/'>
                      <img src="http://mb.cision.com/Public/56/9933573/b2f4e7e8b9c60366_org.png" className="App-logo" alt="logo" />
                    </Link>
                  </div>
                  <div className="title-container">
                    <h1>Bläddra bland sportevenemang i Sverige</h1>
                  </div>
                  <div className="clear-fix"></div>
                </div>
              </header>
              <Switch onUpdate={this.fireTracking}>
                <Route exact path='/' component={Events} />
                <Route path='/match/:matchId' component={Event} />
              </Switch>
            </div>
          </Router>
          <footer id="footer">
            <p>Stadmatcher.se is <a rel="noopener noreferrer" href="https://www.linkedin.com/in/miikkavarri/" target="_blank">Miikka Värri´s</a> project to help you to find interesting sports events in Sweden. Icons used on this website are from <a href="https://icons8.com/" rel="noopener noreferrer" target="_blank">Icons8</a>.</p>
          </footer>
        </div>
      </div>
    );
  }
}

export default App;
