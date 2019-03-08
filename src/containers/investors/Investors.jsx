import React from 'react';
import { inject, observer } from 'mobx-react';
import { getSnapshot } from 'mobx-state-tree';
import Link from 'next/link';
import { Table } from 'antd';

@inject(stores => ({
    asset: stores.store.asset
}))
@observer
class InvestorsContainer extends React.Component {
    prefixCls = 'investors';

    // 表列定义
    columnsDef = [
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <Link href={{ pathname: '/asset-detail', query: { id: record.id } }}>
                    <a>{text}</a>
                </Link>
            ),
        },
        {
            title: '性别',
            dataIndex: 'sex',
            key: 'sex',
            render: data => <span>{ data }</span>,
        },
        {
            title: '手机',
            dataIndex: 'mobile',
            key: 'mobile',
            render: data => <span>{ data }</span>,
        },
        {
            title: '电子邮箱',
            dataIndex: 'email',
            key: 'email',
            render: data => <span>{ data }</span>,
        },
        {
            title: '资产',
            dataIndex: 'amount',
            key: 'amount',
            render: data => <span>{ data }</span>,
        }
    ];

    async componentDidMount() {
        // 在componentDidMount中获取异步数据
        // 解决服务器渲染时发送请求无法携带浏览器中token的问题
        const { asset } = this.props;

        asset.fetchInvestors();
    }

    render() {
        const { asset } = this.props;
        const { investors } = asset;

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
