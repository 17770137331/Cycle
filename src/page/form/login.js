import React from 'react';
import { Card, Form, Input, Button, message, Icon, Checkbox } from "antd";
import {UserOutlined,LockOutlined} from '@ant-design/icons'
const FormItem = Form.Item;
class FormLogin extends React.Component{
    handelFinsh = (userInfo)=>{
        message.success(`${userInfo.username} 恭喜你，您通过本次表单组件学习，当前密码为：${userInfo.password}`)
    }
  render(){
    return(
         <div style={{width:"100%"}}>
           <Card title="行内登录">
                <Form layout="inline">
                    <FormItem>
                        <Input placeholder="请输入用户名"/>
                    </FormItem>
                    <FormItem>
                        <Input placeholder="请输入密码"/>
                    </FormItem>
                    <FormItem>
                        <Button type="primary">登录</Button>
                    </FormItem>
                </Form>
           </Card>
           <Card title="水平登录" style={{marginTop:10}}>
                <Form style={{width:300}} 
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={this.handelFinsh}
                >
                    <FormItem label="UserName"
                        name="username"
                        rules={[
                            {
                              required: true,
                              message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input  prefix={<UserOutlined/>} placeholder="请输入用户名" />
                    </FormItem>
                    <FormItem label="PassWord"
                        name="password"
                        rules={[
                            {
                              required: true,
                              message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input  type="password" prefix={<LockOutlined/>} placeholder="请输入密码" />
                    </FormItem>
                    <Form.Item name="remember" valuePropName="checked">
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                    <FormItem> 
                        <Button type="primary" htmlType="submit"> 登录</Button>
                    </FormItem>
                </Form>
           </Card>
         </div>
    )
  }
}

export default FormLogin