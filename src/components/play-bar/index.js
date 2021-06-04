import React, { memo, useEffect, useState, useRef, forwardRef } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';

import CoolPlayer from 'react-cool-music-player';
import 'react-cool-music-player/dist/index.css';
import {
  getSongDetailAction,
  getLyricAction,
} from '@/store/player/actionCreator';

import './index.less';
function getPlayUrl(id) {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
}
export default memo(function PlayBar() {
  const playStyle = {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '60px',
    zIndex: 99999,
  };
  const [isPlay, setIsPlay] = useState(false);
  const dispatch = useDispatch();

  const { playList, lyricList, currentSong } = useSelector(
    (state) => ({
      currentSong: state.getIn(['player', 'currentSong']),
      playList: state.getIn(['player', 'playList']),
      currentSongIndex: state.getIn(['player', 'currentSongIndex']),
      lyricList: state.getIn(['player', 'lyricList']),
    }),
    shallowEqual,
  );
  let currentSongPlay = null;
  // if (rankIsPlay) {
  if (currentSong && currentSong.ar) {
    currentSongPlay = {
      src: getPlayUrl(currentSong.id),
      artist: currentSong.ar[0].name,
      name: currentSong.name,
      img: currentSong.al.picUrl,
      id: currentSong.id,
    };
    setTimeout(() => {
      dispatch(getSongDetailAction(currentSong.id, null));
    }, 200);
  }
  // dispatch(setRankPlayAction(false));
  // }

  let playData = [];
  playData = playList.map((v, i) => {
    return {
      src: getPlayUrl(v.id),
      artist: v.ar[0].name,
      name: v.name,
      img: v.al.picUrl,
      id: v.id,
    };
  });
  useEffect(() => {
    dispatch(getSongDetailAction(167876, null));
    // console.log('playList :>> ', playList);
  }, [dispatch]);

  return (
    <div style={playStyle}>
      <CoolPlayer
        play={isPlay}
        lyric={String(lyricList) || ''}
        showLyricNormal
        showLyricMini
        className="play-bar"
        currentAudio={currentSongPlay}
        data={playData || []}
        onAudioChange={(id) => {
          dispatch(getLyricAction(id));
          if (id !== 167876) {
            const audio = document.querySelector('audio');
            setIsPlay(false);
            setTimeout(() => {
              setIsPlay(true);
              audio.play();
            }, 100);
          }
        }}
        onDelete={(v) => {
          console.log(v);
        }}
      />
    </div>
  );
});
