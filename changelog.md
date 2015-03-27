# Yo Changelog

History Version and release time.

<a name="v1-2-0"></a>
## v1.3.0 (2015.3.27)

[Tagged on Github.](https://github.com/doyoe/Yo/releases/tag/v1.3.0)

* update: `yo-switchable` 参数配置
* update: `yo-btn`
    - 增加 `active-bordercolor`, `active-bgcolor`, `active-color` 参数，用于设置按钮按下时的边框、背景、文本颜色；
* update: `yo-tab`
    - 删除 `is-border`, `is-item-border`, `on-bordercolor` 参数；
    - 新增 `border-width` 参数，用于设置tab的外边框厚度；
    - 新增 `radius` 参数，用于设置tab的圆角大小；
    - 新增 `item-border-height` 参数，用于设置tab子项间隔线的高度；
    - 新增 `item-bordercolor` 参数，用于设置tab子项间隔线的颜色；
* add: 新增分值元素 `yo-score`；
* add: 新增双list `yo-dblist`；
* update: 建议单选和多选都使用 `yo-checked`，后续考虑将 `yo-checkbox` 及 `yo-radio` 删除，尽量不要使用，之前使用过最好及时替换；
* update: `yo-checked`
    - 删除 `is-border` 参数，不再使用该参数来设定是否有边框，利用原有 `bordercolor` 参数，当值为 `transparent` 时，则无边框；
    - 删除 `disabled-color` 参数，Yo所有元素的禁用色都改为继承 `$base` map；
    - 增加 `radius` 参数用于设置圆角；
    - 增加 `on-bordercolor` 参数用于设置激活边框色；
    - 增加 `on-bgcolor` 参数用于设置激活背景色；
* update: yo-rating 外观
    - 增加 `url` 参数用于改变 yo-rating 的外观；

<a name="v1-2-0"></a>
## v1.2.0 (2015.3.20)

[Tagged on Github.](https://github.com/doyoe/Yo/releases/tag/v1.2.0)

* update: yo-checkbox 增加圆角参数；
* update: yo-list 增加label和item的颜色参数，字号参数；为item设定最小高度；
* update: yo-header 两侧文本色参数；
* update: yo-group 无数据状态；
* update: yo-tab 增加对ico大小，文本大小的参数配置，并删除默认的横向文本大小设定；
* update: yo-ico 删除 .eot 及 .svg 字体；
* update: yo-loadtip 增加加载失败和成功，同时增加下拉/释放图标动画；
* fixed: yo-group 滚动时顶部溢出；
* fixed: yo-switchable 在小米4上，当使用translatez/translate3d偏移时，会覆盖在其它层级比自身高的元素之上；
* add yo-rating；
* add yo-panel；
* fixed: fixed yo-switch handle bug on samsung s4；

<a name="v1-1-0"></a>
## v1.1.0 (2015.3.12)

[Tagged on Github.](https://github.com/doyoe/Yo/releases/tag/v1.1.0)

* add yo-loadtip
* update: add disabled status for yo-select
* add demo index page
* update: add border for yo-badge
* update: add width 100% for yo-switchable wrap

<a name="v1-0-0"></a>
## v1.0.0 (2015.3.9)

[Tagged on Github.](https://github.com/doyoe/Yo/releases/tag/v1.0.0)

* 新增 widget yo-switch，并移除 element yo-switch；
* 新增 widget yo-switchable
* 修订 widget yo-select背景色问题