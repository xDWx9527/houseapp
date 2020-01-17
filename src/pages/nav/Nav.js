import React, { Component } from 'react'
import { TabBar } from 'antd-mobile'
import Main from './main/Main'
import Chat from './chat/Chat'
import History from './history/History'
import My from './my/My'

window.load = true

export default class Nav extends Component {
    state = {
        selectedTab: 'main',   //当前选中的标签
        iconlist: [{ title: '首页', key: 'main', icon: 'icon_main', sicon: 'icon_main_s' },
        { title: '微聊', key: 'chat', icon: 'icon_chat', sicon: 'icon_chat_s' },
        { title: '足迹', key: 'history', icon: 'icon_history', sicon: 'icon_history_s' },
        { title: '我的', key: 'my', icon: 'icon_my', sicon: 'icon_my_s' }]
    };

    renderContent() {
        // console.log(window.load, this.state.selectedTab)
        // if (window.load) {
        //     window.load = false
            //区分一下当前点击的到底谁？？？当前选中的标签是谁
            //根据当前选中的状态，判断返回哪个组件加载到屏幕
            switch (this.state.selectedTab) {
                case 'main': return <Main />
                case 'chat': return <Chat />
                case 'history': return <History />
                case 'my': return <My />
            }
        // }

    }

    render() {
        return (
            <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }}>
                <TabBar
                    unselectedTintColor="#949494"   //未选中字体颜色
                    tintColor="#01A75B" //选中字体颜色
                    barTintColor="white"    //底栏背景色
                >
                    {
                        this.state.iconlist.map(obj => <TabBar.Item
                            title={obj.title}
                            key={obj.key}  //唯一标识
                            //未选中图标
                            icon={<div style={{ width: '22px', height: '22px', background: `url(${require('../../assets/imgs/' + obj.icon + '.png')}) center center /  21px 21px no-repeat` }} />}
                            //选中图标
                            selectedIcon={<div style={{ width: '22px', height: '22px', background: `url(${require('../../assets/imgs/' + obj.sicon + '.png')}) center center /  21px 21px no-repeat` }} />}
                            selected={this.state.selectedTab === obj.key}
                            onPress={() => {
                                this.setState({
                                    selectedTab: obj.key,
                                });
                                window.load = true
                            }}
                        >
                            {this.renderContent()}
                        </TabBar.Item>)
                    }
                </TabBar>
            </div>
        );
    }
}
