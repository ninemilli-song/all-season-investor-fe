import React from 'react';
import {
    Form, InputNumber, DatePicker, Button 
} from 'antd';

const FormItem = Form.Item;

function PeriodEdit() {
    return (
        <div>
            <Form layout="horizontal">
                <FormItem
                    label="基金代码"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 8 }}
                >
                    <InputNumber 
                        size="large" 
                        style={{ width: 200 }} 
                        formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        precision={2}
                        name="inputNumber" 
                    />
                </FormItem>
                <FormItem
                    label="起始时间"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 8 }}
                >
                    <DatePicker name="startDate" />
                </FormItem>
                <FormItem
                    style={{ marginTop: 48 }}
                    wrapperCol={{ span: 8, offset: 8 }}
                >
                    <Button size="large" type="primary" htmlType="submit">
                        OK
                    </Button>
                    <Button size="large" style={{ marginLeft: 8 }}>
                        Cancel
                    </Button>
                </FormItem>
            </Form>
        </div>
    );
}

export default PeriodEdit;
