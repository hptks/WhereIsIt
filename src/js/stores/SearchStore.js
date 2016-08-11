import { EventEmitter } from 'events';

import dispatcher from '../dispatcher';

class SearchStore extends EventEmitter {
	constructor() {
		super();
	}
}

const searchStore=new SearchStore;
dispatcher.register(searchStore.handleAction.bind(searchStore));
export default searchStore;