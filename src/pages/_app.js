import React from 'react';
import App, { Container } from 'next/app';
import axios from '../util/api';
import Layout from '../components/Layout';

export default class CustomApp extends App {
    static async getInitialProps({ Component, ctx }) {
        let pageProps = {};

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }

        const userInfo = await axios.get('auth/userInfo');

        console.log('customApp -----> getsInitialProps: ', userInfo);

        return { pageProps, userInfo: userInfo || {} };
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
