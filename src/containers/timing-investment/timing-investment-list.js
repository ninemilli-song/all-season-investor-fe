/**
 * 定投的基金列表
 * 罗列出所有基金的概况
 * 包括以下信息：
 * 1. 基金名
 * 2. 当前基金本金
 * 3. 当前基金市值
 * 4. 当前基金收益
 * 5. 当前基金收益率
 * 6. 当前基金年化收益率
 */
import React from 'react';
import { Table } from 'antd';
import Link from 'next/link';

function TimingInvestmentList(props) {
    const { data } = props;
    // const data = [
    //     {
    //         fund: {
    //             id: 7,
    //             name: '中欧创新成长灵活配置混合A',
    //             code: '005275',
    //         },
    //         principal: 100,
    //         pv: 200,
    //         profit: 100,
    //         profitRate: 1,
    //         profitRateAnnual: 1
    //     }
    // ];

    // 表列定义
    const columnsDef = [
        {
            title: '基金',
            dataIndex: 'assetType.name',
            // key: 'name',
            render: (text, record) => (
                <Link href={{ pathname: '/timing-investment-detail/[id]', query: { name: record.assetType.name } }} as={`/timing-investment-detail/${record.assetType.id}`}>
                    <a>{text}</a>
                </Link>
            ),
        },
        {
            title: '本金',
            dataIndex: 'principal',
            align: 'right',
            // key: 'sex',
            render: value => <span>{ `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }</span>,
        },
        {
            title: '最新市值',
            dataIndex: 'pv',
            align: 'right',
            // key: 'mobile',
            render: value => <span>{ `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }</span>,
        },
        {
            title: '收益',
            dataIndex: 'profit',
            align: 'right',
            // key: 'email',
            render: value => <span>{ `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }</span>,
        },
        {
            title: '收益率',
            dataIndex: 'profitRate',
            align: 'right',
            // key: 'amount',
            render: value => <span>{ `${(value * 100).toFixed(2)}%` }</span>,
        },
        {
            title: '年化收益率',
            dataIndex: 'profitRateAnnual',
            align: 'right',
            // key: 'amount',
            render: value => <span>{ `${(value * 100).toFixed(2)}%` }</span>,
        }
    ];

    return (
        <div className="timing-investment-list">
            <Table 
                rowKey={record => record.assetType.id}
                dataSource={data} 
                columns={columnsDef}
                bordered
                size="small"
            />
        </div>
    );
}

export default TimingInvestmentList;
