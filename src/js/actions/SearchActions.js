import dispatcher from '../../dispatcher';

export function findPlaces(distance, query) {
	dispatcher.dispatch({
		type: 'FIND_PLACES',
		distance,
		query
	});
}