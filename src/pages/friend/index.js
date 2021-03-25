import React, { memo } from 'react';
const style = {
  inner: {
    width: '820px',
    height: '470px',
    margin: '0px auto',
    backgroundPosition: '0px 70px',
  },
  mine: {
    background: '#fff',
    height: '100%',
  },
};
export default memo(function index() {
  return (
    <div style={style.mine} className="w980">
      <div className="not-login" style={style.inner}></div>;
    </div>
  );
});
