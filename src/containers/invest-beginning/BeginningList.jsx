import React from 'react';
import {
    Table,
    Popconfirm,
    Icon,

} from 'antd';
import { formatCurrency, formatDatetime } from '../../util/common';

/**
 * 期初数据列表
 */
const BeginningList = (props) => {
    const prefixCls = 'beginning-list';
    const { data, onDeleteRecord } = props;

    // 表列定义
    const columnsDef = [
        {
            title: '标的名称',
            dataIndex: 'fund',
            render: fund => <span>{ `${fund.name}(${fund.code})` }</span>,
        },
        {
            title: '起投时间',
            dataIndex: 'start_time',
            align: 'right',
            render: value => <span>{ `${formatDatetime(parseFloat(value) * 1000, 'YYYY/MM/DD')}` }</span>,
        },
        {
            title: '起投金额（￥）',
            dataIndex: 'start_amount',
            align: 'right',
            render: value => <span>{ `￥${formatCurrency(parseFloat(value))}` }</span>,
        },
        {
            title: '删除',
            dataIndex: 'id',
            align: 'center',
            render: value => (
                <div>
                    <a>
                        <Popconfirm
                            title="确定删除此条记录么？"
                            icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
                            data-data={value}
                            onConfirm={() => {
                                onDeleteRecord(value);
                            }}
                        >
                            <Icon type="delete" />
                        </Popconfirm>
                    </a>
                </div>
            ),
        }
    ];

    return (
        <div>
            <h3 className={`${prefixCls}-title h3-title`}>
                定投期初明细
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
};

export default BeginningList;
