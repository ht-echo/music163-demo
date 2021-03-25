import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getTopBannersAction } from './store/actionCreator';

import { Carousel } from 'antd';
import Content from '@/components/recommend-list';
import './index.less';
export default memo(function index(props) {
  const contentStyle = {
    height: '270px',
    width: '730px',
    color: '#fff',
    lineHeight: '270px',
    textAlign: 'center',
    background: '#364d79',
  };
  const bannerRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    // 在组件渲染之后发送网络请求
    dispatch(getTopBannersAction());
  }, [dispatch]);
  const { topBanners } = useSelector(
    (state) => ({
      // topBanners: state.get('recommend').get('topBanners')
      // 获取redux-reducer转换成Immutable对象的深层state
      topBanners: state.getIn(['recommend', 'topBanners']),
    }),
    shallowEqual,
  );
  const bgImage =
    topBanners &&
    topBanners[currentIndex] &&
    topBanners[currentIndex].imageUrl + '?imageView&blur=40x20';
  const bannerChange = useCallback((from, to) => {
    setCurrentIndex(to);
  }, []);

  return (
    <div className="recommend">
      <div
        className="contentTop"
        style={{
          background: `url('${bgImage}') center center/6000px`,
        }}
      >
        <div className="boxs w980">
          <Carousel
            style={{ width: '730px' }}
            autoplay
            effect="fade"
            autoplaySpeed={5000}
            ref={bannerRef}
            beforeChange={bannerChange}
          >
            {topBanners &&
              topBanners.map((item) => {
                return (
                  <div style={contentStyle} key={item.imageUrl}>
                    <img
                      style={{ width: '100%' }}
                      src={item.imageUrl}
                      alt={item.typeTitle}
                    />
                  </div>
                );
              })}
          </Carousel>
          <a href="#/download" className="downloadBg"></a>
          <div className="cortorl-btns">
            <div
              className="left btn"
              onClick={() => bannerRef.current.prev()}
            ></div>
            <div
              className="right btn"
              onClick={() => bannerRef.current.next()}
            ></div>
          </div>
        </div>
      </div>
      <Content />
    </div>
  );
});
