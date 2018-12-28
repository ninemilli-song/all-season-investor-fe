/**
 * The Footer Component of page
 */
import React from 'react';
import './css/footer.scss';

class Footer extends React.PureComponent {
    prefixCls = 'asi-footer'

    render() {
        return (
            <div className={`${this.prefixCls} `}>
                <span className={`${this.prefixCls}-icp`}>
                    © 2018－2020 ninemilli.com, all rights reserved 九毛之歌
                </span>
                <span className={`${this.prefixCls}-links`}>
                    <a>关于九毛之歌</a>
                    &nbsp;·&nbsp;
                    <a>在九毛之歌工作</a>
                    &nbsp;·&nbsp;
                    <a>联系我们</a>
                    &nbsp;·&nbsp;
                    <a>免责声明</a>
                    &nbsp;·&nbsp;
                    <a>帮助中心</a>
                    &nbsp;·&nbsp;
                    <a>移动应用</a>
                    &nbsp;·&nbsp;
                    <a>**广告</a>
                </span>
            </div>
        );
    }
}

export default Footer;
