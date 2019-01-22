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

        return (
            <div className={`${this.prefixCls}`}>
                <Form>
                    <Form.Item>
                        {
                            getFieldDecorator('name', {
                                rules: [{ required: true, message: '亲，请输入您的用户名!' }]
                            })(
                                <Input
                                    placeholder="用户名"
                                    defaultValue={data.name}
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
