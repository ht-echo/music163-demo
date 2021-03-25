import { Map } from 'immutable';
import * as actionTypes from './actionTypes';

const defaultState = Map({
  songDetailInfo: {},
  playList: {},
});
/**
 *
 * @param {Array} state
 */
function reducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_SONG_DETAIL:
      return state.set('songDetailInfo', action.songDetail);
    case actionTypes.CHANGE_SONG_LIST:
      return state.set('playList', action.playList);
    default:
      return state;
  }
}

export default reducer;
