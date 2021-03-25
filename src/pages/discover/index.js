import React, { memo } from 'react';
import { Tabs } from 'antd';

// import { dicoverMenu } from '@/common/local-data';
import './index.less';
export default memo(function index(props) {
  const dicoverMenu = props.route.routes.slice(1);
  console.log('dicoverMenu :>> ', dicoverMenu);
  const pathname = props.history.location.pathname;
  const { TabPane } = Tabs;
  const handleChangTab = (key) => {
    props.history.push(key);
  };
  return (
    <div className="discover">
      <Tabs
        tabBarGutter={60}
        activeKey={pathname == '/discover' ? '/discover/recommend' : pathname}
        onChange={handleChangTab}
        tabBarStyle={{
          background: 'rgb(194, 12, 12)',
          color: '#fff',
          fontSize: '12px',
          paddingLeft: 'calc((100vw - 1100px) / 2 + 210px )',
          marginBottom: 0,
          boxSizing: 'border-box',
        }}
      >
        {dicoverMenu.map((v, i) => {
          return (
            <TabPane tab={i > 5 ? '' : v.title} key={v.path}>
              <div>{props.children}</div>
            </TabPane>
          );
        })}
      </Tabs>
    </div>
  );
});
