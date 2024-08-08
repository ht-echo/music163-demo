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
    height: '70px',
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
          if (id !== 1363948882) {
            console.log(`onAudioChange :`, id);
            dispatch(getLyricAction(id));

            const audio = document.querySelector('audio');
            setIsPlay(true);
            setTimeout(() => {
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
