import React, { memo, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import PageTitle from '@/components/pageTitle';
import { List } from 'antd';
import { getTopListAction } from '@/pages/discover/recommend/store/actionCreator';
import { getSongDetailAction } from '@/store/player';
// import { setRankPlayAction } from '@/store/player/actionCreator';
import { history } from 'umi';
import './index.less';
function RankHeader(props) {
  return (
    <div className="rank-header">
      <img className="header-img" src={props.picSrc} alt="" />
      <div className="header-info">
        <span
          style={{
            fontWeight: 'bold',
          }}
        >
          {props.title}
        </span>
        <div>
          <span className="sprite_02 left-icon icons"></span>
          <span className="sprite_02 right-icon icons"></span>
        </div>
      </div>
    </div>
  );
}

export default memo(function Ranking() {
  const { upRanking = [], originRanking = [], newRanking = [] } = useSelector(
    (state) => ({
      upRanking: state.getIn(['recommend', 'upRanking']),
      originRanking: state.getIn(['recommend', 'originRanking']),
      newRanking: state.getIn(['recommend', 'newRanking']),
    }),
    shallowEqual,
  );
  const rangking = [];
  rangking.push(originRanking, upRanking, newRanking);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTopListAction(19723756));
    dispatch(getTopListAction(3779629));
    dispatch(getTopListAction(2884035));
  }, [dispatch]);
  return (
    <div className="rank">
      <PageTitle title="榜单" pathname="/discover/ranking" />

      <div className="rank-info">
        {rangking &&
          rangking.map((v, i) => {
            return (
              <List
                className="info-list"
                key={i}
                size="small"
                header={<RankHeader title={v.name} picSrc={v.coverImgUrl} />}
                footer={
                  <div className="info-footer">
                    <span
                      className="viewAll"
                      onClick={() => {
                        history.push('/discover/ranking?id=' + v.id);
                        window.scroll(0, 0);
                      }}
                    >
                      查看全部&nbsp;{`>`}
                    </span>
                  </div>
                }
                bordered
                dataSource={v.tracks && v.tracks.slice(0, 10)}
                renderItem={(item, index) => (
                  <List.Item className="info-item ellipsis">
                    {index + 1}&nbsp;&nbsp;&nbsp;&nbsp;
                    <span
                      onClick={() => {
                        dispatch(getSongDetailAction(item.id, true));
                      }}
                      className="title-text"
                    >
                      {item.name}
                    </span>
                  </List.Item>
                )}
              />
            );
          })}
      </div>
    </div>
  );
});
