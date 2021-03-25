import React, { memo } from 'react';
import { history } from 'umi';
import './index.less';
export default memo(function SingerTable(props) {
  const handleClick = (item) => {
    history.push('/discover/artistInfo?id=' + item.id);
  };
  const { data = [] } = props;
  return (
    <div className="singerTable">
      {data &&
        data.map((item, i) => {
          return (
            <div key={item.id || i} className="info">
              <div
                className="avator"
                onClick={() => {
                  handleClick(item);
                }}
              >
                <img src={item.picUrl} alt="" />
                <div className="avator-bg"></div>
              </div>
              <div className="title">
                <span
                  onClick={() => {
                    handleClick(item);
                  }}
                  className="name"
                >
                  {item.name}
                </span>
                <div className="userIcon"></div>
              </div>
            </div>
          );
        })}
    </div>
  );
});
