import React from 'react'
import {Route,Redirect} from 'react-router-dom'
import Admin from './admin'
import Common from './common'
import OrderDetail from './page/order/detail'
export default class FrontAuth extends React.Component{
    // 记录下点击路由和path相等的值 取出对用的对象的配置
    routerCon = ''
    // 定义一个数组 把key的值push进去
    routerArr = [];
    // 定义一个数组把对应上的每一项配置push进去
    routerItemArr = []
    getConfig = (routerConfig,pathName)=>{
        // 没有检测详情页
        if(/\/common\/order\/detail\/\d/.test(pathName)){
            return 'detail'
        }
        // 定义一个方法 递归调用 对key的值
        this.getArr(routerConfig)
        for(let i=0;i<this.routerArr.length;i++){
            // 找配置和用户输入页面的pathname的对比
            if(this.routerArr[i] === pathName){
                this.routerCon = this.routerArr[i]
                break;
            }else{
                this.routerCon = false
            }
        }
    }
    // 递归拿到所有的key的值
    getArr = (routerConfig)=>{
        for(let i=0;i<routerConfig.length;i++){
            // 没有children的时候
            if(!routerConfig[i].children){
                this.routerArr.push(routerConfig[i].key)
                this.routerItemArr.push(routerConfig[i])
            }else{
                this.getArr(routerConfig[i].children)
            }
        }
    }

    render(){
        const {location,config} = this.props
        // path是你在点击路由的时候的值
        const {pathname} = location
        const isLogin = true;
        // 获取传过来的config
        // 写方法来处理config
        let detail = this.getConfig(config,pathname)
        // 定义路由是否是合法的标识 以及合法的时候存储路由的配置对象
        let targetRouterConfig;
        // routerCon是false的情况下
        if(!this.routerCon){
            targetRouterConfig = false;
        }else{
            for(let i=0;i<this.routerItemArr.length;i++){
                if(this.routerItemArr[i].key === this.routerCon){
                    targetRouterConfig = this.routerItemArr[i];
                    break;
                }
            }
        }
        // 游客模式
        if(targetRouterConfig && !targetRouterConfig.auth && !isLogin){
            const {component} = targetRouterConfig
            return <Admin><Route path={pathname} component={component}></Route></Admin>
        }
        // 
        if(isLogin){
            // 访问的还是登录页
            if(pathname == '/login'){
                return <Redirect to="/admin/home"></Redirect>
            }else if(pathname == '/'){
                return <Redirect to="/admin/home"></Redirect>
            }else{
                if(detail === 'detail'){
                    return <Common><Route path="/common/order/detail/:orderId" component={OrderDetail}></Route></Common>
                }
                if(targetRouterConfig){
                    return <Admin><Route path={pathname} component={targetRouterConfig.component}></Route></Admin>
                }else{
                    return <Redirect to="/404"></Redirect>
                }
            }
        }else{
            // 路由合法和不合法
            if(targetRouterConfig && targetRouterConfig.auth){
                return <Redirect to="/login"></Redirect>
            }else{
                return <Redirect to="/404"></Redirect>
            }
        }
    }
}