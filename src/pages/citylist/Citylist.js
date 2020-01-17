import React, { Component } from 'react'
import listarr from '../../json/citylist.json'
import BScroll from 'better-scroll'
import './citylist.scss'

console.log(listarr)

export default class Citylist extends Component {
    render() {
        return (
            <div className='citylist-box'>

                <div id='citylist-left-box'>
                    <ul className='content'>
                        <div style={{ height: 300, backgroundColor: 'yellow' }}>
                            <label>热门</label>
                        </div>
                        {
                            listarr.map(obj => <div id={obj.title}>
                                <h3>{obj.title}</h3>
                                {
                                    obj.child.map(city => <p style={{ lineHeight: 4 }}>{city}</p>)
                                }
                            </div>)
                        }
                    </ul>
                </div>
                <div className='right-box' onTouchMove={this.moveTitle.bind(this)}>{
                    listarr.map(obj => <p className='random-cls' onClick={this.clickRightTitle.bind(this, obj.title)}>{obj.title}</p>)
                }</div>
            </div>
        )


    }

    clickRightTitle(title) {
        this.leftBox.scrollToElement('#' + title, 600)
    }

    moveTitle(e) {
        //获取第一根手指的触屏事件对象
        // console.log(e.touches[0].clientX, e.touches[0].clientY)  //获取当前手指的触摸信息数组 如果想要获取当前手指的坐标，必须指定获取哪个手指的坐标
        let elt = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY)
        // console.log(elt.className) //可以根据当前的X和Y坐标，获取此坐标对应的DOM元素
        if (elt.className == 'random-cls') {
            //当前摸在了我想要的元素身上
            // console.log(elt.innerHTML)
            this.leftBox.scrollToElement('#' + elt.innerHTML, 600)
        }
    }

    componentDidMount() {
        this.leftBox = new BScroll('#citylist-left-box')
    }
}
