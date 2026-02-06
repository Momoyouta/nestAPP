'use client';
import {Card, Flex, Modal, Form, Input, Button, Checkbox, Tabs, App} from 'antd';
import React, { useState } from 'react';
import { WalletOutlined, CreditCardOutlined, FileTextOutlined, ShoppingOutlined, LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import {http} from "../../utils/http";

function MainContent() {
    const { message } = App.useApp();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [balance, setBalance] = useState(1000); // Example balance
    const [activeTab, setActiveTab] = useState('login'); // 控制当前激活的标签页
    

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    
    const onLoginFinish = async (values: any) => {
        await http.post('auth/login',values)
            .then(res => {
                const {msg,data} = res;
                const {token} = data;
                localStorage.setItem('access_token',token);
                message.success(msg);
            })
            .catch(err => {
                message.error(err.data.msg)
            });
    };
    
    const onRegisterFinish = async (values: any) => {
        values.role_id = '3';
        await http.post('auth/register',values)
            .then(res => {
                const {msg,data} = res;
                const {token} = data;
                localStorage.setItem('access_token',token);
                message.success(msg);
            })
            .catch(err => {
                message.error(err.data.msg)
            });
    };
    
    const getUserRole = async () => {
        await http.get('user/getUserRole',{
            id:'f6555d71-2923-4752-b6d3-d11537dc23c1'
        })
            .then(res => {
                console.log(res?.data.map(i => i.nameCN).join(','));
            })
            .catch(err => {
                message.error(err.data.msg)
            });
    }
    
    const alsTest = async () => {
        await http.get('alsTest')
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err.data.msg)
            })
    }

    const items = [
        { name: '我的钱包', color: '#E6F7FF', icon: <WalletOutlined style={{ color: '#1890FF' }} />, onClick: getUserRole },
        { name: '易商卡', color: '#FFF1EE', icon: <CreditCardOutlined style={{ color: '#F5222D' }} />, onClick: alsTest},
        { name: '开票信息', color: '#F6FFED', icon: <FileTextOutlined style={{ color: '#52C41A' }} />,
            onClick: async () => {
                const res = await http.post('dto',{id:1,name:"zwr",msg:'hot'}).then(res => console.log(res));
                // console.log('cat res',res)
            }
        },
        { name: '商旅订单', color: '#F9F0FF', icon: <ShoppingOutlined style={{ color: '#722ED1' }} />,
            onClick: async () => {
                const res = await http.post('auth/login',{account:"zwr",pwd:'hot'}).then(res => console.log(res));
                // console.log('cat res',res)
            }
        },
    ];
    return (
        <div className="main" style={{ padding: '20px' }}>
            <Card style={{ borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.09)' }}>
                <Flex gap="large" justify="space-around" align="center">
                    {items.map((item, index) => (
                        <Flex key={index} vertical align="center" style={{ cursor: 'pointer' }} onClick={item.onClick}>
                            <div
                                style={{
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: '12px',
                                    backgroundColor: item.color,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginBottom: '8px',
                                    fontSize: '24px',
                                }}
                            >
                                {item.icon}
                            </div>
                            <span style={{ fontSize: '14px', color: '#333' }}>{item.name}</span>
                        </Flex>
                    ))}
                </Flex>
            </Card>
            <Card style={{ borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.09)', marginTop: '20px' }}>
                <Tabs
                    activeKey={activeTab}
                    onChange={(key) => setActiveTab(key)}
                    items={[
                        {
                            label: '登录',
                            key: 'login',
                            children: (
                                <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px 0' }}>
                                    <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>用户登录</h2>
                                    <Form
                                        name="login"
                                        initialValues={{ remember: true }}
                                        onFinish={onLoginFinish}
                                    >
                                        <Form.Item
                                            name="account"
                                            rules={[{ required: true, message: '请输入用户名!' }]}
                                        >
                                            <Input prefix={<UserOutlined />} placeholder="用户名" />
                                        </Form.Item>
                                        <Form.Item
                                            name="pwd"
                                            rules={[{ required: true, message: '请输入密码!' }]}
                                        >
                                            <Input.Password
                                                prefix={<LockOutlined />}
                                                type="pwd"
                                                placeholder="密码"
                                            />
                                        </Form.Item>
                                        <Form.Item>
                                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                                <Checkbox>记住我</Checkbox>
                                            </Form.Item>
                                            <a style={{ float: 'right' }} href="">
                                                忘记密码
                                            </a>
                                        </Form.Item>

                                        <Form.Item>
                                            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                                                登录
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                </div>
                            ),
                        },
                        {
                            label: '注册',
                            key: 'register',
                            children: (
                                <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px 0' }}>
                                    <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>用户注册</h2>
                                    <Form
                                        name="register"
                                        initialValues={{ agree: true }}
                                        onFinish={onRegisterFinish}
                                    >
                                        <Form.Item
                                            name="name"
                                            rules={[{ required: true, message: '请输入姓名!' }]}
                                        >
                                            <Input prefix={<UserOutlined />} placeholder="姓名" />
                                        </Form.Item>
                                        <Form.Item
                                            name="account"
                                            rules={[{ required: true, message: '请输入账号!' }]}
                                        >
                                            <Input prefix={<UserOutlined />} placeholder="账号" min={11}/>
                                        </Form.Item>
                                        <Form.Item
                                            name="password"
                                            rules={[{ required: true, message: '请输入密码!' }]}
                                        >
                                            <Input.Password
                                                prefix={<LockOutlined />}
                                                min={11}
                                                type="password"
                                                placeholder="密码"
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            name="confirmPassword"
                                            dependencies={['password']}
                                            rules={[
                                                { required: true, message: '请确认密码!' },
                                                ({ getFieldValue }) => ({
                                                    validator(_, value) {
                                                        if (!value || getFieldValue('password') === value) {
                                                            return Promise.resolve();
                                                        }
                                                        return Promise.reject(new Error('两次输入的密码不一致!'));
                                                    },
                                                }),
                                            ]}
                                        >
                                            <Input.Password
                                                prefix={<LockOutlined />}
                                                type="password"
                                                placeholder="确认密码"
                                            />
                                        </Form.Item>
                                        <Form.Item name="agree" valuePropName="checked" noStyle>
                                            <Checkbox>我已阅读并同意 <a href="">用户协议</a> 和 <a href="">隐私政策</a></Checkbox>
                                        </Form.Item>

                                        <Form.Item>
                                            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                                                注册
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                </div>
                            ),
                        },
                    ]}
                />
            </Card>
            <Modal title="我的钱包" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>余额: ¥{balance}</p>
            </Modal>
        </div>
    );
}

export default function Page(){
    return (
        <MainContent />
    )
}
