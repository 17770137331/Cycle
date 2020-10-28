import React from 'react'
import {Card,Form,Button,Input,Checkbox,Radio,Select,Switch,DatePicker,TimePicker,Upload,Icon,message, InputNumber} from 'antd'
import moment from 'moment';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const TextArea = Input.TextArea;
class FormRegister extends React.Component{

    state={}
    onFinish = values => {
        console.log('Success:', values);
      };
    
    onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
      };

    render(){
        const formItemLayout = {
            labelCol:{
                xs:24,
                sm:4
            },
            wrapperCol:{
                xs:24,
                sm:12
            }
        }
        const offsetLayout = {
            wrapperCol:{
                xs:24,
                sm:{
                    span:12,
                    offset:4
                }
            }
        }
        const rowObject = {
            minRows: 4, maxRows: 6
        }
        return (
            <div style={{width:"100%"}}>
                <Card title="注册表单">
                    <Form layout="horizontal" initialValues={{
                        sex: '1',
                        age:18,
                        state:"1",
                        interest:['2','5'],
                        isMarried:true,
                        birthday:moment('2018-08-08'),
                        address:"武汉光谷广场"
                      }} 
                      onFinish={this.onFinish}
                      onFinishFailed={this.onFinishFailed}>>
                        <FormItem label="用户名" name="userName"  rules={[
                            {
                                required: true,
                                message: '用户名不能为空'
                            }
                        ]} {...formItemLayout}>
                                <Input placeholder="请输入用户名" />
                        </FormItem>
                        <FormItem label="密码" name="userPwd" rules={[
                            {
                                required: true,
                                message: '密码不能为空'
                            }
                        ]}{...formItemLayout}>
                            <Input type="password" placeholder="请输入密码" />
                        </FormItem>
                        <FormItem label="性别" name="sex" {...formItemLayout}>
                            <RadioGroup>
                                <Radio value="1">男</Radio>
                                <Radio value="2">女</Radio>
                            </RadioGroup>
                        </FormItem>
                        <FormItem label="年龄" name="age" {...formItemLayout}>
                            <InputNumber  />
                        </FormItem>
                        <FormItem label="当前状态" name="state" {...formItemLayout}>
                            <Select>
                                <Option value="1">咸鱼一条</Option>
                                <Option value="2">风华浪子</Option>
                                <Option value="3">北大才子一枚</Option>
                                <Option value="4">百度FE</Option>
                                <Option value="5">创业者</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="爱好" name="interest" {...formItemLayout}>
                            <Select mode="multiple">
                                <Option value="1">游泳</Option>
                                <Option value="2">打篮球</Option>
                                <Option value="3">踢足球</Option>
                                <Option value="4">跑步</Option>
                                <Option value="5">爬山</Option>
                                <Option value="6">骑行</Option>
                                <Option value="7">桌球</Option>
                                <Option value="8">麦霸</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="是否已婚" name="isMarried" {...formItemLayout}>
                                    <Switch/>
                        </FormItem>
                        <FormItem label="生日" name="birthday" {...formItemLayout}>
                            <DatePicker
                                showTime
                                format="YYYY-MM-DD HH:mm:ss"
                            />
                        </FormItem>
                        <FormItem label="联系地址" name="address" {...formItemLayout}>
                            <TextArea
                                autosize={rowObject}
                            />
                        </FormItem>
                        <FormItem label="早起时间" name="time" {...formItemLayout}>
                            <TimePicker/>
                        </FormItem>
                        <FormItem {...offsetLayout} name="userImg">
                            <Checkbox>我已阅读过<a href="#">软谋教育协议</a></Checkbox>
                        </FormItem>
                        <FormItem {...offsetLayout}>
                            <Button type="primary" htmlType="submit">注册</Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        );
    }
}
// export default Form.create()(FormRegister);
export default FormRegister