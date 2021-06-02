import React, { memo, useState, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import PageTitle from '@/components/pageTitle';

import DjTable from '@/components/dj-table';
import './index.less';
import {
  getDjRecommendAction,
  getDjToplistAction,
} from '@/store/dj/actionCreator';

export default memo(function DjRadio() {
  const dispatch = useDispatch();

  const { recommend = [], toplist = [] } = useSelector(
    (state) => ({
      recommend: state.getIn(['dj', 'recommend']),
      toplist: state.getIn(['dj', 'toplist']),
    }),
    shallowEqual,
  );
  let topTableData = [];
  topTableData = toplist.slice(0, 10).map((v, i) => {
    return {
      picUrl: v.program && v.program.coverUrl,
      rcmdtext: v.program && v.program.name,
      name: v.program && v.program.radio.name,
      category: v.program && v.program.radio.category,
    };
  });
  useEffect(() => {
    // 在组件渲染之后发送网络请求
    dispatch(getDjRecommendAction());
    dispatch(getDjToplistAction());
  }, []);

  return (
    <div className="djradio pagebg w980">
      <img
        src={require('@/assets/img/djtop.png')}
        style={{ width: '100%' }}
        alt=""
      />
      <div className="info">
        <div className="left">
          <PageTitle title="推荐节目" />
          <DjTable data={recommend} />
        </div>
        <div className="right">
          <PageTitle title="节目排行榜" />
          <DjTable data={topTableData} />
        </div>
      </div>
    </div>
  );
});
