import React from 'react';
import App, { Container } from 'next/app';
import Router from 'next/router';
import { getSnapshot } from 'mobx-state-tree';
import Layout from '../components/Layout';
import { loggedIn, getProfile } from '../util/AuthService';
import initUserListStore from '../stores/UserStore';
import 'normalize.css';
import '../static/styles/global.scss';

export default class CustomApp extends App {
    static async getInitialProps({ Component, ctx }) {
        let pageProps = {};

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }

        const userProfile = null;

        const isServer = !!ctx.req;
        const userInfo = getSnapshot(initUserListStore(isServer, userProfile));

        return { pageProps, userInfo, isServer };
    }

    constructor(props, context) {
        super(props, context);

        this.userStore = initUserListStore(props.isServer, props.userInfo);
    }

    componentDidMount() {
        const { isServer } = this.props;
        console.log('_app said: where am i invoke?', isServer);
        let userProfile = null;
        
        if (loggedIn()) {
            userProfile = getProfile();
        }

        // this.userStore = initUserListStore(isServer, userProfile);
        this.userStore.update(userProfile);
        // this.userStore.username = userProfile.username;
        // this.userStore.id = userProfile.id;
    }

    render() {
        const { Component, pageProps } = this.props;

        return (
            <Container>
                <Layout title={pageProps.title} userStore={this.userStore}>
                    <Component {...pageProps} userStore={this.userStore} />
                </Layout>
            </Container>
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
