import React from 'react';
// import Link from 'next/link';
import pageWithIntl from '../components/PageWithIntl.js';
import Investors from '../containers/investors';
import './index.scss';

class Index extends React.Component {
    static async getInitialProps() {
        return {
            title: 'Home Page',
        };
    }

    render() {
        return (
            <Investors />
        );
    }
}

export default pageWithIntl(Index);
