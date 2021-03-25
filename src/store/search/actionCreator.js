import { getSearchResult } from '@/api/search';
import * as actionTypes from './actionType';

// 改变歌曲列表Action
const changeSongListAction = (songs) => ({
  type: actionTypes.CHANGE_SONG_LIST,
  songs,
});

// 改变歌手列表
const changeSingerListAction = (artists) => ({
  type: actionTypes.CHANGE_SINGER_LIST,
  artists,
});
const changeAblumsAction = (albums) => ({
  type: actionTypes.CHANGE_ABLUMS_LIST,
  albums,
});
const changePlaylistsAction = (playlists) => ({
  type: actionTypes.CHANGE_PLAYLISTS_LIST,
  playlists,
});

// 搜索歌曲列表network
export const getSearchSongListAction = (songName) => {
  return async (dispatch) => {
    let { result } = await getSearchResult(songName);
    const songs = result && result.songs;
    const artists = result && result.artists;
    const albums = result && result.albums;
    const playlists = result && result.playlists;
    dispatch(changeSongListAction(songs));
    dispatch(changeSingerListAction(artists));
    dispatch(changeAblumsAction(albums));
    dispatch(changePlaylistsAction(playlists));
  };
};
