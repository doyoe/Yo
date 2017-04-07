export default {
    handleData(aniObj, children) {
        return children;
    },
    prev(aniObj) {
        return aniObj.pageNow - 1;
    },
    next(aniObj) {
        return aniObj.pageNow + 1;
    },
    arrive(aniObj, num) {
        return num;
    },
    touchstart() {
    },
    touchmove() {},
    touchend(aniObj) {
        return aniObj.pageNow;
    }
};