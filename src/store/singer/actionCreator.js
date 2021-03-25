import * as actionTypes from './actionTypes';
import { getSingerCategory, getSingerInfo, getSingerAlbum } from '@/api/singer';

const changeSingerCategory = (category) => ({
  type: actionTypes.GET_SINGER_CATEGORY,
  category,
});

const changeSingerInfo = (songs) => ({
  type: actionTypes.GET_SINGER_SONGS,
  songs,
});

const changeSingerAlbum = (album) => ({
  type: actionTypes.GET_SINGER_ALBUM,
  album,
});

export const getSingerCategoryAction = (params) => {
  return async (dispatch) => {
    let res = await getSingerCategory(params);
    dispatch(changeSingerCategory({ ...res, ...params }));
  };
};

export const getSingerInfoAction = (id) => {
  return async (dispatch) => {
    let res = await getSingerInfo(id);
    dispatch(changeSingerInfo(res));
  };
};

export const getSingerAlbumAction = (id) => {
  return async (dispatch) => {
    let res = await getSingerAlbum(id);
    dispatch(changeSingerAlbum(res));
  };
};
