import React from 'react';

class InvestorsModule extends React.Component {
    prefixCls = 'investors-module'

    render() {
        const { investors } = this.props;

        return (
            <div>
                {
                    investors && investors.map(item => (
                        <span>
                            {
                                `${item.name}-${item.amount}`
                            }
                        </span>
                    ))
                }
            </div>
        );
    }
}

export default InvestorsModule;
