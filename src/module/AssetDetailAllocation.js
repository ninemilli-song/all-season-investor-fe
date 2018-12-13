import React from 'react';
import { Table } from 'antd';
import PropTypes from 'prop-types';
import { TableEditableFormRow, TableEditableCell } from '../components/TableEditableComponents';
import { loggedIn } from '../util/AuthService';
import './assetDetailAllocation.scss';

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
            align: 'right',
            width: 200,
            editable: true
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

    handleSave = (row) => {
        const { onAmountEdited } = this.props;
        const { id, amount } = row;

        onAmountEdited(id, parseFloat(amount));
    }

    render() {
        const { data } = this.props;

        const components = {
            body: {
                row: TableEditableFormRow,
                cell: TableEditableCell
            }
        };

        const columnsDef = this.columnsDef.map((col) => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    editable: loggedIn() ? col.editable : false,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleSave
                })
            };
        });

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
                        components={components}
                        rowClassName={() => 'editable-row'}
                        dataSource={data} 
                        columns={columnsDef}
                        size="small"
                        bordered
                        pagination={{
                            pageSize: this.paginationSize,
                            // size: 'small'
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

AssetDetailAllocation.propTypes = {
    data: PropTypes.arrayOf(Object).isRequired,
    onAmountEdited: PropTypes.func.isRequired
};

export default AssetDetailAllocation;
