import React, { memo, useState, useEffect } from 'react';
import { Menu } from 'antd';

// import { dicoverMenu } from '@/common/local-data';
import './index.less';
export default memo(function index(props) {
  const [menuList, setMenuList] = useState([]);
  const [currentMenu, setCurrentMenu] = useState(null);
  const handleChangMenu = (e) => {
    props.history.push(e.key);
    setCurrentMenu(e.key);
  };
  useEffect(() => {
    const pathname = props.history.location.pathname;
    const menu = props.route.routes.slice(1, 7);
    setMenuList(menu);
    setCurrentMenu(pathname);
  }, []);
  return (
    <div className="discover">
      <Menu
        className="menuBox"
        onClick={handleChangMenu}
        selectedKeys={[currentMenu]}
        mode="horizontal"
      >
        {menuList.map((item) => {
          return (
            <Menu.Item key={item.path}>
              <em className="menu-em">{item.title}</em>
            </Menu.Item>
          );
        })}
      </Menu>
      <div>{props.children}</div>
    </div>
  );
});
