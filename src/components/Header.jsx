import React from 'react';
import { observer } from 'mobx-react';
import Link from 'next/link';
import { loggedIn } from '../util/AuthService';
import './css/header.scss';

@observer
class Header extends React.Component {
    prefixCls = 'asi-header'

    static defaultProps = {
        userStore: {}
    }

    logout = () => {
        const { userStore } = this.props;

        userStore.doLogout();
    }

    render() {
        const { userStore } = this.props;
        console.log('Header render------> ', userStore);

        return (
            <div className={this.prefixCls}>
                <div className={`${this.prefixCls}-nav`}>
                    <ul>
                        <li>
                            <Link href="/">
                                <a>Home</a>
                            </Link>
                        </li>
                        <li>AssetDetial</li>
                        {
                            loggedIn() ? (
                                <li>
                                    <Link href="/period-edit">
                                        <a>定投期初</a>
                                    </Link>
                                </li>
                            ) : null
                        }
                        {
                            loggedIn() ? (
                                <li>
                                    <Link href="/timing-investment">
                                        <a>定投</a>
                                    </Link>
                                </li>
                            ) : null
                        }
                    </ul>
                </div>
                <div className={`${this.prefixCls}-user`}>
                    {
                        userStore.id ? (
                            <span className={`${this.prefixCls}-user-info`}>
                                Hi!, 
                                <Link href="/login">
                                    <a>{userStore.name}</a>
                                </Link>
                                <a 
                                    className={`${this.prefixCls}-user-action`} 
                                    role="presentation" 
                                    onClick={this.logout}
                                >
                                    logout
                                </a>
                            </span>
                        ) : (
                            <span className={`${this.prefixCls}-user-action`}>
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
