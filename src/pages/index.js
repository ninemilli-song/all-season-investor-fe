import React from 'react';
// import Link from 'next/link';
import { Provider } from 'mobx-react';
import { getSnapshot } from 'mobx-state-tree';
import pageWithIntl from '../components/PageWithIntl.js';
import initUserListStore from '../stores/AssetStore.js';
import Investors from '../containers/investors';
import axios from '../util/api';
// import withAuth from '../util/withAuth';
import './index.scss';

class Index extends React.Component {
    static async getInitialProps({ req }) {
        const isServer = !!req;
        console.log('Index AssetDetail is server render ? ', isServer);

        const initUserList = getSnapshot(initUserListStore(isServer, {
            investors: [],
            loading: false
        }));

        return {
            title: 'Home Page',
            isServer,
            initUserList
        };
    }

    constructor(props, context) {
        super(props, context);

        const userList = initUserListStore(props.isServer, props.initUserList);
        this.state = {
            userList
        };
    }

    async componentDidMount() {
        const { isServer } = this.props;
        // 在componentDidMount中获取异步数据
        // 解决服务器渲染时发送请求无法携带浏览器中token的问题
        const data = await axios.get('profile');

        const initUserList = initUserListStore(isServer, {
            investors: data || [],
            loading: false
        });

        this.setState({
            userList: initUserList
        });
    }

    render() {
        const { userList } = this.state;

        return (
            <Provider investors={userList.investors}>
                <Investors />
            </Provider>
        );
    }
}

export default pageWithIntl(Index);
