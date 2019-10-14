import React from 'react';
import App from 'next/app';
import Router from 'next/router';
import { Provider } from 'mobx-react';
import { getSnapshot } from 'mobx-state-tree';
import Layout from '../components/Layout';
import { loggedIn, getProfile } from '../util/AuthService';
import initAppStore from '../stores/AppStore';
import 'normalize.css';
import '../static/styles/global.scss';

export default class CustomApp extends App {
    static async getInitialProps({ Component, ctx }) {
        let pageProps = {};

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }

        // const userProfile = null;

        const isServer = !!ctx.req;
        const appInfo = getSnapshot(initAppStore(isServer));

        return { pageProps, appInfo, isServer };
    }

    constructor(props, context) {
        super(props, context);

        this.appStore = initAppStore(props.isServer, props.appInfo);
    }

    componentDidMount() {
        const { isServer } = this.props;
        console.log('_app said: Am i Server render ?', isServer);
        let userProfile = null;
        
        if (loggedIn()) {
            userProfile = getProfile();
        }

        this.appStore.user.update(userProfile);
    }

    render() {
        const { Component, pageProps } = this.props;

        return (
            <Provider store={this.appStore}>
                <Layout title={pageProps.title}>
                    <Component {...pageProps} />
                </Layout>
            </Provider>
        );
    }
}

/**
 * 解决Router跳转页面后client render加载的css无效果的问题
 * on every page reloads css after router change
 * https://github.com/zeit/next-plugins/issues/282
 */
Router.events.on('routeChangeComplete', () => {
    if (process.env.NODE_ENV !== 'production') {
        const els = document.querySelectorAll('link[href*="/_next/static/css/styles.chunk.css"]');
        const timestamp = new Date().valueOf();
        els[0].href = `/_next/static/css/styles.chunk.css?v=${timestamp}`;
    }
});
