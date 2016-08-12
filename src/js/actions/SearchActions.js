import dispatcher from '../../dispatcher';

export function findPlaces(query) {
	dispatcher.dispatch({
		type: 'FIND_PLACES',
		query
	});
}