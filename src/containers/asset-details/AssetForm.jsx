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
        data: {},
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
                        label="资产名"
                    >
                        {
                            getFieldDecorator('name', {
                                rules: [{ required: true, message: '亲，请输入资产名!' }],
                                initialValue: data.name
                            })(
                                <Input
                                    placeholder="资产名"
                                />
                            )
                        }
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="资产等级"
                    >
                        {
                            getFieldDecorator('category', {
                                rules: [{ required: true, message: '亲，请输入资产等级!' }],
                                initialValue: data.name
                            })(
                                <Input
                                    placeholder="资产等级"
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
