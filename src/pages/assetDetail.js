import React from 'react';
import {
    FormattedMessage
} from 'react-intl';
import Layout from '../components/Layout.js';
import pageWithIntl from '../components/PageWithIntl.js';
import AssetDetailAllocation from '../containers/AssetDetailAllocation';
import AssetDetailCategoryRate from '../containers/AssetDetailCategoryRate';
import AssetDetailSafeRate from '../containers/AssetDetailSafeRate';
import AssetDetailAnalysis from '../containers/AssetDetailAnalysis';

class AssetDetail extends React.Component {
    static async getInitialProps({ req }) {
        return {
            isServer: !!req
        };
    }

    prefixCls = 'asset-detail'

    render() {
        return (
            <Layout title="Asset Analysis">
                <div className={`${this.prefixCls}-header`}>
                    <h2>
                        <FormattedMessage id="pageTitle" defaultMessage="Asset Analysis" />
                    </h2>
                    <span>
                        {'资产配置以及资产分析'}
                    </span>
                </div>
                <div className={`${this.prefixCls}-allocation`}>
                    <h3>
                        {'资产配置'}
                    </h3>
                    <div>
                        <AssetDetailAllocation />
                    </div>
                </div>
                <div className={`${this.prefixCls}-category-rate`}>
                    <h3>
                        {'资产类型比例'}
                    </h3>
                    <div>
                        <AssetDetailCategoryRate />
                    </div>
                </div>
                <div className={`${this.prefixCls}-safe-rate`}>
                    <h3>
                        {'安全类别比例'}
                    </h3>
                    <div>
                        <AssetDetailSafeRate />
                    </div>
                </div>
                <div className={`${this.prefixCls}-analysis`}>
                    <h3>
                        {'资产配置汇总分析'}
                    </h3>
                    <div>
                        <AssetDetailAnalysis />
                    </div>
                </div>
            </Layout>
        );
    }
}

export default pageWithIntl(AssetDetail);
