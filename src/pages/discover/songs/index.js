import React, { memo, useCallback, useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getSongListAction } from '@/store/songs/actionCreator';
import { SONG_LIST_LIMIT } from '@/common/constants.js';

import PageTitle from '@/components/pageTitle';
import HotCard from '@/components/hot-card';
import { Pagination } from 'antd';
import './index.less';
export default memo(function Songs() {
  const [offset, setOffset] = useState(0);

  const { songList } = useSelector(
    (state) => ({
      songList: state.getIn(['songList', 'songList']),
    }),
    shallowEqual,
  );
  const changePage = useCallback((currentPage) => {
    // offset=(当前页数-1)*limit
    const targePageCount = (currentPage - 1) * SONG_LIST_LIMIT;
    setOffset(targePageCount);
    window.scroll(0, 0);
  }, []);

  const dispatch = useDispatch();
  // other hook
  useEffect(() => {
    dispatch(getSongListAction(SONG_LIST_LIMIT, 0));
  }, [dispatch]);
  // offset改变派发action
  useEffect(() => {
    dispatch(getSongListAction(SONG_LIST_LIMIT, offset));
  }, [offset, dispatch]);

  return (
    <div className="w980 songs">
      <PageTitle title="全部"  moreIsShow={false}  />
      <div className="songs-info">
        <HotCard singerData={songList} />
      </div>
      <div className="pageCount">
        <Pagination
          defaultCurrent={1}
          total={370}
          showSizeChanger={false}
          onChange={(currentPage) => changePage(currentPage)}
        />
      </div>
    </div>
  );
});
