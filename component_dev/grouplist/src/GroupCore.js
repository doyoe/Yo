/**
 * Grouplist核心逻辑,负责管理Grouplist组件的状态
 */
import ComponentCore from '../../common/ComponentCore';

export default class GroupCore extends ComponentCore {

    static guid = -1;

    /**
     * 构造函数
     * @param dataSource 数据源,将会被插入一些title对象
     * @param itemHeight 列表项高度
     * @param titleHeight title高度
     * @param sort group排序规则
     * @param infinite 是否开启无穷模式
     * @param offsetY 初始偏移
     */
    constructor({
        dataSource,
        itemHeight = null,
        staticSectionHeight = 0,
        titleHeight,
        sort,
        infinite,
        offsetY = 0,
        isTitleStatic = true,
        titleOffset = 0
    }) {
        super('grouplist');
        // stickyHeader是一个内部状态,保存了当前吸顶title的位置和key
        this.stickyHeader = null;
        this.isTitleStatic = isTitleStatic;
        // 调用initialize过程,这个过程在componentWillReceiveProps时也会被调用,可以init/reset组件的状态
        this.initialize({
            offsetY,
            dataSource,
            sort,
            infinite,
            staticSectionHeight,
            itemHeight,
            titleHeight,
            titleOffset
        });
    }

    /**
     * 初始化/重置组件的状态
     * @param offsetY
     * @param dataSource
     * @param sort
     * @param infinite
     * @param itemHeight
     * @param titleHeight
     */
    initialize({
        offsetY,
        dataSource,
        sort = this.sortFunc,
        infinite = this.infinite,
        staticSectionHeight = null,
        itemHeight = this.itemHeight,
        titleHeight = this.titleHeight,
        titleOffset = this.titleOffset
    }) {
        this.infinite = infinite;
        this.itemHeight = itemHeight;
        this.titleHeight = titleHeight;
        this.titleOffset = titleOffset;
        this.currentGroup = {};
        this.dataSource = this.renderData(dataSource, itemHeight, titleHeight, sort);
        this.staticSectionHeight = staticSectionHeight;
        this.groupTitles = this.getTitles();
        this.isHeightFixed = this.dataSource.every((item) => this.getAttr(item, 'height') != null) || !infinite;
        this.offsetY = this.isHeightFixed ? offsetY : this.offsetY;
    }

    /**
     * 调用initalize并触发change事件让组件更新,在componentWillReceiveProps中调用
     * @param dataSource
     * @param sortFunc
     * @param infinite
     * @param offsetY
     */
    refresh({
        dataSource = this.dataSource,
        sort = this.sortFunc,
        infinite = this.infinite,
        staticSectionHeight = this.staticSectionHeight,
        offsetY = this.offsetY,
        titleHeight = this.titleHeight,
        titleOffset = this.titleOffset
    }) {
        this.initialize({ offsetY, dataSource, sort, infinite, staticSectionHeight, titleHeight, titleOffset });
        this.emitEvent('refresh', this.dataSource, this.groupTitles);
    }

    /**
     * 处理数据源,计算出数据源的所有title并插入
     * @param dataSource
     * @param itemHeight
     * @param titleHeight
     * @param sortFunc
     * @returns {Array}
     */
    renderData(dataSource,
               itemHeight = this.itemHeight,
               titleHeight = this.titleHeight,
               sortFunc = this.sortFunc) {
        if (!Array.isArray(dataSource)) {
            if (typeof dataSource.toArray === 'function') {
                dataSource = dataSource.toArray();
            } else {
                throw new Error('yo-grouplist: dataSource必须为数组或者Immutable List!');
            }
        }

        this.dataSource = this
            .insertGroupTitles(dataSource, this.extractGroupKeys(dataSource, sortFunc))
            .map((item) => {
                let height = null;
                if (item._type === 'groupTitle') {
                    height = titleHeight;
                } else if (this.getAttr(item, 'height')) { // 优先读取item中的height属性
                    height = this.getAttr(item, 'height');
                } else { // 否则读取itemHeight属性
                    height = itemHeight;
                }
                return item._type === 'groupTitle' ?
                    this.setAttr(item, 'height', height) :
                    {
                        srcData: item,
                        height,
                        key: this.getAttr(item, 'key')
                    };
            });
        return this.dataSource;
    }

    /**
     * 从数据源中提取出所有groupKey并根据sortFunc排序
     * @param dataSource
     * @param sortFunc
     * @returns {Array.<string>}
     */
    extractGroupKeys(dataSource, sortFunc) {
        let keyListWithoutNotGrouped = dataSource
            .map((item) => this.getAttr(item, 'groupKey'))
            .filter((key) => key !== 'notGrouped')
            .reduce((acc, groupKey) => {
                if (acc.find((it) => it === groupKey) == null) {
                    acc.push(groupKey);
                }
                return acc;
            }, []);

        if (sortFunc) {
            keyListWithoutNotGrouped = keyListWithoutNotGrouped.sort(sortFunc);
        }

        this.groupKeys = ['notGrouped'].concat(keyListWithoutNotGrouped);
        return this.groupKeys;
    }

