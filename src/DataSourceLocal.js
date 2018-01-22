import "isomorphic-fetch"

export default class DataSourceLocal {
  
  constructor () {
    this.url = 'http://127.0.0.2';
  }
  
  makeApiCall = (url) => {
    return fetch(url)
    .then(response => {
      return response.json();
    },
    error => {
      console.log(error);
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