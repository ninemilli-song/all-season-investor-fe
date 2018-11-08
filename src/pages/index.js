import React from 'react';
// import Link from 'next/link';
import { Provider } from 'mobx-react';
import { getSnapshot } from 'mobx-state-tree';
import pageWithIntl from '../components/PageWithIntl.js';
import initUserListStore from '../stores/AssetStore.js';
import Investors from '../containers/Investors';
import axios from '../util/api';
import Layout from '../components/Layout.js';

class Index extends React.Component {
    static async getInitialProps(req) {
        const isServer = !!req;
        
        const response = await axios.get('userList');
        const { data } = response;

        const initUserList = getSnapshot(initUserListStore(isServer, { investors: data }));

        return {
            isServer,
            initUserList
        };
    }

    constructor(props, context) {
        super(props, context);

        this.userList = initUserListStore(props.isServer, props.initUserList);
    }

    render() {
        return (
            <Provider investors={this.userList.investors}>
                <Layout title="Ant Design">
                    <Investors />
                </Layout>
            </Provider>
        );
    }
}

export default pageWithIntl(Index);
