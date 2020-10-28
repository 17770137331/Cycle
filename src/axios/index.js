import jsonP from 'jsonp'
import axios from 'axios'
import {Modal} from 'antd'
import Utils from '../utils/date'

export default class Axios {
    static jsonP(options){
        return new Promise((resolve,reject)=>{
            jsonP(options.url,{
                params:"callback"
            },function(error,response){
                if(response.status == 'success'){
                    resolve(response)
                }else{
                    reject(response.message)
                }
            })
        })
    }
    static requestList(_this,url,params){
        var data = {
            params,
        }
        this.ajax({
            url,
            data
        }).then((data)=>{
            if(data && data.result){
                let list = data.result.item_list.map((item, index) => {
                    item.key = index;
                    return item;
                });
                _this.setState({
                    list,
                    pagination: Utils.pagination(data, (current) => {
                        _this.params.page = current;
                        _this.requestList();
                    })
                })
            }
            
        })
    }
    static ajax(options) {
        let loading;
        if(options.data && options.data.isShowLoading !== false) {
            loading = document.getElementById('ajaxLoading')
            loading.style.display = 'block'
        }
        let baseApi = "http://127.0.0.1:7300/mock/5f9142cf500f081b78c893c8/adminClcld"
        return new Promise((resolve, reject)=>{
            axios({
                url:options.url,
                method:"get",
                baseURL:baseApi,
                timeout:5000,
                params:(options.data && options.data.params) || ''
            }).then((response)=>{
                if(options.data && options.data.isShowLoading !== false){
                    loading = document.getElementById('ajaxLoading')
                    loading.style.display = 'none'
                }
                if(response.status == 200){
                    let res = response.data;
                    if(res.code == '0'){
                        resolve(res)
                    }else{
                        Modal.info({
                            title:'提示',
                            content:res.msg
                        })
                    }
                }else{
                    reject(response.data)
                }
            }).catch(response=>{
                loading = document.getElementById('ajaxLoading')
                loading.style.display = 'none'
                Modal.info({
                    title:"提示",
                    content:'网络错误'
                })
            })
        })
    }
}

