import React from 'react';
import { Table } from 'antd';

class InvestorsModule extends React.Component {
    prefixCls = 'investors-module';

    columnsDef = [
        {
            title: '姓名',
            dataInde: 'name',
            key: 'name',
            render: data => <a>{ data.name }</a>,
        },
        {
            title: '性别',
            dataInde: 'sex',
            key: 'sex',
            render: data => <span>{ data.sex }</span>,
        },
        {
            title: '手机',
            dataInde: 'mobile',
            key: 'mobile',
            render: data => <span>{ data.mobile }</span>,
        },
        {
            title: '电子邮箱',
            dataInde: 'email',
            key: 'email',
            render: data => <span>{ data.email }</span>,
        },
        {
            title: '资产',
            dataInde: 'amount',
            key: 'amount',
            render: data => <span>{ data.amount }</span>,
        },
    ];

    render() {
        const { investors } = this.props;

        return (
            <div>
                <Table 
                    dataSource={investors} 
                    columns={this.columnsDef}
                    bordered
                    title={() => ''}
                    footer={() => ''}
                />
            </div>
            
        );
    }
}

export default InvestorsModule;
