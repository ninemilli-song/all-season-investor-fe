/**
 * 资产配置组件
 */
import React from 'react';
import { observer, inject } from 'mobx-react';
import {
    Table, Divider, Icon, Popconfirm, Button 
} from 'antd';
import { loggedIn } from '../../util/AuthService';
import LoadingIcon from '../../components/LoadingIcon';
import { TableEditableFormRow, TableEditableCell } from '../../components/TableEditableComponents';
import './style.scss';

@inject('assets', 'investorId')
@observer
class AssetDetails extends React.Component {
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
        {
            title: '操作',
            align: 'center',
            render: data => (
                <div>
                    <a data-data={data.id} onClick={this.onEdit} role="presentation">
                        <Icon type="edit" />
                    </a>
                    <Divider type="vertical" />
                    <a>
                        <Popconfirm 
                            title="亲！确定删除此资产么？" 
                            icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
                            data-data={data.id}
                            onConfirm={() => { this.onDelete(data.id); }}
                        >
                            <Icon type="delete" />
                        </Popconfirm>
                    </a>
                </div>
            )
        }
    ];

    paginationSize = 5;

    currentPage = 1;

    componentDidMount() {
        const { assets, investorId } = this.props;

        // load data
        assets.fetchAssets(investorId);
    }

    get totalAmount() {
        const { assets } = this.props;

        return assets.assetsData.reduce((accumultor, currentValue) => {
            return accumultor + currentValue.amount;
        }, 0);
    }

    handleSave = (row) => {
        const { assets } = this.props;
        const { id, amount } = row;

        assets.updateAsset(id, parseFloat(amount));
    }

    /**
     * 编辑资产
     */
    onEdit = (e) => {
        const data = e.currentTarget.dataset;
        console.log('onedit dataset: ', data);
    }

    /**
     * 删除资产
     */
    onDelete = (id) => {
        console.log('onDelete id: ', id);
    }

    render() {
        const { assets } = this.props;

        const { assetsData } = assets;

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

        const loading = !(assetsData.length > 0);

        return (
            <div className={`${this.prefix}`}>
                <h3>
                    {'资产配置'}
                </h3>
                <div className={`${this.prefix}-header clearfix`}>
                    <span className={`${this.prefix}-totalAmount`}>
                        {`总资产 -- ${this.totalAmount}`}
                    </span>
                    <div className={`${this.prefix}-operator floatRight`}>
                        <Button type="primary" icon="plus">添加新资产</Button>
                    </div>
                </div>
                <div>
                    <Table 
                        components={components}
                        rowClassName={() => 'editable-row'}
                        dataSource={assetsData} 
                        columns={columnsDef}
                        size="small"
                        // scroll={{ x: 500, y: 500 }}
                        bordered
                        loading={loading ? { indicator: LoadingIcon() } : false}
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

export default AssetDetails;
