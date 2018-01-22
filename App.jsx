import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import Helmet from 'react-helmet';
import Events from './src/components/Events';
import Event from './src/components/Event';
import AppStyles from './src/App.scss';
import logoImg from './src/img/logo.png';
import SomeCoverImg from './src/img/somecover.png';
import TwitterCardImg from './src/img/twitter-card.png';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.events = [];
    this.cities = [];
    this.event = {};
    if(this.props.preloadedState && this.props.preloadedState.events){
      this.events = this.props.preloadedState.events;
    }
    if(this.props.preloadedState && this.props.preloadedState.cities){
      this.cities = this.props.preloadedState.cities;
    }
    if(this.props.preloadedState && this.props.preloadedState.event){
      this.event = this.props.preloadedState.event;
    }
    if(this.props.events) {
      this.events = this.props.events;
    }
    if(this.props.cities) {
      this.cities = this.props.cities;
    }
    if(this.props.event) {
      this.event = this.props.event;
    }
  }
  
  render() {
    return (
      <div>
      	<Helmet
					htmlAttributes={{lang: "sv", amp: undefined}}
					titleTemplate="%s | Stadmatcher.se"
					titleAttributes={{lang: "sv"}}
					meta={[
						{name: "description", content: "Bläddra bland sportevenemang i Sverige"},
						{name: "viewport", content: "width=device-width, minimum-scale=1, initial-scale=1, shrink-to-fit=no, user-scalable=no"},
            {name: "charset", content: "utf-8"},
            {property: "og:image", content: 'https://stadmatcher.se'+SomeCoverImg},
            {name: "twitter:image", content: 'https://stadmatcher.se'+TwitterCardImg},
            {name: "og:type", content: "website"},
            {name: "twitter:card", content: "summary"},
            {name:"theme-color", content:"#011249"},
            {name: "og:site_name", content:"Stadmatcher.se"},
            {name: "og:locale", content: "sv_SE"}
					]}
          link={[
            {rel:'apple-touch-icon', sizes: '180x180', href:'/apple-touch-icon.png'},
            {rel:"icon", type:"image/png", sizes:"32x32", href:"/favicon-32x32.png"},
            {rel:"icon", type:"image/png", sizes:"16x16", href:"/favicon-16x16.png"},
            {rel:"manifest", href:"/manifest.json"},
            {rel:"mask-icon", href:"/safari-pinned-tab.svg", color:"#011249"}
          ]}
				/>
        <div className={AppStyles.container}>
          <header className={AppStyles.AppHeader}>
            <div className={AppStyles.AppHeaderContainer}>
              <div className={AppStyles.logoContainer}>
                <Link to='/'>
                  <img src={logoImg} className={AppStyles.AppLogo} alt="logo" />
                </Link>
              </div>
              <div className={AppStyles.titleContainer}>
                <h1 className={AppStyles.slogan}>Bläddra bland sportevenemang i Sverige</h1>
              </div>
              <div className={AppStyles.clearFix}></div>
            </div>
          </header>
          <Switch>
            <Route exact path="/" render={() => <Events events={this.events} cities={this.cities} />} />
            <Route path="/match/:matchId" render={(props) => <Event {...props} event={this.event} />} />
          </Switch>
          <footer className={AppStyles.footer}>
            <p>Stadmatcher.se is <a rel="noopener noreferrer" href="https://www.linkedin.com/in/miikkavarri/" target="_blank">Miikka Värri´s</a> project to help you to find interesting sports events in Sweden. Icons used on this website are from <a href="https://icons8.com/" rel="noopener noreferrer" target="_blank">Icons8</a>.</p>
          </footer>
        </div>
      </div>
    );
  }
}