import React, { memo } from 'react';

import { Button } from 'antd';
import {
  PlayCircleOutlined,
  FolderAddOutlined,
  ShareAltOutlined,
  CloudDownloadOutlined,
  CommentOutlined,
} from '@ant-design/icons';
import { formatMonthDay } from '@/utils/format-utils.js';

import './index.less';
export default memo(function InfoTop(props) {
  const { dataInfo = {} } = props;
  return (
    <div className="info-top">
      <img src={dataInfo.coverImgUrl || dataInfo.picUrl} alt="" />
      <div className="top-detail">
        <div className="name">{dataInfo.name}</div>
        <div className="update">
          最近更新：
          {dataInfo.trackNumberUpdateTime
            ? formatMonthDay(dataInfo.trackNumberUpdateTime)
            : formatMonthDay(dataInfo.publishTime)}
        </div>
        <div className="btns">
          <Button icon={<PlayCircleOutlined />} type="primary">
            播放
          </Button>
          <Button icon={<FolderAddOutlined />}>
            {` `}
            {dataInfo.subscribedCount || '收藏'}
          </Button>
          <Button icon={<ShareAltOutlined />}>
            (
            {dataInfo.shareCount || (dataInfo.info && dataInfo.info.shareCount)}
            )
          </Button>
          <Button icon={<CloudDownloadOutlined />}>下载</Button>
          <Button icon={<CommentOutlined />}>
            (
            {dataInfo.commentCount ||
              (dataInfo.info && dataInfo.info.commentCount)}
            )
          </Button>
        </div>
      </div>
    </div>
  );
});
