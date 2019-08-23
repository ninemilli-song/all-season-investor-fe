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
import useBeginningData from '../effects/beginning-edit.js';
import { formatCurrency, formatDatetime } from '../util/common';
import './css/period-detail.scss';

const FormItem = Form.Item;

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

const BeginningList = () => {
    // 期初数据
    const beginningData = useBeginningData();

    return (
        <ul className="period-detail-list">
            <li className="period-detail-list-row, period-detail-list-title">
                <span className="period-detail-list-cell">投资标的</span>
                <span className="period-detail-list-cell">投资起始时间</span>
                <span className="period-detail-list-cell">投资起始金额</span>
            </li>
            {
                beginningData.map((item) => {
                    const {
                        id, fund, start_time, start_amount
                    } = item;

                    return (
                        <li className="period-detail-list-row" key={id}>
                            <span className="period-detail-list-cell ellipsis">{ `${fund.name}(${fund.code})` }</span>
                            <span className="period-detail-list-cell">{ formatDatetime(parseFloat(start_time) * 1000, 'YYYY/MM/DD') }</span>
                            <span className="period-detail-list-cell">{ `￥${formatCurrency(parseFloat(start_amount))}` }</span>
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
