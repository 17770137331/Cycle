import React from 'react'
import './index.less'
import date from '../../utils/date'
import {Row, Col} from 'antd'
import axios from '../../axios/index'
import {connect} from 'react-redux'

class Header extends React.Component {
    state = {
        date: '',
        userName: '',
        sysTime: '',
        pic: '',
        weather: ''
    }

    componentDidMount() {
        let th = this
        setInterval(function() {
            th.setState({
                date: date.date()
            })
        }, 1000)

        this.setState({
            userName: 'chris'
        })
        this.getWeatherApi()
    }

    getWeatherApi = ()=>{
        let city = "长沙"
    axios.jsonP({
      url:`http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
    }).then((res)=>{
      if(res.status === 'success'){
        console.log(res);
        let data = res.results[0].weather_data[0]
        this.setState({
          pic:data.dayPictureUrl,
          weather:data.weather
        })
      }
    })
    }

    render() {
        const {userName, sysTime, pic, weather} = this.state
        const {menuType,menuName} = this.props
        console.log(this.props,123)
        return ( 
            <div className="header">
                <Row className="header-top">
                    <Col span={24}>
                    <span>欢迎，{userName}</span>
                        <a href="#">退出</a>
                    </Col>
                </Row>
                <Row className="breadcrumb">
                    <Col span={4} className="breadcrumb-title">
                        {
                            !menuType &&  (menuName || '首页')
                        }
                    </Col>
                    <Col span={20} className="weather">
                    <span className="date">{this.state.date}</span>
                        <span className="weather-img">
                            <img src={pic}/>
                        </span>
                    <span className="weather-detail">{weather}</span>
                    </Col>
                </Row>
            </div>
        )
    }
}

const mapStateProps = (state)=>{
    return {
      menuName:state.menuName
    }
  }
  export default connect(mapStateProps)(Header)