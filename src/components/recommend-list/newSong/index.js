import React, { memo, useRef, useState, useEffect } from 'react';
import { Carousel } from 'antd';
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getNewAlbumsAction } from '@/store/recommend/actionCreator';

import { history } from 'umi';
import PageTitle from '@/components/pageTitle';
import './index.less';
export default memo(function index() {
  const [arrowShow, setArrowShow] = useState(false);
  const bannerRef = useRef();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getNewAlbumsAction());
  }, []);
  const { newAlbums } = useSelector(
    (state) => ({
      newAlbums: state.getIn(['recommend', 'newAlbums']),
    }),
    shallowEqual,
  );
  return (
    <div className="newSong">
      <PageTitle title="新碟上架" />
      <div
        className="info"
        onMouseEnter={() => setArrowShow(true)}
        onMouseLeave={() => setArrowShow(false)}
      >
        <Carousel adaptiveHeight dots={false} ref={bannerRef}>
          {[0, 1].map((item, index) => {
            return (
              <div className="info-box" key={index}>
                {newAlbums &&
                  newAlbums.slice(item * 5, item * 5 + 5).map((v) => {
                    return (
                      <div
                        onClick={() => {
                          history.push(`/discover/playlist?id=${v.id}&type=album`);
                        }}
                        key={v.id}
                        className="albms"
                        title={v.name + '--' + '(' + v.artist.name + ')'}
                      >
                        <div className="albms-top image_cover">
                          <img className="imgInfo" src={v.picUrl} />
                        </div>
                        <div className="albms-title">
                          <p>{v.name}</p>
                          <p>{v.artist.name}</p>
                        </div>
                      </div>
                    );
                  })}
              </div>
            );
          })}
        </Carousel>
        <LeftCircleOutlined
          style={{
            fontSize: '25px',
            color: '#ccc',
            display: arrowShow ? 'block' : 'none',
          }}
          className="left-icon icons"
          onClick={() => bannerRef.current.prev()}
        />
        <RightCircleOutlined
          style={{
            fontSize: '25px',
            color: '#ccc',
            display: arrowShow ? 'block' : 'none',
          }}
          className="right-icon icons"
          onClick={() => bannerRef.current.next()}
        />
      </div>
    </div>
  );
});
