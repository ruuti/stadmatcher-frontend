import Events from './components/Events';
import Event from './components/Event';
import DataSourceLocal from './DataSourceLocal';

const dataSource = new DataSourceLocal();

const routes = [
  { path: '/',
    component: Events,
    loadData: () => dataSource.getInitialdata(),
  },
  { path: '/match/:matchId',
    component: Event,
    loadData: (match) => {
    	return dataSource.getEvent(match.params.matchId).then(function(data){
    		return {'event' : data};
    	})
    }
  }
]
export default routes;