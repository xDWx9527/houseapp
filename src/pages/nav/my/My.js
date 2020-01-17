import React, { Component } from 'react'
import { List } from 'antd-mobile'

const Item = List.Item;

export default class My extends Component {
    state = {
        list: [{ img: 'my_house_icon', text: '我的积分' },
        { img: 'my_chat_icon', text: '搜藏' },
        { img: '' },
        { img: 'my_subscription_icon', text: '设置' },
        { img: 'my_house_icon', text: '海外资产' },
        { img: '' },
        { img: 'my_house_icon', text: '月度统计表' },
        { img: '' },
        { img: 'my_house_icon', text: '我的问答' },
        { img: 'my_house_icon', text: '论坛' },
        { img: '' },
        { img: 'my_house_icon', text: '意见反馈' }]
    }

    render() {
        return (
            <div>
                <div style={{ height: 200, backgroundColor: '#01A75B' }}></div>


                <List>
                    {
                        this.state.list.map(obj => {
                            //有图标的时候
                            if (obj.img != '') return <Item
                                thumb={require('../../../assets/imgs/' + obj.img + '.png')}
                                arrow="horizontal"
                                onClick={() => { }}
                            >{obj.text}</Item>
                            else return <div style={{backgroundColor: '#F4F4F4',height: 8}}></div>

                        })
                    }
                </List>
            </div>
        )
    }
}
