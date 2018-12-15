import React from 'react';
import { observer } from 'mobx-react';
import Link from 'next/link';

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
                        <li>Home</li>
                        <li>AssetDetial</li>
                    </ul>
                </div>
                <div className={`${this.prefixCls}-user`}>
                    {
                        userStore.id ? (
                            <span>
                                Hi!, 
                                {userStore.name}
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
