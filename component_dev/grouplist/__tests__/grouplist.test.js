/**
 * Created by chenjiao on 2017/3/9.
 */
import GroupCore from '../src/GroupCore';
import Immutable from 'immutable';
import { getArrayByLength } from '../../common/util';

let id = 1;
let testData = getArrayByLength(200).fill(0)
    .map((item, i) => ({
        text: i,
        groupKey: i < 5 ? 'notGrouped' : i % 10,
        id: ++id,
        key: id,
        color: 'black'
    }));
const testProperties = {
    dataSource: testData,
    itemHeight: 100,
    staticSectionHeight: 50,
    titleHeight: 20,
    infinite: true,
    offsetY: 340,
    isTitleStatic: true,
    titleOffset: 20
};
const mutatedProperties = {
    offsetY: 400,
    staticSectionHeight: 100,
    titleOffset: 0,
    titleHeight: 40,
    dataSource: testData.slice(0, 100)
};
const groupCore = new GroupCore(testProperties);

test('The groupcore should be initiated correctly.', () => {
    expect(groupCore.isTitleStatic).toBe(true);
    expect(groupCore.infinite).toBe(true);
    expect(groupCore.titleHeight).toBe(20);
    expect(groupCore.titleOffset).toBe(20);
    expect(groupCore.currentGroup).toBeDefined();
    expect(groupCore.staticSectionHeight).toBe(50);
    expect(groupCore.isHeightFixed).toBe(true);
    expect(groupCore.offsetY).toBe(340);
});

test('The refresh method should work properly.', () => {
    groupCore.refresh(mutatedProperties);
    expect(groupCore.titleOffset).toBe(0);
    expect(groupCore.titleHeight).toBe(40);
    expect(groupCore.offsetY).toBe(400);
    expect(groupCore.staticSectionHeight).toBe(100);
    expect(groupCore.dataSource.length).toBe(110);
});

test('The renderData method should work properly', () => {
    const testeeItem = groupCore.dataSource[47];
    expect(JSON.stringify(testeeItem)).toBe(JSON.stringify({
        srcData: { text: 88, groupKey: 8, id: 90, key: 90, color: 'black' },
        height: 100,
        key: 90
    }));
});

test('The titles should be inserted correctly, the notGrouped group should be placed at the head of the list.', () => {
    const testeeTitle = groupCore.getTitles().pop();
    expect(testeeTitle.height).toBe(40);
    expect(testeeTitle.groupKey).toBe(4);
    expect(testeeTitle._type).toBe('groupTitle');
    expect(testeeTitle.key).toBe('group_title_4');
    expect(groupCore.groupKeys[0]).toBe('notGrouped');
});

test('The getCurrentTitle method should return the very title that sticks to the top of grouplist', () => {
    const currentTitle = groupCore.getCurrentTitle(200, [{ _translateY: 100 }, { _translateY: 120 }, { _translateY: 300 }]);
    expect(currentTitle._translateY).toBe(120);
});

test('The getNextTitile method should return the next title to be sticked.', () => {
    groupCore.groupTitles = [{
        _translateY: 0,
        height: 10
    }, {
        _translateY: 55,
        height: 10
    }, {
        _translateY: 122,
        height: 10
    }, {
        _translateY: 200,
        height: 10
    }, {
        _translateY: 203,
        height: 10
    }];
    const nextTitle = groupCore.getNextTitle(150);
    expect(nextTitle._translateY).toBe(200);
});

test('The getCurrentTitleOffsetY should return correct offset of current sticky title', () => {
    const ret1 = groupCore.getCurrentTitleOffsetY(120);
    expect(ret1).toBe(-8);
    const ret2 = groupCore.getCurrentTitleOffsetY(400);
    expect(ret2).toBe(0);
    const ret3 = groupCore.getCurrentTitleOffsetY(0);
    expect(ret3).toBe(0);
});

test('The refreshStickyHeader should works correctly', () => {
    groupCore.refreshStickyHeader(220);
    expect(groupCore.stickyHeader.offset).toBe(-8);
    groupCore.refreshStickyHeader(600);
    expect(groupCore.stickyHeader.offset).toBe(0);
    groupCore.refreshStickyHeader(200);
    expect(groupCore.stickyHeader.offset).toBe(0);
});

const immutableDs = Immutable.fromJS(testData);

test('The GroupCore should be ok with immutable datasource.', () => {
    const immutableGroupCore = new GroupCore({ dataSource: immutableDs, itemHeight: 100 });
    const testeeItem = immutableGroupCore.dataSource[30];
    expect(testeeItem.height).toBe(100);
    expect(JSON.stringify(testeeItem.srcData.toJS())).toBe(JSON.stringify({
        "text": 36,
        "groupKey": 6,
        "id": 38,
        "key": 38,
        "color": "black"
    }));
});