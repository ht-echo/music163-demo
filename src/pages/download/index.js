import React, { memo } from 'react';

export default memo(function Download() {
  return (
    <div
      className="download"
      style={{
        background: '#1a1a1a',
      }}
    >
      <img width="100%" src={require('@/assets/img/downloadBg.png')} alt="" />
    </div>
  );
});
