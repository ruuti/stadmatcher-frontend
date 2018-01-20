import "isomorphic-fetch"

export default class DataSource {
  
  constructor () {
    this.url = 'https://api.stadmatcher.se';
  }
  
  makeApiCall = (url) => {
    return fetch(url)
    .then(response => {
      return response.json();
    },
    error => {
      alert(error);
    })
    .then(json => {return json})
  }

  getCities = () => {
    return this.makeApiCall(this.url+'/cities');
  }
  getEvents = () => {
    return this.makeApiCall(this.url+'/events');
  }
  getEvent = (matchId) => {
    return this.makeApiCall(this.url+'/events/'+matchId);
  }
  getInitialdata = () => {
    return Promise.all([this.getCities(), this.getEvents()])
            .then(function(data){
              return {
                'cities' : data[0],
                'events' : data[1]
              }
            });
  }
}