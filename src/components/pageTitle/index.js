import React, { memo } from 'react';
import { PageHeader } from 'antd';
import { ArrowRightOutlined, CustomerServiceOutlined } from '@ant-design/icons';
// import propTypes from 'prop-types';
import { history } from 'umi';
import './index.less';
const PageTitle = function PageTitle(props) {
  const { pathname = history.location.pathname, moreIsShow = true } = props;
  return (
    <PageHeader
      className="page-header"
      onBack={() => null}
      backIcon={<CustomerServiceOutlined style={{ color: '#d8131a' }} />}
      title={props.title}
      subTitle={props.typeArr.map((v, i) => (
        <span className="subTitleInfo" key={i}>
          &nbsp;&nbsp;
          <span className="text" onClick={() => window.location.reload()}>
            {v}
          </span>
          &nbsp;&nbsp;
          <span className="line">|</span>
        </span>
      ))}
      extra={[
        moreIsShow && (
          <div
            key="btn-1"
            className="extraBtn"
            onClick={() => {
              history.push(pathname);
            }}
          >
            <span>更多</span>
            <ArrowRightOutlined style={{ fontSize: '9px', color: '#d8131a' }} />
          </div>
        ),
      ]}
    />
  );
};
PageTitle.defaultProps = {
  title: 'title',
  typeArr: [],
};
export default memo(PageTitle);
