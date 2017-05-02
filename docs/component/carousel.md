#### 引用方式

```
import { Carousel } from '$yo-component';

// 如果你的项目中未使用最新的 ykit-config-yo 插件，可能无法使用上面这个语法糖
// 你仍然可以通过下面这种方式来引用
import Carousel from 'yo3/component/carousel';
```

#### 基础用法

```
<Carousel>
    <li className="item"><img className="img" src="//img1.qunarzz.com/qs/1610/a6/01d1ad00e4b9e102.jpg" /></li>  
    <li className="item"><img className="img" src="//img1.qunarzz.com/qs/1610/a6/01d1ad00e4b9e102.jpg" /></li>  
    <li className="item"><img className="img" src="//img1.qunarzz.com/qs/1610/a6/01d1ad00e4b9e102.jpg" /></li>  
</Carousel>
```

#### 使用内置组件CarouselItem

+ 提供图片懒加载功能
+ 配合css实现当前页切换的动画效果

```
const testData = [
    {
        img: '//img.alicdn.com/tps/TB13Ha_NXXXXXbCXVXXXXXXXXXX-1125-352.jpg_q50.jpg'
    },{
        img: '//aecpm.alicdn.com/simba/img/TB1CWf9KpXXXXbuXpXXSutbFXXX.jpg_q50.jpg'
    },{
        img: '//aecpm.alicdn.com/simba/img/TB10CLcNXXXXXXVXXXXSutbFXXX.jpg_q50.jpg'
    },{
        img: '//gw.alicdn.com/imgextra/i2/5/TB2xuHoaX55V1Bjy0FnXXc5XFXa_!!5-0-yamato.jpg_q50.jpg'
    },{
        img: '//img.alicdn.com/tps/TB1XXrzNXXXXXaXXXXXXXXXXXXX-1125-352.jpg_q50.jpg'
    }
];
class Demo extends Component {
    constructor() {
        super();
        this.state = {
            currentPage: 1,
        };
    }

    render() {
        return (            
            <Carousel
                afterChange={(page) => {
                    this.setState({
                        currentPage: page
                    })
                }}
            >
            {
                testData.map((item, index) => (
                    <CarouselItem
                        key={index + 1}
                        {...item}
                        lazyload
                    />
                ))
            }
            </Carousel>
        )
    }
}

```

#### 自定义动画
传入JS动画对象，使用自定义动画

```
import aniCss from '~yo/component/carousel/src/aniCss.js';
class Demo extends Component {    
    constructor() {
        super();
        this.state = {
            currentPage: 1,
        };
    }

    render(){
        return (        
            <Carousel
                aniObj={aniCss}
                extraClass={'yo-carousel-fade'}
                afterChange={(currentPage) => {
                    this.setState({
                        currentPage
                    })
                }}
            >
            {
                testData.map((item, index) => (
                    <CarouselItem
                        key={index + 1}
                        {...item}
                        lazyload
                        activeClass={'top'}
                    />
                ))
            }
            </Carousel>
        )
    }
}
```

> 注意
> carousel组件需要挂载的父节点有宽度，组件内置动画需要宽度计算位置，组件本身宽度是'100%'，因此请使用者保证父节点宽度。