import React from 'react'
import { Input, Select, Form, Button, Checkbox, Radio, DatePicker} from 'antd'
import Utils from '.././../utils/date';
const FormItem = Form.Item;

class FilterForm extends React.Component{
    formRef = React.createRef();
    handleFilterSubmit = (values)=>{
        this.props.filterSubmit(values);
    }

    reset = ()=>{
        this.formRef.current.resetFields();
    }

    initFormList = ()=>{
        const formList = this.props.formList;
        const formItemList = [];
        if (formList && formList.length>0){
            formList.forEach((item,i)=>{
                let label = item.label;
                let field = item.field;
                let initialValue = item.initialValue || '';
                let placeholder = item.placeholder;
                let width = item.width;
                if (item.type == '时间查询'){
                    const begin_time = <FormItem label="订单时间" key={field} name="begin_time">
                        <DatePicker showTime={true} placeholder={placeholder} format="YYYY-MM-DD HH:mm:ss"/>
                    </FormItem>;
                    formItemList.push(begin_time)
                    const end_time = <FormItem label="~" colon={false} key={field} name="end_time">
                        <DatePicker showTime={true} placeholder={placeholder} format="YYYY-MM-DD HH:mm:ss" />
                    </FormItem>;
                    formItemList.push(end_time)
                }else if(item.type == 'INPUT'){
                    const INPUT = <FormItem label={label} key={field} name={field}>
                                <Input type="text" placeholder={placeholder} />
                    </FormItem>;
                    formItemList.push(INPUT)
                } else if (item.type == 'SELECT') {
                    const SELECT = <FormItem label={label} key={field} name={field}>
                                <Select
                                    style={{ width: width }}
                                    placeholder={placeholder}
                                >
                                    {Utils.getOptionList(item.list)}
                                </Select>
                    </FormItem>;
                    formItemList.push(SELECT)
                } else if (item.type == 'CHECKBOX') {
                    const CHECKBOX = <FormItem label={label} key={field} name={field}>
                                <Checkbox>
                                    {label}
                                </Checkbox>
                    </FormItem>;
                    formItemList.push(CHECKBOX)
                }
            })
        }
        return formItemList;
    }
    render(){
        let {formList} = this.props
        let obj = {}
        for (let i = 0; i< formList.length;i++){
            formList[i].initialValue && (obj[formList[i].field] = formList[i].initialValue)
        }
        
        return (
            <Form layout="inline" ref={this.formRef} initialValues={obj} onFinish={this.handleFilterSubmit}>
                { this.initFormList() }
                <FormItem>
                    <Button type="primary" style={{ margin: '0 20px' }} htmlType="submit" >查询</Button>
                    <Button onClick={this.reset}>重置</Button>
                </FormItem>
            </Form>
        );
    }
}
export default FilterForm