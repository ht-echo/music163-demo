import { combineReducers } from 'redux-immutable';

import { reducer as recommendReducer } from './recommend';
import { reducer as playerReducer } from './player';
import { reducer as toplistReducer } from './toplist';
import { reducer as songsReducer } from './songs';
import { reducer as songDetailRducer } from './playList';
import { reducer as djRducer } from './dj';
import { reducer as singerRducer } from './singer';
import { reducer as searchReducer } from './search';
// import { reducer as loginReducer } from './theme-login';

// 多个reducer合并
const cRducer = combineReducers({
  recommend: recommendReducer,
  player: playerReducer,
  toplist: toplistReducer,
  songList: songsReducer,
  songDetail: songDetailRducer,
  dj: djRducer,
  singer: singerRducer,
  search: searchReducer,
  //   loginState: loginReducer,
});

export default cRducer;
