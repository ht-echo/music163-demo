import React, { memo } from 'react';

import './index.less';
export default memo(function DjTable(props) {
  const { data = [] } = props;
  return (
    <div className="dj-table">
      {data &&
        data.map((item, index) => {
          return (
            <div key={item.id || index} className="dj-row">
              <img src={item.picUrl} alt="" />
              <div className="title">
                <p className="ellipsis">{item.rcmdtext}</p>
                <p className="ellipsis">{item.name}</p>
              </div>
              <div className="row-more">{item.category}</div>
            </div>
          );
        })}
    </div>
  );
});
