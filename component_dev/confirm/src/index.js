/**
 * @component Confirm
 * @version 3.0.0
 * @description 确认弹框组件，居中显示需要关注的对话弹框组件，基于Dialog组件实现。
 *
 * - 类似浏览器原生API调用形式。
 * - 自定义组件显隐过程动画。
 * - 返回一个Promise实例对象，可通过Then方法分别绑定确认、取消回调函数。
 *
 * #### 何时使用
 *
 * - 操作需要用户进一步确认时，弹出确认框，询问用户。
 * - 全屏居中模态展示框，自带遮罩层，返回一个Promise实例对象，绑定回调更方便。
 *
 *  @instructions {instruInfo: ./confirm.md}{instruUrl: confirm.html?hideIcon}
 * @author qingguo.xu
 */

import Dialog from '../../dialog/src';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

let that = null;
const container = document.createElement('div');

class ConfirmReact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            title: '',
            content: '',
            animation: 'none',
            onOk() {
            },
            onCancel() {
            }
        };
        that = this;
    }

    render() {
        const { show, title, content, animation, onOk, onCancel } = this.state;
        return (
            <Dialog
                show={show} title={title} onOk={onOk.bind(this)}
                animation={animation}
                onCancel={onCancel ? onCancel.bind(this) : false}
            >
                {content}
            </Dialog>
        );
    }
}

ReactDOM.render(<ConfirmReact />, container);

/**
 * @method Confirm
 * @param {String} content 组件显示的内容
 * @param {String} [title] 组件显示标题
 * @param {Object} [animation] 组件显隐过程的动画，格式同Dialog组件
 * @param {Boolean} [cancel] 组件是否有取消按钮
 * @returns {Promise} 返回一个Promise实例对象
 * @description 确认弹框组件的调用方法
 */
export default function Confirm(content = '', title = '', animation = 'fade', cancel = true) {
    return new Promise((resolve, reject) => {
        // duration的默认值是300
        let duration = animation != null ? 300 : 0;
        // 看是否有自定义animation对象
        if (animation != null && animation.duration != null) {
            duration = animation.duration;
        }

        function okBtn() {
            setTimeout(()=> {
                resolve(true);
            }, duration);
            that.setState({ show: false });
        }

        function cancelBtn() {
            setTimeout(()=> {
                resolve(false);
            }, duration);
            that.setState({ show: false });
        }

        that.setState({
            show: true,
            title,
            content,
            animation,
            onOk: okBtn,
            onCancel: cancel ? cancelBtn : false
        });
    });
}
