import React from 'react';
import pageWithIntl from '../components/PageWithIntl.js';
import PageHeader from '../components/PageHeader';
import './index.scss';

class Index extends React.Component {
    static async getInitialProps() {
        return {
            title: 'Home Page',
        };
    }

    render() {
        return (
            <div>
                <PageHeader
                    name="首页"
                />
                <div className="common-body">
                    Hello! You are a intelligent investor!
                </div>
            </div>
        );
    }
}

export default pageWithIntl(Index);
