/**
 * 资产明细Form
 * 用于资产明细的提交
 */
import React from 'react';
import { Form, Input } from 'antd';
import PropTypes from 'prop-types';

@Form.create()
class AssetForm extends React.Component {
    prefixCls = 'asi-asset-from';

    static defaultProps = {
        data: null,
    }

    render() {
        const { form, data } = this.props;
        const { getFieldDecorator } = form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };

        return (
            <div className={`${this.prefixCls}`}>
                <Form>
                    <Form.Item
                        {...formItemLayout}
                        label="资产品种名称"
                    >
                        {
                            getFieldDecorator('name', {
                                rules: [{ required: true, message: '亲，请输入资产品种名称!' }],
                                initialValue: data ? data.type.name : ''
                            })(
                                <Input
                                    placeholder="资产品种名称"
                                />
                            )
                        }
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="资产品种代码"
                    >
                        {
                            getFieldDecorator('code', {
                                rules: [{ required: true, message: '亲，请输入资产品种代码!' }],
                                initialValue: data ? data.type.code : ''
                            })(
                                <Input
                                    placeholder="资产品种代码"
                                />
                            )
                        }
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="资产类型"
                    >
                        {
                            getFieldDecorator('category', {
                                rules: [{ required: true, message: '亲，请选择对应的资产类型!' }],
                                initialValue: data ? data.type.type.name : ''
                            })(
                                <Input
                                    placeholder="资产类型"
                                />
                            )
                        }
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
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
            </div>
        );
    }
}

AssetForm.propTypes = {
    data: PropTypes.object,
};

export default AssetForm;
