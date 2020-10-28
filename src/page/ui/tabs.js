import React from 'react'
import {Card,notification,Tabs, message,Icon} from 'antd'
import {PlusOutlined,EditOutlined,DeleteOutlined} from '@ant-design/icons'
import './ui.less'
const { TabPane } = Tabs;
export default class CTabs extends React.Component{
    state = {
        panes:[],
        activeKey:'1'
    }
    newTabIndex = 0
    openNotification = (type,desc)=>{
        if(desc)
        desc && notification.config({placement:desc})
        notification[type]({
            message:'发工资了',
            description:'上个月实际到岗22天应发工资20000'
        })
    }
    handelCallback = (key)=>{
        message.info(`hello,你选择页签的key是${key}`)
    }
    handelCallbackChange = (key)=>{
        message.info(`hello,你选择可变的页签的key是${key}`)
        this.setState({
            activeKey:key
        })
    }
    componentWillMount(){
        const panes = [
            {
                title:'Tab1',
                content:'Tab1',
                key:'1',
                type:'plus'
            },
            {
                title:'Tab2',
                content:'Tab2',
                key:'2',
                type:'edit'
            },
            {
                title:'Tab3',
                content:'Tab3',
                key:'3',
                type:'delete'
            },
        ]
        this.setState({
            panes,
            activeKey:panes[0].key
        })
    }
    onEdit = (targetKey, action) => {
        this[action](targetKey);
      };
    
      add = () => {
        const { panes } = this.state;
        const activeKey = `newTab${this.newTabIndex++}`;
        panes.push({ title: activeKey, content: 'Content of new Tab', key: activeKey });
        this.setState({ panes, activeKey });
      };
    
      remove = targetKey => {
        let { activeKey } = this.state;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
          if (pane.key === targetKey) {
            lastIndex = i - 1;
          }
        });
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (panes.length && activeKey === targetKey) {
          if (lastIndex >= 0) {
            activeKey = panes[lastIndex].key;
          } else {
            activeKey = panes[0].key;
          }
        }
        this.setState({ panes, activeKey });
      };
    render(){
        const {panes} = this.state
        return(
            <div style={{width:'100%'}}>
                <Card title="Tabs" className="card-wrap">
                    <Tabs defaultActiveKey="1" onChange={this.handelCallback}>
                        <TabPane tab="Tab 1" key="1">
                            React
                        </TabPane>
                        <TabPane tab="Tab 2" key="2" disabled>
                            Vue
                        </TabPane>
                        <TabPane tab="Tab 3" key="3">
                           Angular
                        </TabPane>
                    </Tabs>,
                </Card>
                <Card title="Tab带图的页签" className="card-wrap">
                    <Tabs defaultActiveKey="1" onChange={this.handelCallback}>
                        <TabPane tab={<span><PlusOutlined />>Tab1</span>} key="1">
                            React
                        </TabPane>
                        <TabPane tab={<span><EditOutlined/>Tab2</span>} key="2">
                            React
                        </TabPane>
                        <TabPane tab={<span><DeleteOutlined/>Tab3</span>} key="3">
                            React
                        </TabPane>
                    </Tabs>,
                </Card>
                <Card title="可编辑Tab的页签" className="card-wrap">
                    <Tabs 
                        activeKey={this.state.activeKey}   
                        onChange={this.handelCallbackChange}
                        onEdit={this.onEdit}
                        type="editable-card"
                    >
                        {
                            panes && panes.map((item,i)=>{
                                return(
                                    <TabPane tab={<span><Icon type={item.type}/>{item.title}</span>} key={item.key}>
                                        {item.content}
                                    </TabPane>
                                )
                            })
                        }
                    </Tabs>
                </Card>
            </div>
        )
    }
}