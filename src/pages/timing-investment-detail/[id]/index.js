/**
 * 定投详情列表页
 */
import React from 'react';
// import { useRouter } from 'next/router';
import { Table } from 'antd';
import axios from '../../../util/api';

function TimingInvestmentDetail(props) {
    const { records } = props;

    // 表列定义
    const columnsDef = [
        {
            title: '基金',
            dataIndex: 'fund.name',
            render: value => <span>{ `${value}` }</span>,
        },
        {
            title: '定投时间',
            dataIndex: 'date_time',
            // key: 'sex',
            render: value => <span>{ `${value}` }</span>,
        },
        {
            title: '定投金额',
            dataIndex: 'amount',
            // key: 'mobile',
            render: value => <span>{ `${value}` }</span>,
        },
        {
            title: '市值',
            dataIndex: 'pv',
            // key: 'email',
            render: value => <span>{ `${value}` }</span>,
        },
        {
            title: '收益率',
            dataIndex: 'profitRate',
            // key: 'amount',
            render: value => <span>{ `${(value * 100).toFixed(2)}%` }</span>,
        },
        {
            title: '年化收益率',
            dataIndex: 'profitRateAnnual',
            // key: 'amount',
            render: value => <span>{ `${(value * 100).toFixed(2)}%` }</span>,
        }
    ];

    return (
        <div>
            <Table 
                dataSource={records} 
                columns={columnsDef}
                bordered
                size="small"
            />
        </div>
    );
}

TimingInvestmentDetail.getInitialProps = async ({ query }) => {
    const { id } = query;
    const res = await axios.get('invest-record/', {
        params: {
            fund: id
        }
    });

    return {
        'records': res
    };
};

export default TimingInvestmentDetail;
