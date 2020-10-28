import React from 'react';
import { Card, Button, Table, Form, Select, Modal, message } from 'antd';
import axios from './../../axios/index';
import Utils from '../../utils/date';
const FormItem = Form.Item;
const Option = Select.Option;
export default class City extends React.Component{
    formRef = React.createRef();
    state = {
        list:[],
        isShowOpenCity:false
    }
    params = {
        page:1
    }
    componentDidMount(){
        this.requestList();
    }
    handleFilter = (params)=>{
        this.params = {...params,...this.params};
        this.requestList();
    }

    // 默认请求我们的接口数据
    requestList = ()=>{
        axios.ajax({
            url: '/open_city',
            data:{
                params:this.params
            }
        }).then((res)=>{
            let list = res.result.item_list.map((item, index) => {
                // 防止页面有警告 所以要有key值
                item.key = index;
                return item;
            });
            this.setState({
                list:list,
                pagination:Utils.pagination(res,(current)=>{
                    this.params.page = current;
                    this.requestList();
                })
            })
        })
    }

    // 开通城市
    handleOpenCity = ()=>{
        this.setState({
            isShowOpenCity:true
        })
    }
    // 城市开通提交
    handleSubmit = ()=>{
        let cityInfo = this.formRef.current.getFieldsValue()
        axios.ajax({
            url:'/city/open',
            data:{
                params:cityInfo
            }
        }).then((res)=>{
            if(res.code == '0'){
                message.success('开通成功');
                this.setState({
                    isShowOpenCity:false
                })
                this.requestList();
            }
        })
    }
    render(){
        const columns = [
            {
                title:'城市ID',
                dataIndex:'id'
            }, {
                title: '城市名称',
                dataIndex: 'name'
            }, {
                title: '用车模式',
                dataIndex: 'mode',
                render(mode){
                    return mode ==1 ?'停车点':'禁停区';
                }
            }, {
                title: '营运模式',
                dataIndex: 'op_mode',
                render(op_mode) {
                    return op_mode == 1 ? '自营' : '加盟';
                }
            }, {
                title: '授权加盟商',
                dataIndex: 'franchisee_name'
            }, {
                title: '城市管理员',
                dataIndex: 'city_admins',
                render(arr){
                    return arr.map((item)=>{
                        return item.user_name;
                    }).join(',');
                }
            }, {
                title: '城市开通时间',
                dataIndex: 'open_time'
            }, {
                title: '操作时间',
                dataIndex: 'update_time',
                render: Utils.formateDate
            }, {
                title: '操作人',
                dataIndex: 'sys_user_name'
            }
        ]
        return (
            <div style={{width:"100%"}}>
                <Card>
                    <OpenCityForm />
                </Card>
                <Card style={{marginTop:10}}>
                    <Button type="primary" onClick={this.handleOpenCity}>开通城市</Button>
                </Card>
                <div className="content-wrap">
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.list}
                        pagination={this.state.pagination}
                    />
                </div>
                <Modal 
                    title="开通城市"
                    visible={this.state.isShowOpenCity}
                    onCancel={()=>{
                        this.setState({
                            isShowOpenCity:false
                        })
                    }}
                    onOk={this.handleSubmit}
                >
                    <OpenCityForm refSon={this.formRef} open={true}/>
                </Modal>
            </div>
        );
    }
}

class OpenCityForm extends React.Component{
    render(){
        const formItemLayout = {
            labelCol:{
                span:15
            },
            wrapperCol:{
                span:9
            }
        }
        return (
            <Form layout="inline" initialValues={{
                city_id:"1",
                op_mode:"1",
                use_mode:"1"
            }}
            ref={this.props.refSon}
            >
                <FormItem label="选择城市" {...formItemLayout} name="city_id">
                    {
                        <Select style={{ width: 100 }}>
                            <Option value="">全部</Option>
                            <Option value="1">北京市</Option>
                            <Option value="2">天津市</Option>
                        </Select>
                    }
                </FormItem>
                <FormItem label="营运模式" {...formItemLayout} name="op_mode">
                    {
                            <Select style={{ width: 100 }}>
                                <Option value="1">自营</Option>
                                <Option value="2">加盟</Option>
                            </Select>
                    }
                </FormItem>
                <FormItem label="用车模式" {...formItemLayout} name="use_mode">
                    {
                        <Select style={{ width: 100 }}>
                            <Option value="1">指定停车点</Option>
                            <Option value="2">禁停区</Option>
                        </Select>
                    }
                </FormItem>
                {
                    !this.props.open && <FormItem {...formItemLayout}>
                        <Button type="primary" htmlType="submit">查询</Button>
                    </FormItem>
                }
            </Form>
        );
    }
}