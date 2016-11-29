/**
 * @component Alert
 * @version 3.0.0
 * @description 警告提示组件，居中展现需要关注的信息，基于Confirm组件实现。
 *
 * - 类似浏览器原生API调用方式。
 * - 自定义组件显隐过程动画。
 * - 返回一个Promise实例对象，可通过then方法绑定确定按钮回调。
 *
 * #### 何时使用
 * - 当某个页面需要向用户显示警告的信息时。
 * - 全屏居中模态展示，自带遮罩层，不会自动消失，用户可以点击关闭。
 *
 *  @author qingguo.xu
 * @instructions {instruInfo: ./alert.md}{instruUrl: alert.html?hideIcon}
 */

import yoConfirm from '../../confirm/src';

/**
 * @method Alert
 * @param {String} content 组件显示的内容
 * @param {String} [title] 组件显示的标题
 * @param {String | Object} [animation] 组件显隐执行的动画，格式同Dialog组件
 * @constructor Alert构造函数
 */
export default function Alert(content = '', title = '', animation = 'fade') {
    return yoConfirm(content, title, animation, false);
}
