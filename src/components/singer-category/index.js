import React, { memo, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { getSingerCategoryAction } from '@/store/singer/actionCreator';
import { singerCategories } from '@/common/local-data';
import './index.less';
export default memo(function SingerCategory() {
  const [curentIndex, setCurentIndex] = useState('0-0');
  let pageData = { singerName: '推荐歌手' };
  const dispatch = useDispatch();
  const handleClick = (index, i, item, v) => {
    setCurentIndex(index + `-` + i);
    pageData = { ...{ area: item.area, singerName: v.name }, ...v };

    // console.log('pageData :>> ', pageData);
    dispatch(getSingerCategoryAction(pageData));
  };
  useEffect(() => {
    // 在组件渲染之后发送网络请求
    dispatch(getSingerCategoryAction(pageData));
  }, [dispatch]);
  return (
    <div className="singer-category">
      {singerCategories &&
        singerCategories.map((item, index) => {
          return (
            <div key={index} className="list-info">
              <h3>{item.title}</h3>
              <ul>
                {item &&
                  item.artists.map((v, i) => {
                    return (
                      <li
                        onClick={() => handleClick(index, i, item, v)}
                        key={i}
                        style={{
                          backgroundPosition:
                            curentIndex == index + `-` + i ? '0 0' : '0 -30px',
                        }}
                      >
                        {v.name}
                      </li>
                    );
                  })}
              </ul>
            </div>
          );
        })}
    </div>
  );
});
