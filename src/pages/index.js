import React from 'react';
// import Link from 'next/link';
import { Provider } from 'mobx-react';
import { getSnapshot } from 'mobx-state-tree';
import pageWithIntl from '../components/PageWithIntl.js';
import initUserListStore from '../stores/AssetStore.js';
import Investors from '../containers/Investors';
import axios from '../util/api';
import './index.scss';

class Index extends React.Component {
    static async getInitialProps({ req }) {
        const isServer = !!req;

        console.log('🚥 ------> page getInitialProps');
        
        const data = await axios.get('investors').catch(error => console.log('catch errorrr ------> ', error));
        // const { data } = response;

        const initUserList = getSnapshot(initUserListStore(isServer, { investors: data || [] }));

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
                <Investors />
            </Provider>
        );
    }
}

export default pageWithIntl(Index);
