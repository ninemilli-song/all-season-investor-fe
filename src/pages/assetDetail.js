import React from 'react';
import {
    FormattedMessage
} from 'react-intl';
import Layout from '../components/Layout.js';
import pageWithIntl from '../components/PageWithIntl.js';

class AssetDetail extends React.Component {
    static async getInitialProps({ req }) {
        return {
            isServer: !!req
        };
    }

    render() {
        return (
            <Layout title="All season investor">
                <FormattedMessage id="assetDetailPage" defaultMessage="Hello AssetDetail!" />
            </Layout>
        );
    }
}

export default pageWithIntl(AssetDetail);
