import React, { memo, useEffect } from 'react';
import PageTitle from '@/components/pageTitle';
import HotCard from '@/components/hot-card';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { HOT_RECOMMEND_LIMIT } from '@/common/constants';
import { getHostBannersAction } from '@/store/recommend/actionCreator';

import './index.less';
export default memo(function Hot(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHostBannersAction(HOT_RECOMMEND_LIMIT));
  }, []);

  const { hotRecommends } = useSelector(
    (state) => ({
      hotRecommends: state.getIn(['recommend', 'hotRecommends']),
    }),
    shallowEqual,
  );

  return (
    <div className="hot">
      <PageTitle
        pathname="/discover/songs"
        title="热门推荐"
        typeArr={['华语', '流行', '摇滚', '民谣', '电子']}
      />
      <HotCard singerData={hotRecommends} />
    </div>
  );
});
