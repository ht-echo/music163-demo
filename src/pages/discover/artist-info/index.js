import React, { memo, useEffect } from 'react';
import { Tabs } from 'antd';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import qs from 'query-string';
import InfoList from '@/components/info-list';
import {
  getSingerInfoAction,
  getSingerAlbumAction,
} from '@/store/singer/actionCreator';

import './index.less';
export default memo(function ArtistInfo(props) {
  const dispatch = useDispatch();
  const { TabPane } = Tabs;
  const { id } = qs.parse(props.location.search);
  const { songsData = [] } = useSelector(
    (state) => ({
      songsData: state.getIn(['singer', 'songs']),
    }),
    shallowEqual,
  );
  useEffect(() => {
    // 在组件渲染之后发送网络请求
    dispatch(getSingerInfoAction(id));
  }, [dispatch,id]);

  return (
    <div className="artist-info w980 pagebg">
      <div className="left">
        <div className="singerName">
          <h2>{songsData.artist && songsData.artist.name}</h2>
          <small>{songsData.artist && songsData.artist.alias[0]}</small>
        </div>
        <div className="bg">
          <img src={songsData.artist && songsData.artist.picUrl+'?param=640y300'} alt="" />
          <div className="mainPage commonBtn"></div>
          <div className="collect commonBtn"></div>
        </div>
        <div className="card-container">
          <Tabs type="card" size="large">
            <TabPane tab="热门作品" key="1">
              <InfoList tableData={songsData && songsData.hotSongs} />
            </TabPane>
            <TabPane tab="所有专辑" key="2">
              <p>所有专辑</p>
            </TabPane>
            <TabPane tab="相关MV" key="3">
              <p>相关MV</p>
            </TabPane>
            <TabPane tab="艺人介绍" key="4">
              <p>艺人介绍</p>
            </TabPane>
          </Tabs>
        </div>
      </div>
      <div className="right">11111111111</div>
    </div>
  );
});
