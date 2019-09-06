import React from 'react';
import { Provider } from 'mobx-react';
// import { getSnapshot } from 'mobx-state-tree';
// import {
//     Icon, Spin
// } from 'antd';
import {
    FormattedMessage
} from 'react-intl';
import { observer } from 'mobx-react/index';
import pageWithIntl from '../components/PageWithIntl.js';
import AssetDetailAllocation from '../containers/asset-details';
import AssetDetailAnalysis from '../containers/asset-analysis';
import './css/asset-detail.scss';
import withAuth from '../util/withAuth';

@observer
class AssetDetail extends React.Component {
    static async getInitialProps({ req, query }) {
        const isServer = !!req;

        return {
            title: 'User Asset Detail',
            isServer,
            // investorId: query.id
        };
    }

    prefixCls = 'asset-detail';

    render() {
        // const { investorId } = this.props;
        // const spinIcon = (<Icon type="loading" style={{ fontSize: 24 }} spin />);

        return (
            <Provider>
                {/* <Spin indicator={spinIcon} spinning={this.assetsStore.loading}> */}
                <div className={`${this.prefixCls}`}>
                    <div className={`${this.prefixCls}-header`}>
                        <h2>
                            <FormattedMessage id="pageTitle" defaultMessage="Asset Analysis" />
                        </h2>
                    </div>
                    <div className={`${this.prefixCls}-allocation`}>
                        <AssetDetailAllocation />
                    </div>
                    <div className={`${this.prefixCls}-category-rate`}>
                        <AssetDetailAnalysis />
                    </div>
                </div>
                {/* </Spin> */}
            </Provider>
        );
    }
}

export default withAuth(pageWithIntl(AssetDetail));
