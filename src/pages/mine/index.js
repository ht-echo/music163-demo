import React, { memo } from 'react';
const style = {
  inner: {
    width: '807px',
    height: '372px',
    margin: '0px auto',
    backgroundPosition: '0px 104px',
  },
  mine: {
    background: '#fff',
    height:'100%'
  },
};
export default memo(function index() {
  return (
    <div style={style.mine} className="w980">
      <div className="my_music" style={style.inner}></div>;
    </div>
  );
});
