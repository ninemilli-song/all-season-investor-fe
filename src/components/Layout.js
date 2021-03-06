import React from 'react';
import Head from 'next/head';
import { inject } from 'mobx-react';
import Navigator from './Navigator';
import Footer from './Footer';
import 'antd/dist/antd.css';
import './css/layout.scss';

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
        </Head>
        <style jsx global>
            {
                `body {

                }`
            }
        </style>
        <div className="asi-app">
            <Navigator userStore={store.user} />
            <div className="asi-body">
                { children }
            </div>
            <Footer />
        </div>
    </div>
));
