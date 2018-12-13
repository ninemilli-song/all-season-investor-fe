import React from 'react';
import App, { Container } from 'next/app';
import Layout from '../components/Layout';
import { loggedIn, getProfile } from '../util/AuthService';

export default class CustomApp extends App {
    static async getInitialProps({ Component, ctx }) {
        let pageProps = {};

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }

        let userInfo = {};
        if (loggedIn()) {
            userInfo = getProfile();
        }

        return { pageProps, userInfo };
    }

    render() {
        const { Component, pageProps, userInfo } = this.props;

        return (
            <Container>
                <Layout title="React Intl">
                    <Component {...pageProps} userInfo={userInfo} />
                </Layout>
            </Container>
        );
    }
}
