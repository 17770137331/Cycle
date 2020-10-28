import React from 'react'
import {Card,Button,message} from 'antd'
import './ui.less'
export default class Messages extends React.Component{
    showMessage = (type)=>{
        message[type]('恭喜你，React课程学习成功')
    }
    render(){
        return(
            <div>
                <Card title="全局提示框" className="card-wrap">
                    <Button type="primary" onClick={()=>{this.showMessage('success')}}>Success</Button>
                    <Button type="primary" onClick={()=>{this.showMessage('info')}}>info</Button>
                    <Button type="primary" onClick={()=>{this.showMessage('warning')}}>warning</Button>
                    <Button type="primary" onClick={()=>{this.showMessage('error')}}>error</Button>
                </Card>
            </div>
        )
    }
}