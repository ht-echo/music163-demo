import React, { memo } from 'react';

import { Card } from 'antd';
import { CustomerServiceOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { history } from 'umi';
import './index.less';

export default memo(function HotCard(props) {
  const { singerData } = props;
  const getCount = (count) => {
    if (count < 0) return;
    if (count < 10000) {
      return count;
    } else if (Math.floor(count / 10000) < 10000) {
      return Math.floor(count / 1000) / 10 + '万';
    } else {
      return Math.floor(count / 10000000) / 10 + '亿';
    }
  };

  return (
    <div className="hot-card">
      {singerData &&
        singerData.map((v) => {
          return (
            <Card
              onClick={() => {
                history.push('/discover/playlist?id=' + v.id);
              }}
              key={v.id}
              // loading={true}
              className="card-info"
              style={{ width: 140 }}
              bodyStyle={{ padding: 0 }}
              bordered={false}
              cover={
                <div className="coverBox">
                  <img
                    style={{ width: 140, height: 140 }}
                    alt={v.name}
                    src={v.picUrl || v.coverImgUrl}
                  />
                  <div className="playNav sprite_cover">
                    <span>
                      <CustomerServiceOutlined />
                      &nbsp;
                      <span style={{ fontSize: '12px' }}>
                        {getCount(v.playCount)}
                      </span>
                    </span>
                    <span>
                      <PlayCircleOutlined />
                    </span>
                  </div>
                </div>
              }
            >
              <div className="title">{v.name}</div>
            </Card>
          );
        })}
    </div>
  );
});
