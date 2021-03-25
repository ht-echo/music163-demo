import { Map } from 'immutable';
import * as actionTypes from './actionTypes';

const defaultState = Map({
  toplist: [],
  recommend: [],
});
function reducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.GET_DJ_TOPLIST:
      return state.set('toplist', action.toplist);
    case actionTypes.GET_DJ_RECOMMEND:
      return state.set('recommend', action.recommend);

    default:
      return state;
  }
}

export default reducer;
