import React from 'react';
// import Link from 'next/link';
import { Provider } from 'mobx-react';
import { getSnapshot } from 'mobx-state-tree';
import pageWithIntl from '../components/PageWithIntl.js';
import initUserListStore from '../stores/AssetStore.js';

class Index extends React.Component {
    static async getInitialProps(req) {
        const isServer = !!req;
        const initUserList = getSnapshot(initUserListStore(isServer));

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
            <Provider userList={this.userList}>
                <div>
                    {
                        this.userList.users.map((item) => {
                            return (
                                <span>
                                    { `${item.name} - ${item.amount}` }
                                </span>
                            );
                        })
                    }
                </div>
            </Provider>
        );
    }
}

export default pageWithIntl(Index);
