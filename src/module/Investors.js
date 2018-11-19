import React from 'react';
import { Table } from 'antd';
import Link from 'next/link';

class InvestorsModule extends React.Component {
    prefixCls = 'investors-module';

    // 表列定义
    columnsDef = [
        {
            title: '姓名',
            dataInde: 'name',
            key: 'name',
            render: data => (
                <Link href={{ pathname: '/asset-detail', query: { id: data.id } }}>
                    <a>{data.name}</a>
                </Link>
            ),
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
