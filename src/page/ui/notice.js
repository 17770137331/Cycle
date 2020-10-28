import React from 'react'
import {Card, Button, notification, Descriptions} from 'antd'

export default class Notice extends React.Component{
    openNotice = (type,desc)=>{
        desc && notification.config({
            placement: desc
        })
        notification[type]({
            message: '发工资了',
            description: '上个月实际到账20000元'
        })
    }
    render() {
        return <div style={ {width:"100%"} }>
            <Card title="通知提醒框" className="card-wrap">
                <Button type="primary" onClick={()=>{this.openNotice('success')}}>Success</Button>
                <Button type="primary" onClick={()=>{this.openNotice('info')}}>info</Button>
                <Button type="primary" onClick={()=>{this.openNotice('warning')}}>waring</Button>
                <Button type="primary" onClick={()=>{this.openNotice('error')}}>error</Button>
            </Card>
            <Card title="通知提醒框" className="card-wrap">
                <Button type="primary" onClick={()=>{this.openNotice('success','topLeft')}}>Success</Button>
                <Button type="primary" onClick={()=>{this.openNotice('info','topRight')}}>info</Button>
                <Button type="primary" onClick={()=>{this.openNotice('warning','bottomLeft')}}>waring</Button>
                <Button type="primary" onClick={()=>{this.openNotice('error','bottomRight')}}>error</Button>
            </Card>
        </div>
    }
}