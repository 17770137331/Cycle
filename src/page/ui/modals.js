import { render } from 'less'
import React from 'react'
import './ui.less'
import {Card,Button,Modal} from 'antd'

export default class Modals extends React.Component{
    state = {
        showModal1: false,
        showModal2: false,
        showModal3: false,
        showModal4: false
    }

    handelOpen = (type)=>{
        this.setState({
            [type]: true
        })
    }

    handleCancel = (type)=>{
        this.setState({
            [type]:false
        })
    }

    handelConfirm = (type)=>{
        Modal[type]({
            title: '确定？',
            content: '你赢了？',
            onOk(){
                console.log('ok')
            },
            onCancel(){
                console.log('cancel')
            }
        })
    }
    render() {
        const {showModal1,showModal2,showModal3,showModal4} = this.state
        return <div style={ {width:"100%"} }>
            <Card title="基础模态框" className="card-wrap">
                <Button type="primary" onClick={()=>{this.handelOpen("showModal1")}}>open</Button>
                <Button type="primary" onClick={()=>{this.handelOpen("showModal2")}}>自定义页脚</Button>
                <Button type="primary" onClick={()=>{this.handelOpen("showModal3")}}>顶部弹窗20px</Button>
                <Button type="primary" onClick={()=>{this.handelOpen("showModal4")}}>水平居中</Button>
            </Card>
            <Card title="信息确认框" className="card-wrap">
                <Button type="primary" onClick={()=>{this.handelConfirm("confirm")}}>confirm</Button>
                <Button type="primary" onClick={()=>{this.handelConfirm("info")}}>info</Button>
                <Button type="primary" onClick={()=>{this.handelConfirm("success")}}>success</Button>
                <Button type="primary" onClick={()=>{this.handelConfirm("warning")}}>warning</Button>
            </Card>
            <Modal
                title="React"
                visible={showModal1}
                onCancel={()=>this.handleCancel("showModal1")}
            >
                <p>hello world</p>
            </Modal>
            <Modal
                title="React"
                visible={showModal2}
                okText="好的"
                cancelText="算了"
                onCancel={()=>this.handleCancel("showModal2")}
            >
                <p>hello world</p>
            </Modal>
            <Modal
                title="React"
                visible={showModal3}
                style={ {top:20} }
                onCancel={()=>this.handleCancel("showModal3")}
            >
                <p>hello world</p>
            </Modal>
            <Modal
                title="React"
                visible={showModal4}
                wrapClassName="vertical-center-modal"
                onCancel={()=>this.handleCancel("showModal4")}
            >
                <p>hello world</p>
            </Modal>
        </div>
    }
}