/**
 * touchable手势处理,解决Scroller内部的手势冲突
 * 在滚动时不会触发active
 * 在active之后发生滚动会取消active状态
 */
import ReactDOM from 'react-dom';
const TAP_SLOP = 5;
export const TAP_DELAY = 50;
/**
 * @param endPoint
 * @param startPoint
 * @returns {number}
 * 根据个点的坐标计算出位移
 */
function getDistance(endPoint, startPoint) {
    return Math.sqrt(Math.pow(endPoint.pageX - startPoint.pageX, 2) + Math.pow(endPoint.pageY - startPoint.pageY, 2));
}

/**
 * @param endPoint
 * @param startPoint
 * @returns {boolean}
 * 根据两个点的位移判断是否应该取消Tap事件的触发
 */
function onTouchMoveShouldCancelTap(endPoint, startPoint) {
    return getDistance(endPoint, startPoint) > TAP_SLOP;
}

/**
 * @param evt
 * @returns {touch/null}
 * 获取触点
 */
function getTouchPoint(evt) {
    return evt.touches.length ? { pageX: evt.touches[0].pageX, pageY: evt.touches[0].pageY } : null;
}

/**
 * @param domNode
 * @param activeClass
 * 移除item的activeClass
 */
function removeActiveClass(domNode, activeClass) {
    if (domNode && activeClass) {
        domNode.className = domNode.className.replace(` ${activeClass}`, '');
    }
}

/**
 * @param scroller
 * @returns {boolean}
 * 判断组件是否在滚动
 */
function isScrolling(scroller) {
    return scroller ? scroller.isScrolling : false;
}

function isAnySwipeMenuOpen(swipeMenuList) {
    return swipeMenuList ? swipeMenuList.openIndex !== -1 : false;
}

// touchStart的位置,是否需要放弃Tap触发,Tap周期(start,move,end)是否已经结束
let startPoint,
    shouldAbortTap;
let captured = null;

export default function ({
    component,
    scroller,
    swipeMenuList,
    activeClass,
    onTap,
    onTouchStart,
    disabled
}) {
    const gestureObj = {
        onTouchStart(evt) {
            const domNode = ReactDOM.findDOMNode(component);
            removeActiveClass(domNode, activeClass);
            // 如果组件正在滚动,直接放弃Tap触发
            shouldAbortTap = isScrolling(scroller) || isAnySwipeMenuOpen(swipeMenuList);
            startPoint = getTouchPoint(evt);
            onTouchStart(evt);
            if (!captured) {
                captured = domNode;
            }
            // TAP_DELAY之后再次判断是否要触发Tap,如果这段时间内出现了大的位移,if后面的逻辑就不会执行
            setTimeout(() => {
                const className = activeClass;
                if (!shouldAbortTap && className && captured === domNode && !disabled) {
                    domNode.className += ` ${className}`;
                }
            }, TAP_DELAY);
        },
        onTouchMove(evt) {
            const domNode = ReactDOM.findDOMNode(component);
            const currentPoint = getTouchPoint(evt);
            // 根据touchmove的距离判断是否要放弃tap
            if (onTouchMoveShouldCancelTap(currentPoint, startPoint)) {
                shouldAbortTap = true;
                captured = null;
                removeActiveClass(domNode, activeClass);
            }
        },
        onTouchEnd(evt) {
            const target = evt.target;
            const domNode = ReactDOM.findDOMNode(component);
            // 如果需要触发tap,在TAP_DELAY之后触发onTap回调
            if (!shouldAbortTap && captured === domNode) {
                setTimeout(() => {
                    if (!disabled) {
                        onTap(target);
                    }
                    removeActiveClass(domNode, activeClass);
                    captured = null;
                }, TAP_DELAY + 10);
            } else if (shouldAbortTap) {
                captured = null;
            }
        },
        onTouchCancel() {
            const domNode = ReactDOM.findDOMNode(component);
            removeActiveClass(domNode, activeClass);
        }
    };

    return gestureObj;
}
