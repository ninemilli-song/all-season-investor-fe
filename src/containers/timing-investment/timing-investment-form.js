/**
 * 基金定投提交表单
 * 提交内容，如下：
 * 1. 基金id
 * 2. 投入金额
 * 3. 定投时间
 */
import React, { useState, useEffect } from 'react';
import {
    Form, 
    InputNumber, 
    DatePicker, 
    Button, 
    message,
    Col,
    Row
} from 'antd';
import axios from '../../util/api';
import './timing-investment-form.scss';

const FormItem = Form.Item;

/**
 * 定投提交表单
 * @param {*} props 
 */
function TimingInvestmentForm(props) {
    const { form, onSubmited, fundId } = props;
    const { getFieldDecorator, validateFields } = form;
    const prefixCls = 'timing-investment-form';

    const [refresh, setRefresh] = useState(false);

    // Reset form value
    useEffect(() => {
        if (refresh) {
            setRefresh(false);

            form.setFieldsValue({
                'dateTime': null,
                'amount': 0,
                'pv': 0
            });
        }
    }, [form, refresh]);

    // Submit form data
    const onSubmitHandler = (e) => {
        e.preventDefault();
        validateFields(async (error, values) => {
            if (!error) {
                console.log('submit value is: ', values);
                const { dateTime, ...others } = values;

                const timeStamp = dateTime.toDate().getTime();

                const params = Object.assign({}, others, {
                    'fund': fundId,
                    'date_time': timeStamp
                });

                await axios.post('invest-record/', params);

                message.success('添加成功！');

                // 刷新表单为初始状态
                setRefresh(true);

                if (onSubmited) {
                    onSubmited();
                }
            }
        });
    };

    return (
        <div className={`${prefixCls}`}>
            <h3 className={`${prefixCls}-title`}>
                提交定投记录
            </h3>
            <Form 
                layout="horizontal"
                onSubmit={onSubmitHandler}
            >
                <Row>
                    <Col span={8}>
                        <FormItem
                            label="时间"
                            labelCol={{ span: 7, offset: 1 }}
                            wrapperCol={{ span: 15, offset: 1 }}
                        >
                            {
                                getFieldDecorator('dateTime', {
                                    initialValue: null,
                                    rules: [
                                        {
                                            required: true,
                                            message: '请输入定投时间！'
                                        }
                                    ]
                                })(
                                    <DatePicker 
                                        style={{ width: '100%' }}
                                        name="start_time" 
                                        placeholder="请输入定投时间"
                                    />
                                )
                            }
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="金额"
                            labelCol={{ span: 7, offset: 1 }}
                            wrapperCol={{ span: 15, offset: 1 }}
                        >
                            {
                                getFieldDecorator('amount', {
                                    initialValue: 0,
                                    rules: [
                                        {
                                            required: true,
                                            message: '请指定金额！'
                                        }
                                    ]
                                })(
                                    <InputNumber 
                                        style={{ width: '100%' }}
                                        formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        precision={2}
                                        step={0.01}
                                        name="start-amount" 
                                    />
                                )
                            }
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="市值"
                            labelCol={{ span: 7, offset: 1 }}
                            wrapperCol={{ span: 15, offset: 1 }}
                        >
                            {
                                getFieldDecorator('pv', {
                                    initialValue: 0,
                                    rules: [
                                        {
                                            required: true,
                                            message: '请输入市值！'
                                        }
                                    ]
                                })(
                                    <InputNumber 
                                        style={{ width: '100%' }}
                                        formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        precision={2}
                                        step={0.01}
                                        name="start-amount" 
                                    />
                                )
                            }
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <FormItem
                            wrapperCol={{ span: 15, offset: 9 }}
                        >
                            <Button 
                                type="primary" 
                                htmlType="submit"
                                // style={{ marginLeft: '8px' }}
                            >
                                提交
                            </Button>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}

/**
 * 包一下哈，这样才能注入各种antd form提交的方法和属性
 */
const TimingInvestmentFormWrapped = Form.create({
    name: 'TimingInvestmentForm'
})(TimingInvestmentForm);

export default TimingInvestmentFormWrapped;
