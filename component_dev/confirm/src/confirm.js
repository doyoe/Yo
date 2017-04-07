/**
 * @component Confirm
 * @version 3.0.0
 * @description 确认弹框组件，居中显示需要关注的对话弹框组件，基于Dialog组件实现。
 *
 * - 类似浏览器原生API调用形式。
 * - 自定义组件显隐过程动画。
 * - 返回一个Promise实例对象，可通过Then方法分别绑定确认、取消回调函数。
 *
 * @instructions {instruInfo: ./confirm.md}{instruUrl: confirm.html?hideIcon}
 * @author qingguo.xu
 */

import Dialog from '../../dialog/src/dialog';
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
            btnText: ['确定', '取消'],
            onOk() {
            },
            onCancel() {
            }
        };
        that = this;
    }

    render() {
        const { show, title, content, animation, onOk, onCancel, btnText } = this.state;
        return (
            <Dialog
                show={show} title={title} onOk={onOk.bind(this)}
                animation={animation}
                okText={btnText[0] != null && btnText[0]}
                cancelText={btnText[1] != null && btnText[1]}
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
 * @param {Object} option 配置对象，可以接受以下属性：
 * @param {String} [option.content] 组件显示的内容
 * @param {String} [option.title] 组件显示标题
 * @param {Array} [option.btnText] <3.0.1> 按钮的文本，两个元素分别表示左/右按钮的文本
 * @param {Object} [option.animation] 组件显隐过程的动画，格式同Dialog组件
 * @param {Boolean} [option.cancel] 组件是否有取消按钮
 * @returns {Promise} 返回一个Promise实例对象
 * @description 确认弹框组件的调用方法，调用以后在屏幕正中弹出一个Confirm，可以按照option对象参数调用，也可以使用简易
 * 调用方式如 ``Confirm(content, title, btnText, animation, cancel)``
 */
export default function Confirm(content = '',
                                title = '',
                                btnText = ['确定', '取消'],
                                animation = 'fade',
                                cancel = true) {
    if (typeof content === 'object') {
        const opt = content;
        title = opt.title != null ? opt.title : '';
        content = opt.content != null ? opt.content : '';
        btnText = opt.btnText != null ? opt.btnText : ['确定', '取消'];
        animation = opt.animation != null ? opt.animation : 'fade';
        cancel = opt.cancel != null ? !!opt.cancel : true;
    }

    return new Promise((resolve) => {
        // duration的默认值是300
        let duration = animation !== 'none' ? 300 : 0;
        // 看是否有自定义animation对象
        if (animation != null && animation.duration != null) {
            duration = animation.duration;
        }

        function okBtn() {
            setTimeout(() => {
                resolve(true);
            }, duration);
            that.setState({ show: false });
        }

        function cancelBtn() {
            setTimeout(() => {
                resolve(false);
            }, duration);
            that.setState({ show: false });
        }

        that.setState({
            show: true,
            title,
            content,
            btnText,
            animation,
            onOk: okBtn,
            onCancel: cancel ? cancelBtn : false
        });
    });
}
