import React, { memo, useState, useEffect } from 'react';
import { PageHeader, Table } from 'antd';
import { formatMinuteSecond } from '@/utils/format-utils.js';

import { getSongDetailAction } from '@/store/player';

import { PlayCircleOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';

import './index.less';
export default memo(function InfoList(props) {
  const dispatch = useDispatch();
  const [columnsData, setColumnsData] = useState([]);
  const { tableData, titleInfo } = props;
  const columns = [
    {
      title: '',
      dataIndex: 'index',
      key: 'index',
      width: 50,
    },
    {
      title: '歌曲名',
      dataIndex: 'title',
      key: 'title',
      ellipsis: true,
    },
    {
      title: '时长',
      dataIndex: 'time',
      key: 'time',
      ellipsis: true,
    },
    {
      title: '歌手',
      dataIndex: 'singerName',
      key: 'singerName',
      ellipsis: true,
      width: 120,
    },
  ];
  useEffect(() => {
    const width = window.innerWidth;
    if (width > 540) {
      columns[2].width = 150;
      setColumnsData(columns);
    } else {
      columns[2].width = 60;
      setColumnsData(columns.slice(0, 3));
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const handleResize = (e) => {
    const width = e.target.innerWidth;
    if (width > 540) {
      columns[2].width = 150;
      setColumnsData(columns);
    } else {
      columns[2].width = 60;
      setColumnsData(columns.slice(0, 3));
    }
  };
  let dataSource = [];
  dataSource =
    tableData &&
    tableData.slice(0, 50).map((v, i) => {
      return {
        key: v.id || i,
        index: i + 1,
        title: (
          <div className="title">
            <PlayCircleOutlined
              style={{
                padding: '0 10px',
                cursor: 'pointer',
              }}
              onClick={() => {
                dispatch(getSongDetailAction(v.id, true));
              }}
            />
            <a
              style={{
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                maxWidth: '230px',
              }}
              href=""
              onClick={(e) => {
                e.preventDefault();
                dispatch(getSongDetailAction(v.id, true));
              }}
            >
              {v.name}
            </a>
          </div>
        ),
        time: formatMinuteSecond(v.dt),
        singerName: v.ar[0].name,
      };
    });

  return (
    <div className="info-list">
      <PageHeader
        style={{
          padding: 0,
          borderBottom: '2px solid #c10d0c',
        }}
        className="site-page-header"
        onBack={() => null}
        title="歌曲列表"
        backIcon={false}
        extra={
          <span
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              height: '100%',
            }}
          >
            {(titleInfo && `播放：` + titleInfo.playCount + `次`) || ''}
          </span>
        }
      />
      <Table
        rowClassName="list-row"
        pagination={false}
        columns={columnsData}
        dataSource={dataSource}
      />
    </div>
  );
});
