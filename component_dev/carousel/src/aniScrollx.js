/**
 * @function aniScrollX
 * @description 水平滚动动画，适用于有限数量的滚动展示
 * @param [ALLOWANCEAngle, ALLOWANCEDistance] 触发事件处理的手势角度tan绝对值，触发翻页的水平位移
 */

import React from 'react';
import CarouselItem from './carouselItem.js';
import { getRAF, whichTransitionEventPrefix } from '../../common/util.js';


export default (
    ALLOWANCEAngle = 0.57,
    ALLOWANCEDistance = 30,
    movePercentage = 1
) => {
    const {
        rAF,
        cancelrAF
    } = getRAF();
    const transitionendEndName = `${whichTransitionEventPrefix()}end`;
    const ani = {
        aniQue: [],
        handleData({
            loop,
            pageNow
        }, children) {
            const newChildren = React.Children.toArray(children);
            if (loop) {
                const len = children.length;
                const lastfakeDomStyle = {
                    key: 0
                };
                const firstFakeDomStyle = {
                    key: -1
                };
                if (children[0].type === CarouselItem) {
                    lastfakeDomStyle.index = len;
                    lastfakeDomStyle.extraClass = children[len - 1].props.extraClass ? `${children[len - 1].props.extraClass} extra-item` : 'extra-item';
                    firstFakeDomStyle.index = 1;
                } else {
                    lastfakeDomStyle.className = children[len - 1].props.className ? `${children[len - 1].props.className} extra-item` : 'extra-item';
                }
                const header = React.cloneElement(children[len - 1], lastfakeDomStyle);
                const footer = React.cloneElement(children[0], firstFakeDomStyle);
                newChildren.unshift(header);
                newChildren.push(footer);
            }
            return newChildren;
        },
        _checkTouchAngle(prev, next) {
            const changeX = prev[0] - next[0];
            const changeY = next[1] - prev[1];
            const tan = Math.abs(changeX) / Math.abs(changeY);
            return tan > ALLOWANCEAngle;
        },
        touchstart() {},
        touchmove({
            touchstartLocation,
            touchmoveLocation,
            pageNow,
            containerDOM,
            width
        }) {
            if (!this._checkTouchAngle(touchstartLocation, touchmoveLocation)) { return; }
            const translateX = (pageNow - 1) * width * movePercentage + touchstartLocation[0] - touchmoveLocation[0];
            this._addCss({
                dom: containerDOM,
                speed: 0,
                translateX: -translateX,
                reset: true,
                width
            });
        },
        touchend(aniObj) {
            const {
                touchstartLocation,
                touchendLocation,
                pageNow
            } = aniObj;
            const distanceX = touchendLocation[0] - touchstartLocation[0];
            let newpageNow = pageNow;
            if (Math.abs(distanceX) > ALLOWANCEDistance && this._checkTouchAngle(touchstartLocation, touchendLocation)) {
                newpageNow = distanceX > 0 ? pageNow - 1 : pageNow + 1;
            } else {
                newpageNow = pageNow;
            }
            return this.checkAni(aniObj, newpageNow);
        },
        checkAni(aniObj, pageNow) {
            const {
                pagesNum,
                speed,
                containerDOM,
                loop,
                // aniSpeed,
                width
            } = aniObj;
            const self = this;
            let translateX = width * (1 - pageNow) * movePercentage;
            let newpageNow = pageNow;
            if (pageNow < 1 || pageNow > pagesNum) {
                if (loop) {
                    containerDOM.addEventListener(transitionendEndName, function test() {
                        const translate = pageNow === 0 ? width * (1 - pagesNum) * movePercentage : 0;
                        self._addCss({
                            dom: containerDOM,
                            reset: true,
                            translateX: translate,
                            width
                        });
                        containerDOM.removeEventListener(transitionendEndName, test);
                    }, false);
                    newpageNow = pageNow === 0 ? pagesNum : 1;
                } else {
                    newpageNow = pageNow < 1 ? 1 : pagesNum;
                    translateX = width * (1 - newpageNow) * movePercentage;
                }
            }
            this._addCss({
                dom: containerDOM,
                reset: false,
                speed,
                translateX,
                width
            });
            return newpageNow;
        },
        next(aniObj) {
            const {
                pageNow
            } = aniObj;
            const pageNext = pageNow + 1;
            return this.checkAni(aniObj, pageNext);
        },
        prev(aniObj) {
            const {
                pageNow,
                containerDOM,
                speed,
                width
            } = aniObj;
            const pageNext = pageNow - 1;
            const translateX = width * (1 - pageNext);
            this._addCss({
                dom: containerDOM,
                speed,
                translateX
            });
            return this.checkAni(aniObj, pageNext);
        },
        arrive(aniObj, num, isAni) {
            if (num >= 1 && num <= aniObj.pagesNum) {
                const translateX = (1 - num) * aniObj.width * movePercentage;
                this._addCss({
                    dom: aniObj.containerDOM,
                    speed: 0.1,
                    translateX,
                    reset: !isAni,
                    width: aniObj.width
                });
            } else {
                console.warn(`传入carousel组建的arrive方法的页面为${num},该值不合法`);
            }
            return num;
        },
        _addCss({
            dom,
            translateX = 0,
            reset
        }) {
            const that = this;
            // 此处为Dom操作
            this.aniQue.push({ translateX, reset });
            if (this.reqAni) {
                cancelrAF(this.reqAni);
            }
            this.reqAni = rAF(() => {
                if (!that.aniQue.length) return;
                const last = that.aniQue.pop();
                that.aniQue.length = 0;
                if (last.reset) {
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
    return ani;
};
