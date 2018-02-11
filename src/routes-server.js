import Events from './components/Events';
import Event from './components/Event';
import DataSourceLocal from './DataSourceLocal';

const dataSource = new DataSourceLocal();

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