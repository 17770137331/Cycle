import React from 'react'
import {Card, Table, Modal, Button, message} from 'antd'
// import axios from 'axios'
import Util from '../../utils/date'
import axios from '../../axios/index'

export default class Tables extends React.Component {
    state = {
        dataSource: [],
        dataSource2: [],
        pagination: {}
    }
    params = {
        page: 1
    }

    componentDidMount() {
        const data = [
            {
                id:'0',
                userName:'Jack',
                sex:'1',
                state:'1',
                interest:'2',
                birthday:'2000-01-01',
                address:'北京市海淀区奥林匹克公园',
                time:'09:00'
            },
            {
                id: '1',
                userName: 'Tom',
                sex: '1',
                state: '3',
                interest: '1',
                birthday: '2000-01-01',
                address: '北京市海淀区奥林匹克公园',
                time: '09:00'
            },
            {
                id: '2',
                userName: 'Lily',
                sex: '1',
                state: '1',
                interest: '1',
                birthday: '2000-01-01',
                address: '北京市海淀区奥林匹克公园',
                time: '09:00'
            },
        ]
        data.map((item,index)=>{
            item.key = index;
        })
        this.setState({
            dataSource: data
        })
        this.requert("dataSource2")
    }


    requert(type) {
        let _this = this
        axios.ajax({
            url: "/table/list",
            data:{
                params: this.params
            }
        }).then((res)=>{
            let list = res.result.list.map((item,index)=>{
                item.key = index
                return item
            })
            const pagination = Util.pagination(res, (current)=> {
                _this.params.page = current
                _this.requert(type)
            })
            // const pagination = {
            //     onChange:(current) => {
            //         this.params.page = current
            //         console.log(current, type)
            //         this.requert(type)
            //     },
            //     current: data.result.page,
            //     pageSize: data.result.page_size,
            //     total: data.result.total_count,
            //     showQuickJumper: true,
            //     showTotal: () => {
            //         return `一共${data.result.total_count}条`
            //     }
            // }
            this.setState({
                dataSource2: list,
                pagination
            })
        })
    }

    onRowClick = (record,index)=>{
        let selectKey = index
        Modal.info({
            title: '信息',
            content: `用户名：${record.userName},用户爱好：${record.interest}`
        })
        this.setState({
            keys: selectKey,
            item: record
        })
    }

    handleDelete = ()=>{
        const rows = this.state.rows
        let ids = []
        rows.map((itme, index)=>{
            ids.push(itme.id)
        })
        Modal.confirm({
            title:'删除',
            content:`确定要删除${ids.join(',')}`,
            onOk: ()=>{
                message.success('删除成功')
                this.requert()
            }
        })
    }

    render() {
        const {dataSource, dataSource2, dataSource3, pagination} = this.state
        const {keys,rows} = this.state
        const rowSelection = {
            type: 'radio',
            onChange:(keys,rows)=>{
                console.log(keys,rows)
            }
        }
        const rowCheckedSelection = {
            type: 'checked',
            keys,
            onChange:(keys,rows)=>{
                console.log(keys,rows)
                this.setState({
                    keys,
                    rows
                })
            }
        }
        const columns = [
            {
                title:'id',
                key:'id',
                dataIndex:'id'
            },
            {
                title: '用户名',
                key: 'userName',
                dataIndex: 'userName'
            },
            {
                title: '性别',
                key: 'sex',
                dataIndex: 'sex',
                render(sex){
                    return sex ==1 ?'男':'女'
                }
            },
            {
                title: '状态',
                key: 'state',
                dataIndex: 'state',
                render(state){
                    let config  = {
                        '1':'咸鱼一条',
                        '2':'风华浪子',
                        '3':'北大才子',
                        '4':'百度FE',
                        '5':'创业者'
                    }
                    return config[state];
                }
            },
            {
                title: '爱好',
                key: 'interest',
                dataIndex: 'interest',
                render(abc) {
                    let config = {
                        '1': '游泳',
                        '2': '打篮球',
                        '3': '踢足球',
                        '4': '跑步',
                        '5': '爬山',
                        '6': '骑行',
                        '7': '桌球',
                        '8': '麦霸'
                    }
                    return config[abc];
                }
            },
            {
                title: '生日',
                key: 'birthday',
                dataIndex: 'birthday'
            },
            {
                title: '地址',
                key: 'address',
                dataIndex: 'address'
            },
            {
                title: '早起时间',
                key: 'time',
                dataIndex: 'time'
            }
          ]
        return ( 
            <div style={ {width:"100%"} }>
                <Card title="基础表格">
                    <Table dataSource={dataSource} columns={columns} pagination={false}/>
                </Card>
                <Card title="后台数据表格">
                    <Table bordered dataSource={dataSource2} columns={columns} pagination={false}/>
                </Card>
                <Card title="分页的表格">
                    <Table dataSource={dataSource2} columns={columns} pagination={pagination}/>
                </Card>
                <Card title="单选表格">
                    <Table 
                        bordered
                        onRow={(record,index)=>{
                            return{
                                onClick:()=>{
                                    this.onRowClick(record,index)
                                }
                            }
                        }}
                        rowSelection={rowSelection}
                        dataSource={dataSource2} 
                        columns={columns} 
                        pagination={false}
                    />
                </Card>
                <Card title="多选表格">
                    <div style={ {marginBottom:10} }>
                        <Button onClick={this.handleDelete}>删除</Button>
                    </div>
                    <Table 
                        bordered
                        onRow={(record,index)=>{
                            return{
                                onClick:()=>{
                                    this.onRowClick(record,index)
                                }
                            }
                        }}
                        rowSelection={rowCheckedSelection}
                        dataSource={dataSource2} 
                        columns={columns} 
                        pagination={false}
                    />
                </Card>
            </div>
        )
    }
}