import React from 'react';
import {
    Form, FormItem, Button, Checkbox, Input
} from 'antd';
import pageWithIntl from '../components/PageWithIntl';
// import axios from '../util/api';

@Form.create()
class Login extends React.Component {
    prefixCls = 'asi-login'

    // static async getInitialProps({ req }) {
    //     const isServer = !!req;

    //     const userInfo = axios.get('userInfo');
    // }

    render() {
        const { form, userInfo } = this.props;
        const { username, password } = userInfo;
        const { getFieldDecorator } = form;

        return (
            <div className={this.prefixCls}>
                <div className="page page-login vertical-align">
                    <div className="page-content vertical-align-middle">
                        {/* <div className="brand">
                            <img src={ logo } alt="..."/>
                            <h2 className="brand-text">
                                { WEBSITE_NAME }
                            </h2>
                        </div> */}
                        <p>请使用您的账号密码登录系统</p>
                        <Form
                            style={{ textAlign: 'left' }}
                            onSubmit={this.handleSubmit}
                        >
                            <FormItem>
                                {
                                    getFieldDecorator('username', {
                                        initialValue: username,
                                        rules: [{ required: true, message: '亲，请输入您的用户名!' }]
                                    })(
                                        <Input
                                            placeholder="用户名"
                                        />
                                    )
                                }
                            </FormItem>
                            <FormItem>
                                {
                                    getFieldDecorator('password', {
                                        initialValue: password,
                                        rules: [{ required: true, message: '请输入密码!' }]
                                    })(
                                        <Input
                                            type="password"
                                            placeholder="密码"
                                        />
                                    )
                                }
                            </FormItem>
                            <FormItem>
                                {
                                    getFieldDecorator('remember', {
                                        valuePropName: 'checked',
                                        initialValue: true
                                    })(
                                        <Checkbox style={{ color: '#fff' }}>记住密码</Checkbox>
                                    )
                                }
                                <a className="login-form-forgot">
                                    忘记密码？
                                </a>
                                <Button
                                    className="btn-login"
                                    type="primary"
                                    htmlType="submit"
                                >
                                    {
                                        // isFetching ? (
                                        //     <Spin />
                                        // ) : ''
                                    }
                                    登录
                                </Button>
                            </FormItem>
                        </Form>
                        <p>
                            您还未注册？请 
                            <a href="">注册</a>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default pageWithIntl(Login);
