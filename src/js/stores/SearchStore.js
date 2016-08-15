import { EventEmitter } from 'events';

import dispatcher from '../../dispatcher';

class SearchStore extends EventEmitter {
	constructor() {
		super();
	}

	findPlaces(distance, query) {
		this.emit('find', distance, query);
	}

	handleAction(action) {
		switch(action.type) {
			case 'FIND_PLACES': {
				this.findPlaces(action.distance, action.query);
				break;
			}
		}
	}
}

const searchStore=new SearchStore;
dispatcher.register(searchStore.handleAction.bind(searchStore));
export default searchStore;