import React from 'react';
import Head from 'next/head';
import { inject } from 'mobx-react';
import Header from './Header';
import Footer from './Footer';
import './layout.scss';

export default inject('store')(({ 
    title, 
    children, 
    store 
}) => (
    <div>
        <Head>
            <title>
                { title || '' }
            </title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta charSet="utf-8" />
            <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/antd/3.10.3/antd.min.css" />
        </Head>
        <style jsx global>
            {
                `body {

                }`
            }
        </style>
        <div className="asi-app">
            <Header userStore={store.user} />
            <div className="asi-body">
                { children }
            </div>
            <Footer />
        </div>
    </div>
));
