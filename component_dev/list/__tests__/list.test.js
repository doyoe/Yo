/**
 * Created by chenjiao on 2017/3/9.
 */
import ListCore from '../src/ListCore';
import testData from './testdata';
import Immutable from 'immutable';

let guid = -1;
function getImage(url) {
    return `http://himg1.qunarzz.com/imgs/${url}a818.jpg`;
}

const dataSource = [];

for (let i = 0; i < 50; i++) {
    const item = testData.data.commentList[i];
    dataSource.push({
        nickname: item.nickName,
        avatar: getImage(item.imgUrl),
        imageHeight: 300,
        key: ++guid,
        color: 'black'
    });
}

const listCore = new ListCore({
    dataSource,
    itemHeight: 100,
    infinite: true,
    infiniteSize: 20,
    offsetY: 1000,
    staticSectionHeight: 20
});

test('The listcore instance should be successfully initiated.', () => {
    expect(listCore.WINDOW_HEIGHT).toBeDefined();
    expect(listCore.infinite).toBe(true);
    expect(listCore.VISIBLE_SIZE).toBe(20);
    expect(listCore.isHeightFixed).toBe(true);
    expect(listCore.direction).toBe('up');
    expect(listCore.offsetY).toBe(1000);
    expect(listCore.startIndex).toBe(8);
    expect(listCore.staticSectionHeight).toBe(20);
    expect(listCore.totalHeight).toBe(5020);
});

test('The attributes of renderedItem should be complete and correct.', () => {
    const pickedItem = listCore.dataSource[35];
    expect(JSON.stringify(pickedItem)).toBe(JSON.stringify({
        srcData: {
            nickname: '山水迢迢路漫漫',
            avatar: 'http://himg1.qunarzz.com/imgs/201604/12/N-cPLXH8JTJtkT4YNa818.jpg',
            imageHeight: 300,
            key: 35,
            color: 'black'
        },
        key: 35,
        _index: 35,
        _type: 'item'
    }));
    expect(JSON.stringify(listCore.positionMap[35])).toBe(JSON.stringify({
        height: 100,
        _order: 15,
        _resolved: true,
        _index: 35,
        _translateY: 3500,
        _bottom: 3600
    }));
});

test('The visibleList should be updated correctly while scrolling', () => {
    listCore.onScrollTo(300);
    expect(listCore.startIndex).toBe(1);
    expect(listCore.visibleList.pop()._index).toBe(20);
});

const listCore2 = new ListCore({
    dataSource: dataSource.map((item, i) => i < 5 ? { ...item, height: 100 } : item),
    infinite: true,
    infiniteSize: 20,
    offsetY: 0
});

test('The getFirstNotResolvedItem should work correctly.', () => {
    const firstNotResolvedItemIndex = listCore2.getFirstNotResolvedItemIndex();
    expect(firstNotResolvedItemIndex).toBe(5);
    const firstNotResolvedItem = listCore2.dataSource[firstNotResolvedItemIndex];
    expect(JSON.stringify(firstNotResolvedItem)).toBe(JSON.stringify({
        srcData: {
            nickname: 'i***e',
            avatar: 'http://himg1.qunarzz.com/imgs/201606/30/Z7-SaZkjE0VM4F7uZa818.jpg',
            imageHeight: 300,
            key: 5,
            color: 'black'
        },
        key: 5,
        _index: 5,
        _type: 'item'
    }));
});

test('The resolveItem method should work, and the next not resolved item should get a _translateY.', () => {
    listCore2.resolveItem(5, 125);
    const resolvedItem = listCore2.visibleList[5];
    expect(resolvedItem._resolved).toBe(true);
    expect(resolvedItem.height).toBe(125);
    expect(resolvedItem._bottom).toBe(625);
    const firstNotResolved = listCore2.visibleList[6];
    expect(firstNotResolved._translateY).toBe(625);
});

const listCore3 = new ListCore({ dataSource: Immutable.fromJS(dataSource), itemHeight: 50 });

test('The ListCore should work properly with immutable datasource.', () => {
    const testeeItem = listCore3.dataSource[2];
    expect(JSON.stringify(testeeItem.srcData.toJS())).toBe(JSON.stringify({
        "nickname": "TheDiver",
        "avatar": "http://himg1.qunarzz.com/imgs/201607/05/h2qBZvY6elGD5lUmha818.jpg",
        "imageHeight": 300,
        "key": 2,
        "color": "black"
    }));
    expect(testeeItem.key).toBe(2);
    expect(testeeItem._index).toBe(2);
    expect(testeeItem._type).toBe('item');
    expect(JSON.stringify(listCore3.positionMap[2])).toBe(JSON.stringify({
        height: 50,
        _order: 2,
        _resolved: true,
        _index: 2,
        _translateY: 100,
        _bottom: 150
    }));
});