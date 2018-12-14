import React from 'react';
import { observer } from 'mobx-react';
import Link from 'next/link';
import { loggedIn } from '../util/AuthService';

@observer
class Header extends React.Component {
    prefixCls = 'asi-header'

    state = {
        logged: false
    }

    defaultProps = {
        userStore: {}
    }

    componentDidMount() {
        this.setState({
            logged: loggedIn()
        });
    }

    logout = () => {
        const { userStore } = this.props;

        userStore.doLogout();
    }

    render() {
        const { userStore } = this.props;
        const { logged } = this.state;

        return (
            <div className={this.prefixCls}>
                <div className={`${this.prefixCls}-nav`}>
                    <ul>
                        <li>Home</li>
                        <li>AssetDetial</li>
                    </ul>
                </div>
                <div className={`${this.prefixCls}-user`}>
                    {
                        userStore.id && logged ? (
                            <span>
                                Hi!, 
                                {userStore.username}
                                <a role="presentation" onClick={this.logout}>logout</a>
                            </span>
                        ) : (
                            <span>
                                <Link href="/login">
                                    <a>signin</a>
                                </Link>
                            </span>
                        )
                    }
                </div>
            </div>
        );
    }
}

export default Header;
