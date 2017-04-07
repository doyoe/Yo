/**
 * @function aniLoopInfinte
 * @description
 * 该动画适用于图片查看器情景，即图片数较多的情况下,支持定义节点数量。
 * @param [ALLOWANCE, ALLOWANCEAngle, showPage] 触发翻页的水平位移, 触发事件处理的手势角度tan绝对值，固定的节点数量。
*/
import React from 'react';
import { getRAF } from '../../common/util.js';

export default (ALLOWANCE = 20, ALLOWANCEAngle = 1, showPage = 3) => {
    const {
        rAF,
        cancelrAF
    } = getRAF();
    const obj = {
        aniQue: [],
        handleData({
            pageNow,
            operationTimer,
            pagesNum,
            width
        }, children) {
            let newChildren = [];
            if (pagesNum < showPage) {
                console.error('carousel 组建的 aniLoopInfinte 动画的数据条数应大于组件 showPage 且为奇数');
            }
            const locatArr = [];
            for (let i = -Math.floor(showPage / 2); i <= Math.floor(showPage / 2); i ++) {
                locatArr.push((operationTimer + i) % pagesNum < 0 ? (operationTimer + i) % pagesNum + pagesNum : (i + operationTimer) % pagesNum);
            }
            newChildren = locatArr.map((item, i) => React.cloneElement(children[item], {
                style: {
                    position: 'absolute',
                    left: `${(operationTimer + i - Math.floor(showPage / 2)) * 100}%`,
                    key: item
                }
            }));
            newChildren.unshift(React.cloneElement(children[0], {
                key: 0,
                currentPage: pageNow,
                style: {
                    visibility: 'hidden'
                }
            }));
            return newChildren;
        },
        touchstart() {},
        touchmove({
            touchmoveLocation,
            touchstartLocation,
            containerDOM,
            speed,
            operationTimer,
            width
        }) {
            if (!this._checkTouchAngle(touchstartLocation, touchmoveLocation)) { return; }
            const translateX = ((touchstartLocation[0] - touchmoveLocation[0]) / containerDOM.clientWidth + operationTimer) * width;
            this._addCss({
                dom: containerDOM,
                speed,
                translateX: -translateX,
                isAni: false
            });
        },
        _checkTouchAngle(prev, next) {
            const changeX = prev[0] - next[0];
            const changeY = next[1] - prev[1];
            const tan = Math.abs(changeX) / Math.abs(changeY);
            return tan > ALLOWANCEAngle;
        },
        touchend(aniObj) {
            const {
                touchendLocation,
                touchstartLocation
            } = aniObj;
            const cAniObj = aniObj;
            const distanceX = touchendLocation[0] - touchstartLocation[0];
            let operat;
            if (Math.abs(distanceX) > ALLOWANCE && this._checkTouchAngle(touchstartLocation, touchendLocation)) {
                operat = distanceX > 0 ? -1 : 1;
                cAniObj.operationTimer = aniObj.operationTimer + operat;
                return this.checkAni(cAniObj, operat);
            }
            return this.checkAni(cAniObj, 0);
        },
        checkAni(aniObj, isAni = true) {
            const {
                pagesNum,
                containerDOM,
                operationTimer,
                width
            } = aniObj;
            this._addCss({ dom: containerDOM, translateX: -operationTimer * width, isAni });
            const u = operationTimer % pagesNum;
            if (u === 0) {
                return 1;
            }
            return u < 0 ? u + pagesNum + 1 : u + 1;
        },
        next(aniObj) {
            return this.checkAni(aniObj);
        },
        arrive(aniObj, num, isAni) {
            return this.checkAni(aniObj, isAni);
        },
        prev(aniObj) {
            return this.checkAni(aniObj);
        },
        _addCss({ dom, translateX, isAni = true }) {
            const that = this;
            // 此处为Dom操作
            this.aniQue.push({ translateX, isAni });
            if (this.reqAni) {
                cancelrAF(this.reqAni);
            }
            this.reqAni = rAF(() => {
                if (!that.aniQue.length) return;
                const last = that.aniQue.pop();
                that.aniQue.length = 0;
                if (!last.isAni) {
                    dom.style.webkitTransition = 'none';
                    dom.style.transition = 'none';
                } else {
                    dom.style.webkitTransition = '';
                    dom.style.transition = '';
                }
                dom.style.webkitTransform = `translate(${last.translateX}px, 0) translateZ(0)`;
                dom.style.transform = `translate(${last.translateX}px, 0) translateZ(0)`;
                that.reqAni = null;
            });
        }
    };
    return obj;
};
