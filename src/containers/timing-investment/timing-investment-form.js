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
    Select,
    Spin
} from 'antd';
import useReferFund from '../../effects/refer-fund';
import axios from '../../util/api';

const FormItem = Form.Item;
const { Option } = Select;

/**
 * 定投提交表单
 * @param {*} props 
 */
function TimingInvestmentForm(props) {
    const { form, onSubmited } = props;
    const { getFieldDecorator, validateFields } = form;
    const [fetching, fundList, selectedFund, onFundChanged] = useReferFund();

    const [refresh, setRefresh] = useState(false);

    // Reset form value
    useEffect(() => {
        if (refresh) {
            setRefresh(false);

            form.setFieldsValue({
                'fund': [],
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
                const { dateTime, fund, ...others } = values;

                const timeStamp = dateTime.toDate().getTime();

                const params = Object.assign({}, others, {
                    'fund': Number(fund.key),
                    'date_time': timeStamp
                });

                await axios.post('invest-record/', params);

                message.success('添加成功！');

                // 刷新表单为初始状态
                setRefresh(true);

                onSubmited && onSubmited();
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
                    label="基金"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 20 }}
                >
                    {
                        getFieldDecorator('fund', {
                            initialValue: [],
                            rules: [
                                {
                                    required: true,
                                    message: '请选择一个基金！'
                                }
                            ]
                        })(
                            <Select
                                showSearch
                                labelInValue
                                placeholder="请选择一个基金"
                                notFoundContent={fetching ? <Spin size="small" /> : null}
                                filterOption={false}
                                onChange={onFundChanged}
                                style={{ width: '100%' }}
                            >
                                {
                                    fundList.map(d => (
                                        <Option key={d.id}>{`${d.name}(${d.code})`}</Option>
                                    ))
                                }
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem
                    label="定投时间"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 20 }}
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
                <FormItem
                    label="本次定投金额"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 20 }}
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
                                formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                precision={2}
                                step={0.01}
                                name="start-amount" 
                            />
                        )
                    }
                </FormItem>
                <FormItem
                    label="当前市值"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 20 }}
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
                                formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                precision={2}
                                step={0.01}
                                name="start-amount" 
                            />
                        )
                    }
                </FormItem>
                <FormItem
                    style={{ marginTop: 30 }}
                    wrapperCol={{ span: 4, offset: 4 }}
                >
                    <Button type="primary" htmlType="submit">
                        提交
                    </Button>
                </FormItem>
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
