import React from 'react';
import { Provider } from 'mobx-react';
// import { getSnapshot } from 'mobx-state-tree';
import {
    FormattedMessage
} from 'react-intl';
import pageWithIntl from '../components/PageWithIntl.js';
import AssetDetailAllocation from '../containers/asset-details';
import AssetDetailAnalysis from '../containers/asset-analysis';
import initUserListStore from '../stores/AssetStore.js';
import './css/asset-detail.scss';
import withAuth from '../util/withAuth';

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
                  </div>
                  <div className={`${this.prefixCls}-allocation`}>
                      <AssetDetailAllocation />
                  </div>
                  <div className={`${this.prefixCls}-category-rate`}>
                      <AssetDetailAnalysis />
                  </div>
              </div>
          </Provider>
      );
  }
}

export default withAuth(pageWithIntl(AssetDetail));
