import React from 'react'
import './ui.less'
import {Card, Button, Radio} from 'antd'
import {PlusOutlined,EditOutlined,DeleteOutlined,SearchOutlined,PoweroffOutlined} from '@ant-design/icons'
export default class Buttons extends React.Component{
    state = {
        loading: true
    }

    handelChange = (e) => {
        this.setState({
            size: e.target.value
        })
    }

    handelClose = () => {
        this.setState({
            loading: false,
            size: 'default'
        })
    }

    render() {
        const {loading,size} = this.state
        return (
            <div style={ {width:'100%'} }>
                <Card title="基础按钮" className="card-wrap">
                    <Button type="primary">单车</Button>
                    <Button>单车</Button>
                    <Button type="danger">单车</Button>
                    <Button type="dashed">单车</Button>
                    <Button disabled>单车</Button>
                </Card>
                <Card title="图形按钮" className="card-wrap">
                    <Button icon={<PlusOutlined />}>创建</Button>
                    <Button icon={<EditOutlined/>}>编辑</Button>
                    <Button icon={<DeleteOutlined/>}>删除</Button>
                    <Button icon={<SearchOutlined/>}>搜索</Button>
                </Card>
                <Card title="loding" className="card-wrap">
                    <Button type="primary" loading={loading}>确定</Button>
                    <Button type="primary" shape="circle" loading={loading}></Button>
                    <Button type="primary" onClick={this.handelClose}>关闭</Button>
                </Card>
                <Card title="按钮组" className="card-wrap">
                    <Radio.Group onChange={this.handelChange}>
                        <Radio value="small">小</Radio>
                        <Radio value="default">中</Radio>
                        <Radio value="large">大</Radio>
                    </Radio.Group>
                    <Button type="primary" size={size}>单车</Button>
                    <Button size={size}>单车</Button>
                    <Button type="danger" size={size}>单车</Button>
                </Card>
            </div>
        )
    }
}
