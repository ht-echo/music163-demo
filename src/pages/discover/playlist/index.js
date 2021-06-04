import React, { memo, useEffect } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import qs from 'query-string';

import TitleInfo from '@/components/info-top';
import InfoList from '@/components/info-list';

import { getSongDeailAction } from '@/store/playList/actionCreator';

import './index.less';
export default memo(function Playlist(props) {
  const { id, type } = qs.parse(props.location.search);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSongDeailAction(id, type));
  }, [id]);
  const { songDetailInfo = {} } = useSelector(
    (state) => ({
      songDetailInfo: state.getIn(['songDetail', 'songDetailInfo']),
    }),
    shallowEqual,
  );
  return (
    <div className="playlist w980">
      <div className="left">
        <TitleInfo dataInfo={songDetailInfo.playlist || songDetailInfo.album} />
        <InfoList
          tableData={
            (songDetailInfo.playlist && songDetailInfo.playlist.tracks) ||
            songDetailInfo.songs
          }
          titleInfo={songDetailInfo.playlist}
        />
      </div>
      {/* <div className="right">推荐列表</div> */}
    </div>
  );
});
