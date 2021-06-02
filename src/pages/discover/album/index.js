import React, { memo, useRef, useState, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { getNewAlbumsAction } from '@/store/recommend/actionCreator';
import PageTitle from '@/components/pageTitle';
import { history } from 'umi';

import './index.less';
export default memo(function Album() {
  const dispatch = useDispatch();
  const { newAlbums } = useSelector(
    (state) => ({
      newAlbums: state.getIn(['recommend', 'newAlbums']),
    }),
    shallowEqual,
  );

  useEffect(() => {
    dispatch(getNewAlbumsAction());
  }, []);

  return (
    <div className="album w980 pagebg page-header-noPadding">
      <PageTitle title="新碟上架" moreIsShow={false} />
      <div className="album-new">
        {newAlbums &&
          newAlbums.slice(0, 10).map((v) => {
            return (
              <div
                onClick={() => {
                  history.push(`/discover/playlist?id=${v.id}&type=album`);
                }}
                key={v.id}
                className="albms-info"
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
    </div>
  );
});
