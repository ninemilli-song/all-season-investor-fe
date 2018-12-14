import React from 'react';
import App, { Container } from 'next/app';
import { getSnapshot } from 'mobx-state-tree';
import Layout from '../components/Layout';
import { loggedIn, getProfile } from '../util/AuthService';
import initUserListStore from '../stores/UserStore';

export default class CustomApp extends App {
    static async getInitialProps({ Component, ctx }) {
        let pageProps = {};

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }

        let userProfile = null;
        console.log('is loggedin ------> ', loggedIn());
        if (loggedIn()) {
            userProfile = getProfile();
        }

        const isServer = !!ctx.req;
        const userInfo = getSnapshot(initUserListStore(isServer, userProfile));

        return { pageProps, userInfo, isServer };
    }

    constructor(props, context) {
        super(props, context);

        this.userInfo = initUserListStore(props.isServer, props.userInfo);
    }

    componentDidMount() {
        
    }

    render() {
        const { Component, pageProps } = this.props;

        return (
            <Container>
                <Layout title={pageProps.title} userStore={this.userInfo}>
                    <Component {...pageProps} userInfo={this.userInfo} />
                </Layout>
            </Container>
        );
    }
}
