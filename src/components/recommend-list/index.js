import React, { memo, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { SETTLE_SINGER_COUNT } from '@/common/constants.js';
import { getSettleSingerAction } from '@/pages/discover/recommend/store/actionCreator';

import { hotRadios } from '@/common/local-data.js';

import Hot from './hot';
import NewSong from './newSong';
import Rank from './rank';
import { Button, Card, Avatar } from 'antd';
import { history } from 'umi';
import './index.less';

export default memo(function content() {
  const { Meta } = Card;
  const handleClick = (id) => {
    history.push('/discover/artistInfo?id=' + id);
  };
  const { settleSinger } = useSelector(
    (state) => ({
      settleSinger: state.getIn(['recommend', 'settleSinger']),
    }),
    shallowEqual,
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSettleSingerAction(SETTLE_SINGER_COUNT));
  }, [dispatch]);
  return (
    <div className="contentInfo w980">
      <div className="content-left">
        <Hot />
        <NewSong />
        <Rank />
      </div>
      <div className="content-right">
        <div className="right-top sprite_02">
          <div className="text">
            登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机
          </div>
          <Button
            type="primary"
            danger
            style={{
              fontSize: '12px',
            }}
          >
            用户登录
          </Button>
        </div>
        <Card
          className="singer"
          size="small"
          title="入驻歌手"
          bordered={false}
          extra={<a href="#/discover/artist">查看全部{` >`}</a>}
        >
          {settleSinger &&
            settleSinger.map((v, i) => {
              return (
                <Meta
                  className="singer-item"
                  key={v.id ? v.id : i}
                  onClick={() => {
                    handleClick(v.id);
                  }}
                  avatar={<Avatar shape="square" src={v.picUrl} />}
                  title={v.name}
                  description="流行歌手"
                />
              );
            })}
        </Card>
        <Card className="anchor" size="small" title="热门主播" bordered={false}>
          {hotRadios &&
            hotRadios.map((v, i) => {
              return (
                <div className="anchor-item" key={v.id ? v.id : i}>
                  <Avatar
                    src={v.picUrl}
                    style={{
                      width: 40,
                      height: 40,
                    }}
                  />
                  <div className="item-text">
                    <a href="#" className="artist-name">
                      <p className="ellipsis" style={{ maxWidth: '140px' }}>
                        {v.name}
                      </p>
                    </a>
                    <a href="#" className="artist-detail text-nowrap">
                      <p className="ellipsis" style={{ maxWidth: '140px' }}>
                        {v.position}
                      </p>
                    </a>
                  </div>
                </div>
              );
            })}
        </Card>
      </div>
    </div>
  );
});
