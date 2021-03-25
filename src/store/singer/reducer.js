import { Map } from 'immutable';
import * as actionTypes from './actionTypes';

const defaultState = Map({
  category: {},
  songs: {},
  album: {},
});
function reducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.GET_SINGER_CATEGORY:
      return state.set('category', action.category);
    case actionTypes.GET_SINGER_SONGS:
      return state.set('songs', action.songs);
    case actionTypes.GET_SINGER_ALBUM:
      return state.set('album', action.album);

    default:
      return state;
  }
}

export default reducer;
