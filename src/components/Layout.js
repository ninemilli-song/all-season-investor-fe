import React from 'react';
import Head from 'next/head';

export default ({ title, children }) => (
    <div>
        <Head>
            <title>
                { title }
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
        <div>
            { children }
        </div>
    </div>
);
