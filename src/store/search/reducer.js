import { Map } from 'immutable';
import * as actionTypes from './actionType';

const defaultState = Map({
  songs: [],
  artists: [],
  albums: [],
  playlists: [],
});

function reducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_SONG_LIST:
      return state.set('songs', action.songs);
    case actionTypes.CHANGE_SINGER_LIST:
      return state.set('artists', action.artists);
    case actionTypes.CHANGE_ABLUMS_LIST:
      return state.set('albums', action.albums);
    case actionTypes.CHANGE_PLAYLISTS_LIST:
      return state.set('playlists', action.playlists);

    default:
      return state;
  }
}

export default reducer;
