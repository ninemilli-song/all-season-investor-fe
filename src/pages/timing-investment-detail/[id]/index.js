/**
 * 定投详情列表页
 */
import React from 'react';
import { useRouter } from 'next/router';
import { Table } from 'antd';
import axios from '../../../util/api';
import { formatDatetime, formatCurrency } from '../../../util/common';
import PageHeader from '../../../components/PageHeader';
import TimingInvestmentFormWrapped from '../../../containers/timing-investment/timing-investment-form';
import useTimingInvestmentRecord from '../../../effects/timing-investment-record';

function TimingInvestmentDetail() {
    // const { records } = props;

    // const prefixCls = 'timeing-investment-detail';

    // 表列定义
    const columnsDef = [
        {
            title: '定投时间',
            dataIndex: 'date_time',
            // key: 'sex',
            render: value => <span>{ `${formatDatetime(parseFloat(value) * 1000, 'YYYY/MM/DD')}` }</span>,
        },
        {
            title: '定投金额',
            dataIndex: 'amount',
            align: 'right',
            // key: 'mobile',
            render: value => <span>{ `${formatCurrency(value)}` }</span>,
        },
        {
            title: '市值',
            dataIndex: 'pv',
            align: 'right',
            // key: 'email',
            render: value => <span>{ `${formatCurrency(value)}` }</span>,
        },
        {
            title: '收益率',
            dataIndex: 'cur_profit_rate',
            align: 'right',
            // key: 'amount',
            render: value => <span>{ `${(value * 100).toFixed(2)}%` }</span>,
        },
        {
            title: '年化收益率',
            dataIndex: 'profit_rate_annual',
            align: 'right',
            // key: 'amount',
            render: value => <span>{ `${(value * 100).toFixed(2)}%` }</span>,
        }
    ];

    const router = useRouter();
    /**
     * name - 基金名称
     * id - 基金id
     */
    const { name, id } = router.query;
    // 获取定投记录列表数据
    const [records, fetchData] = useTimingInvestmentRecord(id);

    return (
        <div>
            <PageHeader
                name={name}
            />
            <div className="common-body">
                <TimingInvestmentFormWrapped 
                    fundId={id}
                    onSubmited={() => fetchData(id)}
                />
                <Table 
                    rowKey="id"
                    dataSource={records} 
                    columns={columnsDef}
                    bordered
                    size="small"
                />
            </div>
        </div>
    );
}

// TimingInvestmentDetail.getInitialProps = async ({ query }) => {
//     const { id, name } = query;
//     const res = await axios.get('invest-record/', {
//         params: {
//             fund: id
//         }
//     });

//     return {
//         'records': res,
//         name
//     };
// };

export default TimingInvestmentDetail;
