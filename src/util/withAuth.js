/**
 * A HOC for protected pages
 */
import React from 'react';
import AuthService from './AuthService';

export default function withAuth(AuthComponent) {
    const Auth = new AuthService();

    return class Authenticated extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                isLoading: true
            };
        }

        componentDidMount() {
            const { url } = this.props;
            if (!Auth.loggedIn()) {
                url.replaceTo('/');
            }
            this.setState({
                isLoading: false
            });
        }

        render() {
            const { isLoading } = this.state;

            return (
                <div>
                    {
                        isLoading ? (
                            <div>LOADING......</div>
                        ) : (
                            <AuthComponent {...this.props} auth={Auth} />
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
