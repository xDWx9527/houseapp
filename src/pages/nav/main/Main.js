import React, { Component } from 'react'
import { WingBlank, Carousel, Grid } from 'antd-mobile'
import './main.scss'
import { IP, gethouselist } from '../../../api/apis'
import Axios from 'axios'

const data = [{ icon: 'http://pic.51yuansu.com/pic3/cover/02/17/86/59af01bf260ee_610.jpg', text: '新房' },
{ icon: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1578994484325&di=0137de4548306b04f54fc9d7bfd017f8&imgtype=0&src=http%3A%2F%2Fd.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F77094b36acaf2edd987946328f1001e938019364.jpg', text: '二手房' },
{ icon: 'http://pic.51yuansu.com/pic3/cover/02/17/86/59af01bf260ee_610.jpg', text: '海外房产' },
{ icon: 'http://pic.51yuansu.com/pic3/cover/02/17/86/59af01bf260ee_610.jpg', text: '商铺' },
{ icon: 'http://pic.51yuansu.com/pic3/cover/02/17/86/59af01bf260ee_610.jpg', text: '租房' },
{ icon: 'http://pic.51yuansu.com/pic3/cover/02/17/86/59af01bf260ee_610.jpg', text: '卖房' },
{ icon: 'http://pic.51yuansu.com/pic3/cover/02/17/86/59af01bf260ee_610.jpg', text: '买不买' },
{ icon: 'http://pic.51yuansu.com/pic3/cover/02/17/86/59af01bf260ee_610.jpg', text: '问答' }]

export default class Main extends Component {

    state = {
        data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
        imgHeight: 176,
        mycity: '定位中',
        houselist: []   //房产列表
    }

    render() {
        return (
            <div className='main_container'>
                <div className='search_box'>
                    <label onClick={this.clickTitle.bind(this, '#/citylist')}>{this.state.mycity}▼</label>
                    <div onClick={this.clickTitle.bind(this, '#/search')} className='search_center'>
                        <img src={require('../../../assets/imgs/icon_search.png')} />
                        <label>请输入楼盘名、商铺地址</label>
                    </div>
                    <img onClick={this.clickTitle.bind(this, '#/housemap')} src={require('../../../assets/imgs/icon_map.png')} />
                </div>

                {/* 轮播 */}
                <Carousel
                    autoplay
                    infinite
                >
                    {this.state.data.map(val => (
                        <img
                            key={val}
                            src={`https://zos.alipayobjects.com/rmsportal/${val}.png`}
                            alt=""
                            style={{ width: '100%', verticalAlign: 'top' }}
                            onLoad={() => {
                                // fire window resize event to change height
                                window.dispatchEvent(new Event('resize'));
                                this.setState({ imgHeight: 'auto' });
                            }}
                        />
                    ))}
                </Carousel>

                <Grid data={data} hasLine={false} />
                {/*1. 准备地图容器 */}
                {/* <div id="my-map" style={{ width: 300, height: 300 }}></div> */}

                {
                    this.state.houselist.map(obj => <div key={obj.name}>
                        <img style={{ width: 100 }} src={IP + obj.imgs} />
                    </div>)
                }
            </div>
        )
    }

    componentWillUnmount() {
        //回收资源, 当组件销毁时候， 所有的响应就全部不在执行

        //这段代码的意思就是把组件的setState函数设置为一个进去就return的函数
        //这段代码为什么说是万金油？？因为这段代码的意思就是不管你后面是什么方式来设置state，都直接return不处理，防止内存泄漏！
        this.setState = (state, callback) => {
            return;
        };

    }

    //初始化获取地图定位数据
    componentDidMount() {

        // setTimeout(() => {
        //     this.setState()
        // }, 20000)

        gethouselist().then((res) => {
            console.log(res.data)
            this.setState({
                houselist: res.data //保存状态
            })
        })


        //2. 初始化1个DIV为地图容器  参数1：div id，参数2： 地图配置属性
        var map = new window.AMap.Map("my-map", {
            resizeEnable: true,
            center: [116.397428, 39.90923], //地图显示的中心点
            zoom: 13
        });



        // console.log(this)
        let _this = this
        //实例化城市查询类
        var citysearch = new window.AMap.CitySearch();
        //自动获取用户IP，返回当前城市
        citysearch.getLocalCity(function (status, result) {
            if (status === 'complete' && result.info === 'OK') {
                if (result && result.city && result.bounds) {
                    var cityinfo = result.city; //当前城市名
                    var citybounds = result.bounds; //城市当前的经纬度

                    setTimeout(() => {
                        //设置当前城市
                        _this.setState({
                            mycity: cityinfo
                        })
                        // map.setBounds(citybounds);  //设置地图的center经纬度坐标
                    }, 3000)

                    console.log('定位到的城市在：', cityinfo)
                    // document.getElementById('info').innerHTML = '您当前所在城市：' + cityinfo;
                    //地图显示当前城市

                }
            } else {
                // document.getElementById('info').innerHTML = result.info;
                console.log('定位失败：', result.info)
            }
        });
    }

    clickTitle(href) {
        window.location.href = href
    }
}
