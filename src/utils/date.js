import React from 'react'
import { Select } from 'antd'
const Option = Select.Option;
export default {
    date() {
        let time = new Date()
        let n = time.getFullYear().toString().padStart(2, '0')
        let y = time.getMonth().toString().padStart(2, '0')
        let r = time.getDate().toString().padStart(2, '0')
        let ss = time.getHours().toString().padStart(2, '0')
        let ff = time.getMinutes().toString().padStart(2, '0')
        let mm = time.getSeconds().toString().padStart(2, '0')
        let zz = `${n}-${y}-${r} ${ss}:${ff}:${mm}`
        return zz
    },
    pagination(data, callback){
        return {
            onChange: (current)=>{
                callback(current)
            },
            current:data.result.page,
            pageSize:data.result.page_size,
            total:data.result.total_count,
            showQuickJumper:true,
            showTotal:()=>{
                return `一共${data.result.total_count}条`
            }
        }
    },
     // 下拉框获取options
     getOptionList(data){
        if(!data){
            return [];
        }
        let options = [] //[<Option value="0" key="all_key">全部</Option>];
        data.map((item)=>{
            options.push(<Option value={item.id} key={item.id}>{item.name}</Option>)
        })
        return options;
    },
    // 格式化金额,单位:分(eg:430分=4.30元)
    formatFee(fee, suffix = '') {
        if (!fee) {
            return 0;
        }
        return Number(fee).toFixed(2) + suffix;
    },
    // 格式化公里（eg:3000 = 3公里）
    formatMileage(mileage, text) {
        if (!mileage) {
            return 0;
        }
        if (mileage >= 1000) {
            text = text || " km";
            return Math.floor(mileage / 100) / 10 + text;
        } else {
            text = text || " m";
            return mileage + text;
        }
    },
    // 隐藏手机号中间4位
    formatPhone(phone) {
        phone += '';
        return phone.replace(/(\d{3})\d*(\d{4})/g, '$1***$2')
    },
    // 隐藏身份证号中11位
    formatIdentity(number) {
        number += '';
        return number.replace(/(\d{3})\d*(\d{4})/g, '$1***********$2')
    },
    /**
     * ETable 行点击通用函数
     * @param {*选中行的索引} selectedRowKeys
     * @param {*选中行对象} selectedItem
     */
    updateSelectedItem(selectedRowKeys, selectedRows, selectedIds) {
        if (selectedIds) {
            this.setState({
                selectedRowKeys,
                selectedIds: selectedIds,
                selectedItem: selectedRows
            })
        } else {
            this.setState({
                selectedRowKeys,
                selectedItem: selectedRows
            })
        }
    },
}