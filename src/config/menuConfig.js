import Home from '../page/home'
import Buttons from '../page/ui/button'
import Modals from '../page/ui/modals'
import Loadings from '../page/ui/loadings'
import Notice from '../page/ui/notice'
import Gallery from '../page/ui/gallery'
import Message from '../page/ui/message'
import Tabs from '../page/ui/tabs'
import FormLogin from '../page/form/login'
import BaseTable from '../page/table/baseTable'
import HighTable from '../page/table/highTable'
import City from '../page/city'
import Order from '../page/order'
import Login from '../page/login'
import User from '../page/user/index'
import Permission from '../page/permission/index'
import Register from '../page/form/register'
import BikeMap from '../page/map/bikeMap'
import Tables from '../page/table/baseTable'
const menuList = [
    {
        title:'登录',
        key:'/login',
        component:Login,
        auth:false,
        isShow:true
    },
    {
        title:'首页',
        key:'/admin/home',
        component:Home,
        auth:false
    },
    {
        title:'UI',
        key:'/admin/ui',
        children:[
            {
                title:'按钮',
                key:'/admin/ui/buttons',
                component:Buttons,
                auth:true,
            },
            {
                title:'弹框',
                key:'/admin/ui/modals',
                component:Modals,
                auth:true,
            },
            {
                title:'Loading',
                key:'/admin/ui/loadings',
                component:Loadings,
                auth:true,
            },
            {
                title:'通知提醒',
                key:'/admin/ui/notification',
                component:Notice,
                auth:true,
            },
            {
                title:'全局Message',
                key:'/admin/ui/messages',
                component: Message,
                auth: true
            },
            {
                title:'Tab页签',
                key:'/admin/ui/tabs',
                component: Tabs
            },
            {
                title:'图片画廊',
                key:'/admin/ui/gallery',
                component: Gallery,
                auth:true,
            }
        ]
    },
    {
        title:'表单',
        key:'/admin/form',
        children:[
            {
                title:'登录',
                key:'/admin/form/login',
                component:FormLogin,
                auth:true,
            },
            {
                title:'注册',
                key:'/admin/form/resgister',
                component: Register,
                auth:true,
            }
        ]
    },
    {
        title:'表格',
        key:'/admin/table',
        children:[
            {
                title:'基础表格',
                key:'/admin/table/basic',
                component:BaseTable,
                auth:true,
            },
            {
                title:'高级表格',
                key:'/admin/table/high',
                component:HighTable,
                auth:true,
            }
        ]
    },
    {
        title:'城市管理',
        key:'/admin/city',
        component:City,
        auth:true,
    },
    {
        title:'订单管理',
        key:'/admin/order',
        component:Order,
        auth:true,
    },
    {
        title:'员工管理',
        key:'/user',
        component: User,
        auth: true
    },
    {
        title:'车辆地图',
        key:'/bikeMap',
        component: BikeMap,
        auth: true
    },
    {
        title:'权限设置',
        key:'/permission',
        component: Permission,
        auth: true
    },
];
export default menuList;