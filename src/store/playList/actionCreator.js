// 将网络请求下的数派发到store中
// 调用API将数据保存在store
import * as actionTypes from './actionTypes';
import { getSongDeatilData, getAlbumData } from '@/api/song-detail';

// 歌单详情 actioon
const changeSongDetailAction = (songDetail) => ({
  type: actionTypes.CHANGE_SONG_DETAIL,
  songDetail,
});
const changeSongListAction = (playList) => ({
  type: actionTypes.CHANGE_SONG_LIST,
  playList,
});

// 歌单详情 network  (redux-thunk可以让action可以是一个函数)
export const getSongDeailAction = (songDeatilId, type) => {
  return async (dispatch) => {
    // 调用接口
    let result = {};
    if (type == 'album') {
      result = await getAlbumData(songDeatilId);
      dispatch(changeSongDetailAction(result));
    } else {
      result = await getSongDeatilData(songDeatilId);
      dispatch(changeSongDetailAction(result));
      dispatch(changeSongListAction(result && result.playlist));
    }
  };
};
