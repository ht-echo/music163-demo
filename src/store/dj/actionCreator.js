import * as actionTypes from './actionTypes';
import { getDjRecommend, getDjToplist } from '@/api/dj';

const changeDjRecommend = (recommend) => ({
  type: actionTypes.GET_DJ_RECOMMEND,
  recommend,
});

const changeDjToplist = (toplist) => ({
  type: actionTypes.GET_DJ_TOPLIST,
  toplist,
});

export const getDjRecommendAction = () => {
  return async (dispatch) => {
    let res = await getDjRecommend();
    dispatch(changeDjRecommend(res && res.djRadios));
  };
};

export const getDjToplistAction = () => {
  return async (dispatch) => {
    let res = await getDjToplist();
    dispatch(changeDjToplist(res && res.toplist));
    // const hotComments = res && res.hotComments;
  };
};
