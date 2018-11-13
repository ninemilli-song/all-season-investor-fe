import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';

// The document (which is SSR-only) needs to be customized to expose the locale
// data for the user's locale for React Intl to work in the browser.
export default class IntlDocument extends Document {
    static async getInitialProps(context) {
        const props = await super.getInitialProps(context);
        const { req: { locale, localeDataScript } } = context;
        console.log('_document >>>>>>>>>> ', context);

        return {
            ...props,
            locale,
            localeDataScript
        };
    }

    render() {
    // Polyfill Intl API for older browsers
        console.log('_document render >>>>>>>>>> ');
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
