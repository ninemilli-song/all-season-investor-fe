/**
 * 单支基金定投明细列表
 * 罗列每笔基金定投详情数据
 * 包含：
 * 1. 买入时间
 * 2. 买入金额
 * 3. 当时本金
 * 4. 当时市值
 * 5. 当时收益
 * 6. 当时收益率
 * 7. 当时年化收益率
 * 8. 备注
 */
import React from 'react';
import { Table } from 'antd';
import { formatDatetime, formatCurrency } from '../../util/common';
import './timing-investment-detail-list.scss';

function TimingInvestmentDetailList(props) {
    const { data } = props;
    const prefixCls = 'timing-investment-detail-list';

    // 表列定义
    const columnsDef = [
        {
            title: '定投时间',
            dataIndex: 'date_time',
            // key: 'sex',
            render: value => <span>{ `${formatDatetime(parseFloat(value) * 1000, 'YYYY/MM/DD')}` }</span>,
        },
        {
            title: '定投金额（￥）',
            dataIndex: 'amount',
            align: 'right',
            // key: 'mobile',
            render: value => <span>{ `${formatCurrency(value)}` }</span>,
        },
        {
            title: '市值（￥）',
            dataIndex: 'pv',
            align: 'right',
            // key: 'email',
            render: value => <span>{ `${formatCurrency(value)}` }</span>,
        },
        {
            title: '收益率（%）',
            dataIndex: 'cur_profit_rate',
            align: 'right',
            // key: 'amount',
            render: value => <span>{ `${(value * 100).toFixed(2)}` }</span>,
        },
        {
            title: '年化收益率（%）',
            dataIndex: 'profit_rate_annual',
            align: 'right',
            // key: 'amount',
            render: value => <span>{ `${(value * 100).toFixed(2)}` }</span>,
        }
    ];

    return (
        <div className={`${prefixCls}`}>
            <h3 className={`${prefixCls}-title`}>
                定投明细
            </h3>
            <Table 
                rowKey="id"
                dataSource={data} 
                columns={columnsDef}
                bordered
                size="small"
            />
        </div>
    );
}

export default TimingInvestmentDetailList;
