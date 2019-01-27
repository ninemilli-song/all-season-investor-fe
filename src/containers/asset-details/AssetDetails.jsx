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
import AssetDialog, { AssetDialogAction } from './AssetDialog';

@inject('assets', 'investorId')
@observer
class AssetDetails extends React.Component {
  prefix = 'asset-detail-allocation';

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
          <a data-id={data.id} onClick={this.onEdit} role="presentation">
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

  // form对象引用
  formRef = null;

  constructor(props, context) {
    super(props, context);

    this.state = {
      assetDialogOpts: {
        visible: false,
        action: AssetDialogAction.NEW,
        data: null
      }
    };
  }

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
   * 新增资产
   */
  onAdd = () => {
    this.setState({
      assetDialogOpts: {
        visible: true,
        action: AssetDialogAction.NEW,
        data: null
      }
    });
  }

  /**
   * 编辑资产
   */
  onEdit = (e) => {
    const { assets } = this.props;
    const { assetsData } = assets;
    const { id } = e.currentTarget.dataset;

    const data = assetsData.find(item => item.id === Number(id));

    this.setState({
      assetDialogOpts: {
        visible: true,
        action: AssetDialogAction.EDIT,
        data
      }
    });
  };

  onCloseDialog = () => {
    this.closeDialog();
  };

  onDialogSubmit = () => {
    const { form } = this.formRef.props;

    form.validateFields((error, values) => {
      if (error) {
        return;
      }

      console.log('form submit value: ', values);
    });
  };

  /**
   * 关闭对话框
   */
  closeDialog = () => {
    this.setState({
      assetDialogOpts: {
        visible: false,
        action: AssetDialogAction.NEW,
        data: null
      }
    });
  };

    /**
     * 删除资产
     */
    onDelete = (id) => {
      console.log('onDelete id: ', id);
    };

  /**
   * 获取Form对象引用
   */
  saveFormRef = (formRef) => {
    this.formRef = formRef;
  };

  render() {
    const { assets } = this.props;
    const { assetDialogOpts } = this.state;

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
            <Button type="primary" icon="plus" onClick={this.onAdd}>添加新资产</Button>
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
        <AssetDialog
          {...assetDialogOpts}
          wrappedComponentRef={this.saveFormRef}
          onCancel={this.onCloseDialog}
          onOk={this.onDialogSubmit}
        />
      </div>
    );
  }
}

export default AssetDetails;