    /**
     * 将提取出的title与数据源merge,形成新的数据源
     * @param dataSource
     * @param groupKeys
     * @returns {Array}
     */
    insertGroupTitles(dataSource, groupKeys) {
        return groupKeys.reduce((acc, key) => {
            const title = {
                _type: 'groupTitle',
                groupKey: key,
                key: `group_title_${key}${this.isTitleStatic ? '' : `_${++GroupCore.guid}`}`
            };
            const ret = acc
                .concat(
                    title,
                    dataSource.filter((it) => this.getAttr(it, 'groupKey') === key)
                );

            return key !== 'notGrouped' ? ret : ret.filter((item) =>
                    !(item._type === 'groupTitle' && this.getAttr(item, 'groupKey') === 'notGrouped')
                );
        }, []);
    }

    /**
     * 从数据源中获取所有title
     * @param dataSource
     * @returns {Array}
     */
    getTitles(dataSource = this.dataSource) {
        return dataSource.filter((item) => item._type === 'groupTitle');
    }

    /**
     * 更新title的高度
     * 在无穷列表和静态列表模式中,titleHeight都是dom渲染之后才获取到的,这个高度会被用来计算stickyHeader的偏移量
     * @param item
     * @param domNode
     */
    updateGroupTitle(item, domNode) {
        if (item._type === 'groupTitle') {
            if (!this.infinite) {
                item = Object.assign({}, item, {
                    _translateY: domNode.offsetTop,
                    height: domNode.offsetHeight
                });
            }
            item = Object.assign(item, {
                display: getComputedStyle(domNode).getPropertyValue('display')
            });

            this.groupTitles = this.groupTitles.map((title) =>
                this.getAttr(title, 'groupKey') === this.getAttr(item, 'groupKey') ? item : title
            );
            return this.groupTitles;
        }
        return null;
    }

    /**
     * 根据当前列表的偏移量更新吸顶title的位置和内容
     * @param offsetY
     */
    refreshStickyHeader(offsetY = this.offsetY) {
        offsetY = offsetY - this.staticSectionHeight;
        const title = this.getCurrentTitle(offsetY),
            offset = this.getCurrentTitleOffsetY(offsetY),
            groupKey = title ? this.getAttr(title, 'groupKey') : null;

        if (this.currentGroup.offset !== offset || this.currentGroup.key !== groupKey) {
            this.currentGroup = { key: groupKey, offset };
            this.stickyHeader = {
                title,
                offset
            };

            this.emitEvent('refreshStickyHeader', this.stickyHeader);
        }
    }

    /**
     * 根据列表的偏移量计算吸顶title的偏移量
     * @param offsetY
     * @returns {number}
     */
    getCurrentTitleOffsetY(offsetY) {
        const nextTitle = this.getNextTitle(offsetY),
            currentTitle = this.getCurrentTitle(offsetY),
            nextTitleTranslateY = nextTitle && nextTitle._translateY;

        offsetY = offsetY + this.titleOffset;
        if (nextTitle
            && offsetY > nextTitleTranslateY - currentTitle.height
            && offsetY < nextTitleTranslateY) {
            return -(currentTitle.height - (nextTitleTranslateY - offsetY));
        }

        return 0;
    }

    /**
     * 根据列表偏移量获取当前吸顶的title的下一个title
     * @param offsetY
     * @param groupTitles
     * @returns {Object}
     */
    getNextTitle(offsetY, groupTitles = this.groupTitles) {
        const currentTitle = this.getCurrentTitle(offsetY),
            currentTitleIndex = groupTitles.indexOf(currentTitle);

        if (currentTitleIndex !== -1 && currentTitleIndex !== groupTitles.length - 1) {
            return groupTitles[currentTitleIndex + 1];
        }

        return null;
    }

    /**
     * 根据偏移量获取当前被吸顶的title
     * @param offsetY
     * @param groupTitles
     * @returns {Object}
     */
    getCurrentTitle(offsetY, groupTitles = this.groupTitles) {
        const titlesAboveOffsetY = groupTitles.filter((title) =>
            title._translateY != null && title._translateY <= offsetY + this.titleOffset
        );
        return titlesAboveOffsetY[titlesAboveOffsetY.length - 1];
    }

    /**
     * 根据groupkey返回该分组title的translateY(用来做分组导航)
     * @param groupKey
     * @returns {Number}
     */
    getGroupOffsetY(groupKey) {
        const targetGroup = this.groupTitles.find((title) => this.getAttr(title, 'groupKey') === groupKey);

        if (targetGroup) {
            return targetGroup._translateY + this.staticSectionHeight;
        }

        return null;
    }
}
