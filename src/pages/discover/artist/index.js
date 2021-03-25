import React, { memo } from 'react';
import { shallowEqual, useSelector } from 'react-redux';

import SingerCategory from '@/components/singer-category';
import PageTitle from '@/components/pageTitle';
import SingerTable from '@/components/singer-table';
import './index.less';
export default memo(function Artist() {
  const { category = {} } = useSelector(
    (state) => ({
      category: state.getIn(['singer', 'category']),
    }),
    shallowEqual,
  );

  return (
    <div className="artist w980 pagebg page-header-noPadding">
      <div className="artist-left">
        <SingerCategory />
      </div>
      <div className="artist-right">
        <PageTitle title={category.singerName} moreIsShow={false} />
        <SingerTable data={category.artists} />
      </div>
    </div>
  );
});
