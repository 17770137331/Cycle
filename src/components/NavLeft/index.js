import React from 'react';
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {switchMenu} from '../../redux/action'
import './index.less'
import MenuConfig from '../../config/menuConfig'
import { Menu} from 'antd';
const { SubMenu } = Menu;

class NavLeft extends React.Component{
  state={
    menuTreeNode:[],
    currentKey:''
  }
  componentDidMount(){
    const menuTreeNode = this.renderMenu(MenuConfig)
    this.setState({menuTreeNode})
  }
  renderMenu = (data)=>{
    return data.map((item)=>{
      if(item.children){
        return (
          <SubMenu
           title={item.title} 
           key={item.key}
          >
            {this.renderMenu(item.children)}
          </SubMenu>
        )
      }else{
        {
          return (
            !item.isShow && (<Menu.Item key={item.key} title={item.title}>
              <NavLink to={item.key}>{item.title}</NavLink>
            </Menu.Item>)
          )
        }
      }
    })
  }
  handelClick = ({item,key})=>{
    if(key === this.state.currentKey){
      return false
    }
    // 事件派发 自动调用reducer
    const {dispatch} = this.props
    dispatch(switchMenu(item.props.title))
    this.setState({
      currentKey:key
    })

  }
  homeHandleClick = ()=>{
    const {dispatch} = this.props
    dispatch(switchMenu('首页'))
    this.setState({
      currentKey:''
    })
  }
  render(){
    return(
         <div>
              <NavLink to="/admin/home" onClick={this.homeHandleClick}>
                <div className="logo">
                  <img src="/assets/logo-ant.svg"/>
                  <h1>单车管理系统</h1>
                </div>
              </NavLink>
            <Menu 
              onClick={this.handelClick}
              mode="vertical" theme="dark">
              {this.state.menuTreeNode}
            </Menu>
         </div>
    )
  }
}

export default connect()(NavLeft)
