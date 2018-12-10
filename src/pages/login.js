import React from 'react';
import {
    Form, Button, Checkbox, Input
} from 'antd';
import pageWithIntl from '../components/PageWithIntl';
import './css/login.scss';
import axios from 'axios';
// import axios from '../util/api';

@Form.create()
class Login extends React.Component {
    prefixCls = 'asi-login'

    // static async getInitialProps({ req }) {
    //     const isServer = !!req;

    //     const userInfo = axios.get('userInfo');
    // }

    handleSubmit = (e) => {
        const { form } = this.props;
        e.preventDefault();
    
        form.validateFields(async (err, vals) => {
            if (!err) {
                // await this.props.signin(vals.username, vals.password);

                const res = await axios.post('auth/login/', {
                    username: vals.username,
                    password: vals.password
                });

                console.log('🎸 Sigin in End ------> ', res);
    
                // if (this.props.error) {
                //   message.error(this.props.error)
                // } else {
                //   message.success('登陆成功')
                // }
    
                // if (vals.remember === true) {
                //     storage.setStorage('MOBILE', vals.mobile);
                //     storage.setStorage('PASSWORD', vals.password);
                // } else {
                //     storage.removeStorage('MOBILE');
                //     storage.removeStorage('PASSWORD');
                // }
            }
        });
    }

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
                        <p>亲，请使用您的账号、密码登录系统</p>
                        <Form
                            style={{ textAlign: 'left' }}
                            onSubmit={this.handleSubmit}
                        >
                            <Form.Item>
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
                            </Form.Item>
                            <Form.Item>
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
                            </Form.Item>
                            <Form.Item>
                                {
                                    getFieldDecorator('remember', {
                                        valuePropName: 'checked',
                                        initialValue: true
                                    })(
                                        <Checkbox>记住密码</Checkbox>
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
                            </Form.Item>
                        </Form>
                        <p>
                            亲，如果您还未注册？请 
                            <a href="">注册</a>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default pageWithIntl(Login);
