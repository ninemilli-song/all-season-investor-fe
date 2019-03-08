import React from 'react';
import {
    Form, Button, Input
} from 'antd';
import { inject } from 'mobx-react';
import Router from 'next/router';
import pageWithIntl from '../components/PageWithIntl';
import { loggedIn, signup } from '../util/AuthService';
import './css/login.scss';

@inject(stores => ({
    userStore: stores.store.user
}))
@Form.create()
class Login extends React.Component {
    prefixCls = 'asi-login';

    // static async getInitialProps({ req }) {
    //     const isServer = !!req;

    //     const userInfo = axios.get('userInfo');
    // }

    componentDidMount() {
        if (loggedIn()) {
            this.gotoHomePage();
        }
    }

    handleSubmit = (e) => {
        const { form, userStore } = this.props;
        e.preventDefault();

        form.validateFields(async (err, vals) => {
            if (!err) {
                signup(vals).then((res) => {
                    console.log('Signup success ------> ', res);
                    userStore.update(res.user);
                    this.gotoHomePage();
                }).catch((error) => {
                    console.log('Signup error------>', error);
                });
            }
        });
    };

    handleConfirmPassword = (rule, value, callback) => {
        const { form } = this.props;
        const { getFieldValue } = form;
        if (value && value !== getFieldValue('password1')) {
            callback('两次密码输入不一致！');
        }

        // Note: 必须总是返回一个 callback，否则 validateFieldsAndScroll 无法响应
        callback();
    };

    /**
     * 跳转首页
     */
    gotoHomePage = () => {
        Router.replace('/');
    };

    render() {
        const { form } = this.props;
        // const { username, password } = userInfo;
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
                        <p>亲，请填写信息，进行注册</p>
                        <Form
                            style={{ textAlign: 'left' }}
                            onSubmit={this.handleSubmit}
                        >
                            <Form.Item>
                                {
                                    getFieldDecorator('username', {
                                        // initialValue: username,
                                        rules: [{ required: true, message: '亲，请输入您的用户名!' }]
                                    })(
                                        <Input
                                            placeholder="呢称"
                                        />
                                    )
                                }
                            </Form.Item>
                            <Form.Item>
                                {
                                    getFieldDecorator('mobile', {
                                        rules: [{ required: true, message: '亲，请输入有效的手机号码进行注册!' }]
                                    })(
                                        <Input
                                            placeholder="手机号码"
                                        />
                                    )
                                }
                            </Form.Item>
                            <Form.Item>
                                {
                                    getFieldDecorator('password1', {
                                        rules: [{ required: true, message: '亲，请设置您的密码!' }]
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
                                    getFieldDecorator('password2', {
                                        rules: [
                                            { required: true, message: '亲，请再次确认您的密码!' },
                                            {
                                                validator: this.handleConfirmPassword
                                            }
                                        ]
                                    })(
                                        <Input
                                            type="password"
                                            placeholder="确认密码"
                                        />
                                    )
                                }
                            </Form.Item>
                            <Form.Item>
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
                                    注册
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

export default pageWithIntl(Login);
