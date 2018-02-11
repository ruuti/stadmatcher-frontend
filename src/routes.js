import Events from './components/Events';
import Event from './components/Event';
import DataSource from './DataSource';

const dataSource = new DataSource();

const routes = [
  { path: '/match/:matchId',
    component: Event,
    loadData: (match) => {
    	return dataSource.getEvent(match.params.matchId).then(function(data){
    		return {'event' : data};
    	})
    }
  },
  { path: '/',
    component: Events,
    loadData: () => dataSource.getInitialdata(),
  }
]
export default routes;