import React from 'react';
import { inject, observer } from 'mobx-react';
import { getSnapshot } from 'mobx-state-tree';
import Link from 'next/link';
import { Table } from 'antd';

@inject('investors')
@observer
class InvestorsContainer extends React.Component {
    prefixCls = 'investors';

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

        // 处理数据添加key
        const datas = getSnapshot(investors).map((item) => {
            return Object.assign({}, item, {
                key: item.id
            });
        });

        return (
            <div className={`${this.prefixCls}`}>
                <Table 
                    dataSource={datas} 
                    columns={this.columnsDef}
                    bordered
                    title={() => ''}
                    footer={() => ''}
                />
            </div>
        );
    }
}

export default InvestorsContainer;
