import React, { memo, useState, useRef } from 'react';
import { Input, Button, Modal, message } from 'antd';
import { SearchOutlined, PhoneOutlined } from '@ant-design/icons';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { debounce } from '@/utils/format-utils.js';
import { getSearchSongListAction } from '@/store/search/actionCreator';
import { getSongDetailAction } from '@/store/player';
import { history } from 'umi';
import LoginIcon from '@/components/theme-controls-icon/login/index';

import './index.less';
export default memo(function HeaderRight() {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');
  const [isBlur, setIsBlur] = useState(true);
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [loginState, setLoginState] = useState('default'); // 默认状态显示

  const inputRef = useRef();
  const { songs = [], artists = [], albums = [], playlists = [] } = useSelector(
    (state) => ({
      songs: state.getIn(['search', 'songs']),
      artists: state.getIn(['search', 'artists']),
      albums: state.getIn(['search', 'albums']),
      playlists: state.getIn(['search', 'playlists']),
    }),
    shallowEqual,
  );
  const hightifyText = (v) => {
    let re = new RegExp(inputValue, 'g'); //定义正则
    if (v && v.indexOf(inputValue) == -1) return v;
    return v && v.replace(re, `<span class="keyword">${inputValue}</span>`); //进行替换，并定义高亮的样式
  };
  const changeInput = debounce((target) => {
    let value = target.value.trim();
    if (value.length < 1) {
      setIsBlur(true);
      return;
    }
    // 显示下拉框
    setIsBlur(false);
    dispatch(getSearchSongListAction(value));
  }, 400);
  const handleLogin = (loginMode) => {
    switch (loginMode) {
      case 'phone':
        setLoginState('phone');
        break;
      case 'email':
        setLoginState('email');
        break;
      default:
    }
  };

  return (
    <div className="header-right">
      <div
        className="search-box"
        style={{
          display: isBlur > 0 ? 'none' : 'block',
        }}
      >
        <div className="title">
          <span className="title-info">
            搜&nbsp;“<div className="inputValue">{inputValue}</div>
            ”&nbsp;相关
            {` >`}
          </span>
        </div>
        <div className="content">
          <div className="song content-item">
            <div className="label">
              <i className="icon"></i> 单曲
            </div>
            <div className="remmend-content">
              {songs &&
                songs.map((v) => {
                  return (
                    <div key={v.id} className="content-name">
                      <div
                        onClick={() => {
                          dispatch(getSongDetailAction(v.id, true));
                        }}
                        dangerouslySetInnerHTML={{
                          __html: hightifyText(
                            `${v.name}-${
                              v.artists && v.artists[0] && v.artists[0].name
                            }`,
                          ),
                        }}
                      ></div>
                    </div>
                  );
                })}
            </div>
          </div>

          <div className="singer content-item">
            <div className="label">
              <i className="icon"></i>歌手
            </div>
            <div className="remmend-content grid-color">
              <div className="content-name">
                <div
                  onClick={() => {
                    let id = artists && artists[0] && artists[0].id;
                    setIsBlur(true);
                    history.replace('/discover/artistInfo?id=' + id);
                  }}
                  dangerouslySetInnerHTML={{
                    __html: hightifyText(
                      artists && artists[0] && artists[0].name,
                    ),
                  }}
                ></div>
              </div>
            </div>
          </div>
          <div className="ablum content-item">
            <div className="label">
              <i className="icon"></i>专辑
            </div>
            <div className="remmend-content">
              {albums &&
                albums.map((v) => {
                  return (
                    <div key={v.id} className="content-name">
                      {
                        <div
                          onClick={() => {
                            history.replace(
                              `/discover/playlist?id=${v.id}&type=album`,
                            );
                          }}
                          dangerouslySetInnerHTML={{
                            __html: hightifyText(`${v.name}-${
                              v.artist && v.artist.name
                            }
                          `),
                          }}
                        ></div>
                      }
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="song-list content-item">
            <div className="label">
              <i className="icon"></i>歌单
            </div>
            <div className="remmend-content grid-color">
              {playlists &&
                playlists.map((v) => {
                  return (
                    <div key={v.id} className="content-name">
                      <div
                        onClick={() => {
                          history.replace('/discover/playlist?id=' + v.id);
                        }}
                        dangerouslySetInnerHTML={{
                          __html: hightifyText(artists && artists[0] && v.name),
                        }}
                      ></div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>

      <Input
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        onInput={({ target }) => changeInput(target)}
        onFocus={() => {
          if (inputValue.length < 1) {
            setIsBlur(true);
            return;
          }
          setIsBlur(false);
        }}
        onBlur={() => {
          setTimeout(() => {
            setIsBlur(true);
          }, 300);
        }}
        // onPressEnter={(e) => handleEnter(e)}
        // onKeyDown={watchKeyboard}
        style={{
          maxWidth: '160px',
        }}
        value={inputValue}
        ref={inputRef}
        className="search-input"
        placeholder="音乐/歌手"
        prefix={
          <SearchOutlined
            style={{
              color: '#000',
            }}
          />
        }
      />
      <Button size="small" type="link" shape="round" className="writer">
        创作者中心
      </Button>
      <div onClick={() => setLoginModalVisible(true)} className="loginBtn">
        登录
      </div>
      <Modal
        centered
        footer={null}
        title="登录"
        visible={loginModalVisible}
        onOk={() => {
          setLoginModalVisible(false);
        }}
        onCancel={() => {
          setLoginModalVisible(false);
        }}
      >
        <div className="login-info">
          <div className="left">
            <div className="login-content">
              <div className="login-bg"></div>
              <Button
                type="ghost"
                onClick={() => message.warn('暂不做')}
                shape="round"
                icon={<PhoneOutlined />}
                className="gap"
              >
                注册
              </Button>
              <Button
                type="primary"
                shape="round"
                icon={<PhoneOutlined />}
                onClick={() => message.warn('暂不做')}
              >
                手机号登录
              </Button>
            </div>
          </div>
          <div className="right">
            <div className="icons-wrapper">
              <LoginIcon
                onClick={() => message.warn('暂不做')}
                position="-150px -670px"
                description="微信登录"
              />
              <LoginIcon
                onClick={() => message.warn('暂不做')}
                position="-190px -670px"
                description="QQ登录"
              />
              <LoginIcon
                onClick={() => message.warn('暂不做')}
                position="-231px -670px"
                description="微博登录"
              />
              <LoginIcon
                onClick={() => handleLogin('email')}
                position="-271px -670px"
                description="网易邮箱登录"
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
});
