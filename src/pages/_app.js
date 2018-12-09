import React from 'react';
import App, { Container } from 'next/app';
import axios from '../util/api';

export default class CustomApp extends App {
    static async getInitialProps({ Component, ctx }) {
        let pageProps = {};

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }

        const userInfo = await axios.get('auth/userInfo');

        console.log('customApp -----> getsInitialProps: ', userInfo);

        return { pageProps };
    }

    render() {
        const { Component, pageProps } = this.props;

        return (
            <Container>
                <Component {...pageProps} />
            </Container>
        );
    }
}
