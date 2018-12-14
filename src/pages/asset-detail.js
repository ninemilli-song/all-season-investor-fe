import React from 'react';
import { Provider } from 'mobx-react';
// import { getSnapshot } from 'mobx-state-tree';
import {
    FormattedMessage
} from 'react-intl';
import pageWithIntl from '../components/PageWithIntl.js';
import AssetDetailAllocation from '../containers/AssetDetailAllocation';
import AssetDetailCategoryRate from '../containers/AssetDetailCategoryRate';
import AssetDetailSafeRate from '../containers/AssetDetailSafeRate';
import AssetDetailAnalysis from '../containers/AssetDetailAnalysis';
import initUserListStore from '../stores/AssetStore.js';
import './asset-detail.scss';

class AssetDetail extends React.Component {
    static async getInitialProps({ req, query }) {
        const isServer = !!req;

        console.log('Page AssetDetail is server render ? ', isServer);

        return {
            title: 'User Asset Detail',
            isServer,
            investorId: query.id
        };
    }

    prefixCls = 'asset-detail'

    constructor(props, context) {
        super(props, context);

        this.assetsStore = initUserListStore(props.isServer);
    }

    render() {
        const { investorId } = this.props;
        return (
            <Provider assets={this.assetsStore} investorId={investorId}>
                <div className={`${this.prefixCls}`}>
                    <div className={`${this.prefixCls}-header`}>
                        <h2>
                            <FormattedMessage id="pageTitle" defaultMessage="Asset Analysis" />
                        </h2>
                        <span>
                            {'资产配置以及资产分析'}
                        </span>
                    </div>
                    <div className={`${this.prefixCls}-allocation`}>
                        <AssetDetailAllocation />
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
                </div>
            </Provider>
        );
    }
}

export default pageWithIntl(AssetDetail);
