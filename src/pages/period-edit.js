import React from 'react';
import {
    Form, 
    InputNumber, 
    DatePicker, 
    Button, 
    Input,
    Row,
    Col,
    message
} from 'antd';
import axios from '../util/api';

const FormItem = Form.Item;

function BeginningEdit() {
    return (
        <div>
            <Row>
                <Col span={12}>
                    <BeginningFormWrapped />
                </Col>
                <Col span={12}>
                    <div>found list</div>
                </Col>
            </Row>
        </div>
    );
}

/**
 * 表单组件
 * @param {*} props 
 */
function BeginningForm(props) {
    const { form } = props;
    const { getFieldDecorator, validateFields } = form;

    const onSubmitHandler = (e) => {
        e.preventDefault();
        validateFields(async (error, values) => {
            if (!error) {
                console.log('submit value is: ', values);
                const { startDate, ...others } = values;

                const timeStamp = startDate.toDate().getTime();

                const params = Object.assign({}, others, {
                    startDate: timeStamp
                });

                await axios.post('beginning', params);

                message.success('期初数据添加成功！');
            }
        });
    };

    return (
        <div>
            <Form 
                layout="horizontal"
                onSubmit={onSubmitHandler}
            >
                <FormItem
                    label="基金代码"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                >
                    {
                        getFieldDecorator('code', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入基金代码！'
                                }
                            ]
                        })(
                            <Input 
                                style={{ width: 200 }}
                                placeholde="请输入基金w代码"
                                name="code" 
                            />
                        )
                    }
                </FormItem>
                <FormItem
                    label="基金名称"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                >
                    {
                        getFieldDecorator('name')(
                            <Input 
                                style={{ width: 200 }}
                                placeholde="请输入基金名称"
                                name="name" 
                            />
                        )
                    }
                </FormItem>
                <FormItem
                    label="起始时间"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                >
                    {
                        getFieldDecorator('startDate', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入起始时间！'
                                }
                            ]
                        })(
                            <DatePicker 
                                style={{ width: 200 }}
                                name="startDate" 
                            />
                        )
                    }
                </FormItem>
                <FormItem
                    label="起始金额"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                >
                    {
                        getFieldDecorator('startAmount')(
                            <InputNumber 
                                style={{ width: 200 }} 
                                formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                precision={2}
                                step={0.01}
                                name="startAmount" 
                            />
                        )
                    }
                </FormItem>
                <FormItem
                    style={{ marginTop: 30 }}
                    wrapperCol={{ span: 8, offset: 8 }}
                >
                    <Button type="primary" htmlType="submit">
                        提交
                    </Button>
                </FormItem>
            </Form>
        </div>
    );
}

const BeginningFormWrapped = Form.create({
    name: 'beginning'
})(BeginningForm);


export default BeginningEdit;
