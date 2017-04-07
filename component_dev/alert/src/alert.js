/**
 * @component Alert
 * @version 3.0.0
 * @description 警告提示组件，居中展现需要关注的信息，基于Confirm组件实现。
 *
 * - 类似浏览器原生API调用方式。
 * - 自定义组件显隐过程动画。
 * - 返回一个Promise实例对象，可通过then方法绑定确定按钮回调。
 *
 *  @author qingguo.xu
 * @instructions {instruInfo: ./alert.md}{instruUrl: alert.html?hideIcon}
 */

import yoConfirm from '../../confirm/src/confirm';

/**
 * @method Alert
 * @description Alert API，调用以后在屏幕正中弹出一个Alert，可以按照option对象参数调用，也可以使用简易
 * 调用方式如 ``Alert(content, title, btnText, animation)``
 * @param {Object} option 配置对象，里面可以接受如下属性：
 * @param {String} [option.content] 组件显示的内容
 * @param {String} [option.title] 组件显示的标题
 * @param {String} [option.btnText] <3.0.1> 组件按钮的文本
 * @param {String | Object} [option.animation] 组件显隐执行的动画，格式同Dialog组件
 * @constructor Alert API
 */
export default function Alert(content = '', title = '', btnText = ['确定', ''], animation = 'fade') {
    if (typeof content === 'object') {
        const opt = content;
        content = opt.content != null ? opt.content : '';
        title = opt.title != null ? opt.title : '';
        btnText = opt.btnText != null ? [opt.btnText, ''] : ['确定', ''];
        animation = opt.animation || 'fade';
    }
    return yoConfirm(content, title, btnText, animation, false);
}
