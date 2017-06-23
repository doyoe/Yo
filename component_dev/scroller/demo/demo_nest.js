import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Scroller from '../src/index';
import LazyImage from '../../lazyimage';

const imgs = [
    'http://userimg.qunarzz.com/imgs/201407/16/QvMa33SRJ4zSSg8x5720.jpg',
    'http://userimg.qunarzz.com/imgs/201407/16/QvMa33SRJ4h9dK_d5720.jpg',
    'http://userimg.qunarzz.com/imgs/201407/16/QvMa33SRJ4Gkvnq_5720.jpg',
    'http://userimg.qunarzz.com/imgs/201407/16/QvMa33SRJ4RBOyjO5720.jpg',
    'http://userimg.qunarzz.com/imgs/201407/16/QvMa33SRJ48hU_qY5720.jpg',
    'http://userimg.qunarzz.com/imgs/201407/16/QvMa33SRJ4xQalJ25720.jpg'
];

class ScrollerDemo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            contentOffset: {
                x: 0,
                y: 0,
            }
        };
    }

    render() {
        return (
            <Scroller directionLockThreshold={0} extraClass="container">
                <Scroller directionLockThreshold={0} scrollX={true} scrollY={false}>
                    <div className="filter">
                        <span>品牌</span>
                        <span>型号</span>
                        <span>价格</span>
                        <span>规格</span>
                        <span>功率</span>
                        <span>功能</span>
                        <span>颜色</span>
                        <span>尺寸</span>
                        <span>套装</span>
                        <span>范围</span>
                        <span>参数</span>
                    </div>
                </Scroller>
                <div>
                    {
                        new Array(30).fill('').map((item, index) =>
                            <div className="item" style={{ color: item, height: Math.random() * 100 + 180 }} key={index}>
                                <div>详情介绍 {index}：</div>
                                <LazyImage width={240} height={160} src={imgs[index % 6]} />
                            </div>
                        )
                    }
                </div>
            </Scroller>
        );
    }
}

ReactDOM.render(<ScrollerDemo />, document.getElementById('content'));
