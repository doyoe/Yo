/**
 * @component ActionSheet
 * @version 3.0.0
 * @description 底部弹出菜单组件，基于Popup组件实现。
 *
 * - 类似iOS原生API调用方式。
 * - 点击菜单选项后自动关闭组件。
 *
 * @instructions {instruInfo: ./actionSheet.md}{instruUrl: actionsheet.html?hideIcon}
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Touchable from '../../touchable/src/touchable';
import Popup from '../../popup/src/popup';

let that = null;
const container = document.createElement('div');

class ActionSheet extends Component {
    constructor() {
        super();
        this.state = {
            show: false,
            cancelText: '',
            menu: [],
            title: ''
        };
        that = this;
    }

    hide() {
        this.setState({
            show: false
        });
    }

    render() {
        const { show, cancelText, menu, title } = this.state;

        const menuItem = menu.map((item, i) => (
            <Touchable
                onTap={() => {
                    this.hide();
                    item.onTap();
                }}
                key={i + 1}
                touchClass="item-touch"
            >
                <div className="item">{item.text}</div>
            </Touchable>
        ));

        const titleItem = !!title ? (<div className="title" key={0}>{title}</div>) : null;
        menuItem.unshift(titleItem);
        return (
            <Popup
                show={show}
                onMaskTap={() => this.hide()}
            >
                <div className="yo-actionsheet">
                    <div className="menu">
                        {menuItem}
                    </div>
                    <ul className="action">
                        <Touchable onTap={() => this.hide()} touchClass="item-touch">
                            <li
                                className="item"
                                onTouchTap={() => this.hide()}
                            >{cancelText}</li>
                        </Touchable>
                    </ul>
                </div>
            </Popup>
        );
    }
}

ReactDOM.render(<ActionSheet />, container);

/**
 * @method ActionSheet
 * @param {Object} obj 组件需要的对象参数，主要包含标题、菜单数组、取消按钮文字。
 * @param {Array} obj.menu 菜单选项数组，包含每个选项的文字和回调函数。
 * @param {String} [obj.title] 菜单选项标题，默认为空。
 * @param {String} [obj.cancelText] 组件取消按钮文字，默认'取消'。
 * @description 打开ActionSheet组件。
 */
export default ({ menu, title = '', cancelText = '取消' }) => that.setState({
    show: true,
    menu,
    title,
    cancelText
});