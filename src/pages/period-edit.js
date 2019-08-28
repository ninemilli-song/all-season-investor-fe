import React from 'react';
import {
    Form, 
    InputNumber, 
    DatePicker, 
    Button, 
    Input,
    Row,
    Col,
    message,
    Select,
    Spin
} from 'antd';
import axios from '../util/api';
import useBeginningData from '../effects/beginning-edit.js';
import useReferFund from '../effects/refer-fund';
import { formatCurrency, formatDatetime } from '../util/common';
import './css/period-detail.scss';

const FormItem = Form.Item;
const { Option } = Select;

/**
 * 期初编辑页面
 */
function BeginningEdit() {
    return (
        <div className="period-detail">
            <Row>
                <Col span={12}>
                    <BeginningFormWrapped />
                </Col>
                <Col span={12}>
                    <BeginningList />
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
    const [fetching, fundList, selectedFund, onFundChanged] = useReferFund();

    const onSubmitHandler = (e) => {
        e.preventDefault();
        validateFields(async (error, values) => {
            if (!error) {
                console.log('submit value is: ', values);
                const { startTime, fund, ...others } = values;

                const timeStamp = startTime.toDate().getTime();

                const params = Object.assign({}, others, {
                    'fund': Number(fund.key),
                    'start_time': timeStamp
                });

                await axios.post('initial/', params);

                message.success('期初数据添加成功！');
            }
        });
    };

    return (
        <div className="period-detail-form">
            <Form 
                layout="horizontal"
                onSubmit={onSubmitHandler}
            >
                <FormItem
                    label="基金"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                >
                    {
                        getFieldDecorator('fund', {
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
                    label="起始时间"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                >
                    {
                        getFieldDecorator('startTime', {
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
                <FormItem
                    label="起始金额"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                >
                    {
                        getFieldDecorator('start_amount', {
                            rules: [
                                {
                                    required: true,
                                    message: '请指定金额！'
                                }
                            ]
                        })(
                            <InputNumber 
                                style={{ width: '100%' }} 
                                defaultValue={0}
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

const BeginningList = () => {
    // 期初数据
    const beginningData = useBeginningData();

    return (
        <ul className="period-detail-list">
            <li className="period-detail-list-row period-detail-list-title">
                <span className="period-detail-list-cell subject">投资标的</span>
                <span className="period-detail-list-cell textRight">投资起始时间</span>
                <span className="period-detail-list-cell amount">投资起始金额</span>
            </li>
            {
                beginningData.map((item) => {
                    const {
                        id, fund, start_time, start_amount
                    } = item;

                    const subjectName = `${fund.name}(${fund.code})`;

                    return (
                        <li className="period-detail-list-row" key={id}>
                            <span className="period-detail-list-cell ellipsis subject" title={subjectName}>{ subjectName }</span>
                            <span className="period-detail-list-cell textRight">{ formatDatetime(parseFloat(start_time) * 1000, 'YYYY/MM/DD') }</span>
                            <span className="period-detail-list-cell amount">{ `￥${formatCurrency(parseFloat(start_amount))}` }</span>
                        </li>
                    );
                })

            }
        </ul>
    );
};

const BeginningFormWrapped = Form.create({
    name: 'beginning'
})(BeginningForm);


export default BeginningEdit;
