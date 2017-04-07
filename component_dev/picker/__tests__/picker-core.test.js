/**
 * Created by chenjiao on 2017/3/9.
 */
import PickerCore from '../src/PickerCore';
import { getArrayByLength } from '../../common/util';
import LoopedArray from '../src/LoopedArray';
const testData2 = [1, 2, 3, 4, 5, 6].map(item => ({ value: item }));

function getRandomOptions() {
    const range = 10;
    return getArrayByLength(range).fill(1).map((item, i) => ({ value: i }));
}

const SIZE = 1000000;
const dataSource = getRandomOptions();
const pickerCore = new PickerCore({
    dataSource,
    value: 3,
    looped: true,
    loopedSize: SIZE,
    containerHeight: 200
});

test('The getStartIndex method should return correct number.', () => {
    const startIndex = pickerCore.getStartIndex(-12345, 30, true, 10);
    expect(startIndex).toBe(409);
});

test('The getEndIndex method should return correct number.', () => {
    const endIndex = pickerCore.getEndIndex(25);
    expect(endIndex).toBe(35);
});

test('The pickerCore instance should be initiated correctly.', () => {
    expect(pickerCore.itemHeight).toBe(30);
    expect(pickerCore.size).toBe(SIZE);
    expect(pickerCore.selectionHeight).toBe(30);
    expect(pickerCore.containerHeight).toBe(200);
    expect(pickerCore.visibleSize).toBe(10);
    expect(pickerCore.contentHeight).toBe(SIZE * 30);
    expect(pickerCore.contentPadding).toBe(0);
    expect(pickerCore.offsetY).toBe(-15000005);
    expect(pickerCore.startIndex).toBe(499998);
    expect(pickerCore.thunks.length).toBe(10);
});

test('The getScrollDestination should return the correct y of the scroller momentum.', () => {
    const dest = pickerCore.getScrollDestination(-14000000);
    expect(dest.y).toBe(-13999985);
});

test('The visibleList should be updated correctly while scrolling.', () => {
    pickerCore.onScrollTo(-12345678);
    const testeeItem = pickerCore.visibleList[0];
    expect(testeeItem.index).toBe(411520);
});

test('The picker should scroll to proper position after the value was mutated.', () => {
    pickerCore.setValue(2);
    expect(pickerCore.offsetY).toBe(-14999975);
});

const loopedArr = new LoopedArray([1, 2, 3, 4, 5]);

test('The instance of LoopedArray should be successfully initiated.', () => {
    expect(loopedArr.getItem(100)).toBe(1);
});

test('The map method should work.', () => {
    const amplifiedArr = loopedArr.map((num) => num * 2);
    expect(amplifiedArr.getItem(0)).toBe(2);
});

test('The filter method should work.', () => {
    const filteredArr = loopedArr.filter((num) => num > 3);
    expect(filteredArr.getItem(6)).toBe(4);
});


test('The slice method should work.', () => {
    const slicedArr = loopedArr.slice(0, 100);
    expect(slicedArr.pop()).toBe(5);
});