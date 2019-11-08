import React, { useState, useEffect } from 'react';
import {
    Form, 
    InputNumber, 
    DatePicker, 
    Button, 
    message,
    Select,
    Spin,
    Row,
    Col
} from 'antd';
import axios from '../../util/api';
import useReferFund from '../../effects/refer-fund';

const FormItem = Form.Item;
const { Option } = Select;

/**
 * 表单组件
 * @param {*} props 
 */
function BeginningForm(props) {
    const prefixCls = 'beginning-form';
    const { form, onSubmited } = props;
    const { getFieldDecorator, validateFields } = form;
    const [fetching, fundList, onFundChanged] = useReferFund();

    // Refresh
    const [refresh, setRefresh] = useState(false);

    // Reset form value
    useEffect(() => {
        if (refresh) {
            setRefresh(false);

            form.setFieldsValue({
                'fund': [],
                'startTime': null,
                'start_amount': 0
            });
        }
    }, [form, refresh]);

    // Submit form data
    const onSubmitHandler = (e) => {
        e.preventDefault();
        validateFields(async (error, values) => {
            if (!error) {
                const { startTime, fund, ...others } = values;

                const timeStamp = startTime.toDate().getTime();

                const params = Object.assign({}, others, {
                    'fund': Number(fund.key),
                    'start_time': timeStamp
                });

                await axios.post('initial/', params);

                message.success('期初数据添加成功！');

                // 刷新表单为初始状态
                setRefresh(true);

                if (onSubmited) {
                    onSubmited();
                }
            }
        });
    };

    return (
        <div className="period-detail-form form-dash-border">
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
                            label="基金"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
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
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="起始时间"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                        >
                            {
                                getFieldDecorator('startTime', {
                                    initialValue: null,
                                    rules: [
                                        {
                                            required: true,
                                            message: '请输入起始时间！'
                                        }
                                    ]
                                })(
                                    <DatePicker 
                                        style={{ width: '100%' }}
                                        name="start_time" 
                                        placeholder="请输入起始时间"
                                    />
                                )
                            }
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="起始金额"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                        >
                            {
                                getFieldDecorator('start_amount', {
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
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <FormItem
                            wrapperCol={{ span: 8, offset: 8 }}
                        >
                            <Button type="primary" htmlType="submit">
                                提交
                            </Button>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}

const BeginningFormWrapped = Form.create({
    name: 'beginning'
})(BeginningForm);

export default BeginningFormWrapped;
