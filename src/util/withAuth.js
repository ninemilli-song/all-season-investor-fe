/**
 * A HOC for protected pages
 * 1. create userstore and pass userstore to the
 */
import React from 'react';
import Router from 'next/router';
import { inject, observer } from 'mobx-react';
import { loggedIn } from './AuthService';

export default function withAuth(AuthComponent) {
    @inject(stores => ({
        user: stores.store.user
    }))
    @observer
    class Authenticated extends React.Component {
        static async getInitialProps(ctx) {
            let pageProps = {};

            if (AuthComponent.getInitialProps) {
                pageProps = await AuthComponent.getInitialProps(ctx);
            }

            return { ...pageProps };
        }

        componentDidMount() {
            this.loggedInChangeState();
        }

        componentDidUpdate() {
            this.loggedInChangeState();
        }

        gotoLogin = () => {
            Router.push('/login');
        };

        /**
         * 如果用户已登陆则改变loading状态
         * 否则跳转login页面
         */
        loggedInChangeState = () => {
            if (!loggedIn()) {
                this.gotoLogin();
            }
        };

        render() {
            const { user, ...other } = this.props;

            return (
                <div>
                    {
                        user && user.id ? (
                            <AuthComponent {...other} />
                        ) : (
                            <div>未登录......</div>
                        )
                    }
                </div>
            );
        }
    }

    return Authenticated;
}

// // example of a protected page
// import React from 'react'
// import withAuth from  '../utils/withAuth'

// class Dashboard extends Component {
//    render() {
//      const user = this.props.auth.getProfile()
//      return (
//          <div>Current user: {user.email}</div>
//      )
//    }
// }

// export default withAuth(Dashboard)
