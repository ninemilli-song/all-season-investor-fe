/**
 * 资产弹框
 * 用于新增、编辑资产
 */
import React from 'react';
import { Modal, Form, Input } from 'antd';
import PropTypes from 'prop-types';

export const AssetDialogAction = {
  NEW: 'new',
  EDIT: 'edit'
};

@Form.create({ name: 'asset_dialog' })
class AssetDialog extends React.Component {
  prefixCls = 'asi-asset-dialog';

  static defaultProps = {
    action: AssetDialogAction.NEW,
    data: {},
    loading: false,
    visible: false,
  };

  formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };

  saveFormRef = (ref) => {
    this.formRef = ref;
  };

  render() {
    const { 
      action,
      data,
      loading,
      form,
      ...otherProps
    } = this.props;

    const { getFieldDecorator } = form;

    return (
      <div className={`${this.prefixCls}`}>
        <Modal
          title={action === AssetDialogAction.NEW ? '新增资产' : '编辑资产'}
          confirmLoading={loading}
          {...otherProps}
        >
          <Form>
            <Form.Item
              {...this.formItemLayout}
              label="资产品种名称"
            >
              {
                getFieldDecorator('name', {
                  rules: [{ required: true, message: '亲，请输入资产品种名称!' }],
                  initialValue: (data && data.type) ? data.type.name : ''
                })(
                  <Input
                    placeholder="资产品种名称"
                  />
                )
              }
            </Form.Item>
            <Form.Item
              {...this.formItemLayout}
              label="资产品种代码"
            >
              {
                getFieldDecorator('code', {
                  rules: [{ required: true, message: '亲，请输入资产品种代码!' }],
                  initialValue: (data && data.type) ? data.type.code : ''
                })(
                  <Input
                    placeholder="资产品种代码"
                  />
                )
              }
            </Form.Item>
            <Form.Item
              {...this.formItemLayout}
              label="资产类型"
            >
              {
                getFieldDecorator('category', {
                  rules: [{ required: true, message: '亲，请选择对应的资产类型!' }],
                  initialValue: (data && data.type) ? data.type.category.name : ''
                })(
                  <Input
                    placeholder="资产类型"
                  />
                )
              }
            </Form.Item>
            <Form.Item
              {...this.formItemLayout}
              label="当前金额"
            >
              {
                getFieldDecorator('amount', {
                  rules: [{ required: true, message: '亲，请该资产当前金额!' }],
                  initialValue: data ? data.amount : ''
                })(
                  <Input
                    placeholder="资产类型"
                  />
                )
              }
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

AssetDialog.propTypes = {
  action: PropTypes.string, // 'new'|'edit' 
  data: PropTypes.object,
  loading: PropTypes.bool,
  visible: PropTypes.bool
};

export default AssetDialog;
