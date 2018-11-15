import React from 'react';
import { Table } from 'antd';

class AssetDetailAllocation extends React.Component {
    prefix = 'asset-detail-allocation'

    // 表列定义
    columnsDef = [
        {
            title: '序号',
            dataIndex: 'id',
            key: 'type.code',
            render: (text, row, index) => (
                <span>
                    { (this.currentPage - 1) * this.paginationSize + index + 1 }
                </span>
            )
        },
        {
            title: '名称',
            dataIndex: 'type.name',
            key: 'type.name',
        },
        {
            title: '类型',
            dataIndex: 'type.type.name',
            key: 'type.type.name',
        },
        {
            title: '安全类别',
            dataIndex: 'type.type.bucket.name',
            key: 'type.type.bucket.name',
        },
        {
            title: '资产',
            dataIndex: 'amount',
            key: 'amount',
            align: 'right'
        },
    ];

    paginationSize = 5;

    currentPage = 1;

    get totalAmount() {
        const { data } = this.props;

        return data.reduce((accumultor, currentValue) => {
            return accumultor + currentValue.amount;
        }, 0);
    }

    render() {
        const { data } = this.props;

        return (
            <div className={`${this.prefix}`}>
                <h3>
                    {'资产配置'}
                </h3>
                <span>
                    {`总资产 -- ${this.totalAmount}`}
                </span>
                <div>
                    <Table 
                        dataSource={data} 
                        columns={this.columnsDef}
                        size="small"
                        bordered
                        pagination={{
                            pageSize: this.paginationSize,
                            size: 'small'
                        }}
                        onChange={(pagination) => {
                            const { current } = pagination;
                            this.currentPage = current;
                        }}
                    />
                </div>
            </div>
        );
    }
}

export default AssetDetailAllocation;
