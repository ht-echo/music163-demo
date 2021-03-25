import './index.less';
import '@/assets/css/reset.css';
import '@/assets/css/component.css';

import { useState } from 'react';
import { Menu, BackTop } from 'antd';
import { Provider } from 'react-redux';
import AppFooter from '@/components/app-footer';
import { history } from 'umi';
import store from '@/store';
import PlayBar from '@/components/play-bar';
import HeaderRight from '@/components/header-right';
function BasicLayout(props) {
  const handleClick = (e) => {
    if (e.key.indexOf('/') != -1) {
      setCurrent(e.key);
      history.push(e.key);
    }
  };

  let pathname = history.location.pathname;
  if (pathname.indexOf('/discover') != -1) pathname = '/discover';
  const [current, setCurrent] = useState(pathname);
  return (
    <Provider store={store}>
      <div className="basic-layout">
        <div className="layout-container">
          <div className="header">
            <div className="w1100 flex">
              <div className="header-left">
                <h1>
                  <a href="#/" className="logo sprite_01">
                    网易云音乐
                  </a>
                </h1>
                <Menu
                  className="menuStyle"
                  mode="horizontal"
                  theme="dark"
                  selectedKeys={[current]}
                  onClick={handleClick}
                >
                  <Menu.Item key="/discover">发现音乐</Menu.Item>
                  <Menu.Item key="/mine">我的音乐</Menu.Item>
                  <Menu.Item key="/friend">朋友</Menu.Item>
                  <Menu.Item key="product">
                    <a href="https://music.163.com/store/product">商场</a>
                  </Menu.Item>
                  <Menu.Item key="musicer">
                    <a href="https://music.163.com/st/musician#/">音乐人</a>
                  </Menu.Item>
                  <Menu.Item key="/download">下载客户端</Menu.Item>
                </Menu>
              </div>
              <HeaderRight />
            </div>
          </div>
          <div className="content">{props.children}</div>
        </div>
        <AppFooter />
        <PlayBar />
        <BackTop
          style={{
            bottom: '120px',
          }}
        />
      </div>
    </Provider>
  );
}

export default BasicLayout;
