/**
 * 页面的的头部标题
 */
import React from 'react';
import './css/pageHeader.scss';

const PageHeader = (props) => {
    const prefixCls = 'asi-page-header';
    const { name, className } = props;

    return (
        <div className={`${prefixCls}-wrapper ${className}`}>
            <div className={`${prefixCls}-inner`}>
                <div className={`${prefixCls}-logo`}>
                    { name }
                </div>
            </div>
        </div>
    );
};

export default PageHeader;
