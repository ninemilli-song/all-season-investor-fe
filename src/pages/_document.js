import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { setApiConfig } from '../util/api';

// The document (which is SSR-only) needs to be customized to expose the locale
// data for the user's locale for React Intl to work in the browser.
export default class IntlDocument extends Document {
    static async getInitialProps(context) {
        const props = await super.getInitialProps(context);
        const { req: { locale, localeDataScript, apiHost } } = context;

        // 设置axios配置
        setApiConfig({
            baseURL: `${apiHost}api/`
        });

        return {
            ...props,
            locale,
            localeDataScript,
            apiHost
        };
    }

    render() {
    // Polyfill Intl API for older browsers
        const polyfill = `https://cdn.polyfill.io/v2/polyfill.min.js?features=Intl.~locale.${this.props.locale}`;

        return (
            <html>
                <Head />
                <body>
                    <Main />
                    <script src={polyfill} />
                    <script
                        dangerouslySetInnerHTML={{
                            __html: this.props.localeDataScript
                        }}
                    />
                    <script 
                        dangerouslySetInnerHTML={{
                            __html: `__API_HOST__ = "${this.props.apiHost}"`
                        }}
                    />
                    <NextScript />
                </body>
            </html>
        );
    } 
}
