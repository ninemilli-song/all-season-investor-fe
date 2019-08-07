/**
 * A HOC for protected pages
 * 1. create userstore and pass userstore to the
 */
import React from 'react';
import Router from 'next/router';
import { loggedIn } from './AuthService';

export default function withAuth(AuthComponent) {
    return class Authenticated extends React.Component {
        static async getInitialProps(ctx) {
            let pageProps = {};
    
            if (AuthComponent.getInitialProps) {
                pageProps = await AuthComponent.getInitialProps(ctx);
            }
    
            return { ...pageProps };
        }

        constructor(props) {
            super(props);

            this.state = {
                isLoading: true
            };
        }

        componentDidMount() {
            this.loggedInChangeState();
        }

        componentWillReceiveProps() {
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
            } else {
                this.setState({
                    isLoading: false
                });
            }
        };

        render() {
            const { isLoading } = this.state;

            return (
                <div>
                    {
                        isLoading ? (
                            <div>未登录......</div>
                        ) : (
                            <AuthComponent {...this.props} />
                        )
                    }
                </div>
            );
        }
    };
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
