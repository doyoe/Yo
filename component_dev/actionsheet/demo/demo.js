import React from 'react';
import ReactDOM from 'react-dom';
import ActionSheet from '../src';
import Toast from '../../toast/src';

class ActionSheetDemo extends React.Component {

    render() {
        return (
            <div className="test-wrap">
                <button onClick={() => {
                    ActionSheet({
                        menu: [{
                            text: '存储图像',
                            onTap() {
                                Toast.show('存储图像');
                            }
                        }, {
                            text: '拷贝',
                            onTap() {
                                Toast.show('拷贝');
                            }
                        }], title: '保存图片？', cancelText: 'cancel'
                    });
                }}>Open ActionSheet</button>
            </div >
        );
    }
}

ReactDOM.render(<ActionSheetDemo />, document.getElementById('content'));