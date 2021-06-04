import React, { memo, useState, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import qs from 'query-string';
import {
  getToplistItemAction,
  changeCurrentIndexAction,
  changeCurrentToplistIdAction,
} from '@/store/toplist/actionCreator';
import TitleInfo from '@/components/info-top';
import InfoList from '@/components/info-list';

import { List, Avatar } from 'antd';
import {
  getToplistTitleInfoAction,
  getToplistInfoAction,
} from '@/store/toplist/actionCreator';

import './index.less';
export default memo(function Ranking(props) {
  let { id } = qs.parse(props.location.search);

  const {
    toplistInfo = [],
    currentToplistId,
    titleInfo,
    currentToplist,
  } = useSelector(
    (state) => ({
      toplistInfo: state.getIn(['toplist', 'toplistInfo']),
      currentToplistId: state.getIn(['toplist', 'currentToplistId']),
      titleInfo: state.getIn(['toplist', 'currentToplistTitleInfo']),
      currentToplist: state.getIn(['toplist', 'currentToplist']),
    }),

    shallowEqual,
  );

  // other hook
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getToplistItemAction(currentToplistId));
  }, [currentToplistId]);
  useEffect(() => {
    // 榜单item
    dispatch(getToplistInfoAction());
  }, []);
  useEffect(() => {
    // 派发榜单标题信息Action
    id = id ? id : currentToplistId;
    dispatch(getToplistTitleInfoAction(id));
    // console.log('index :>> ', index);
  }, [currentToplistId]);

  const [leftBg, setleftBg] = useState('#e6e6e6');
  let index = toplistInfo && toplistInfo.findIndex((v) => v.id == id);
  index = index === -1 ? 0 : index;
  let [topIndex, setTopIndex] = useState(index);
  return (
    <div className="w980 ranking">
      <div className="rank-left">
        <List
          itemLayout="horizontal"
          dataSource={toplistInfo}
          renderItem={(item, i) => (
            <div className="header-info" key={item.id || i}>
              {(i === 0 || i === 4) && (
                <div className="title">
                  {i === 0 ? '特色榜' : i === 4 ? '全球榜' : ''}
                </div>
              )}
              <List.Item
                className="topItem"
                onClick={() => {
                  setTopIndex(i);
                  dispatch(changeCurrentToplistIdAction(item.id));
                  dispatch(changeCurrentIndexAction(i));
                  // 修改URL
                  props.history.push(`/discover/ranking?id=${item.id}`);
                }}
                style={{
                  background: topIndex == i ? leftBg : '',
                  border: 0,
                }}
              >
                <List.Item.Meta
                  avatar={<Avatar size={40} src={item.coverImgUrl} />}
                  title={item.name}
                  description={item.updateFrequency}
                />
              </List.Item>
            </div>
          )}
        />
      </div>
      <div className="rank-info">
        <TitleInfo dataInfo={titleInfo} />
        <InfoList tableData={currentToplist} titleInfo={titleInfo} />
      </div>
    </div>
  );
});
