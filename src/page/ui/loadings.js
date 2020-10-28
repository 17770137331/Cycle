import React from 'react'
import {Alert, Card, Spin, Icon} from 'antd'
import './ui.less'

export default class Loadings extends React.Component{
    render() {
        const icon = <Icon type="loading" style={ {fontSize:24} }/>
        return <div style={ {width:'100%'} }>
            <Card title="Spin用法" className="card-wrap">
                <Spin size="small"></Spin>
                <Spin style={ {margin:'0 20px'} }></Spin>
                <Spin size="large"></Spin>
            </Card>
            <Card title="内容遮罩" className="card-wrap">
                <Alert
                    message="React"
                    description="hello world"
                    type="info"
                ></Alert>
                <Alert
                    message="React"
                    description="hello world"
                    type="warning"
                ></Alert>
                <Spin tip="加载中...">
                    <Alert
                        message="React"
                        description="hello world"
                        type="info"
                    ></Alert>
                </Spin>
                <Spin tip="加载中..." indicator={icon}>
                    <Alert
                        message="React"
                        description="hello world"
                        type="warning"
                    ></Alert>
                </Spin>
            </Card>
        </div>
    }
}