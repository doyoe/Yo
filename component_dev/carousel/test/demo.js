import React from 'react';
import { render } from 'react-dom';
import '../../common/tapEventPluginInit';
import Carousel from '../src/';
import CarouselItem from '../src/carouselItem.js';
import scrollX from '../src/aniScrollx.js';
// import Modal from '../../modal/src';
import aniInfinate from '../src/aniInfinate.js';
import aniCss from '../src/aniCss.js';
// import inlineInfinate from '../src/inlineScrollX.js';
// import AniInfinate2 from '../src/aniInfinate2.js';
// import './demo.scss';
const dataList = [{
    img: 'http://gma.alicdn.com/simba/img/TB14ab1KpXXXXclXFXXSutbFXXX.jpg_q50.jpg',
    onTap: () => {
        console.log('tap listener');
    }
}, {
    img: 'http://gw.alicdn.com/tps/TB1gQjnKVXXXXXPXXXXXXXXXXXX-1125-352.jpg_q50.jpg',
    onTap: () => {
        console.log('tap listener');
    }
}, {
    img: 'http://gw.alicdn.com/tps/TB1ZPdILpXXXXczXXXXXXXXXXXX-1125-352.jpg_q50.jpg',
    onTap: () => {
        console.log('tap listener');
    }
}, {
    img: 'http://gw.alicdn.com/tps/i1/TB12_iHHXXXXXaCXVXXdIns_XXX-1125-352.jpg_q50.jpg',
    onTap: () => {
        console.log('tap listener');
    }
}];

class Container extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            infinatePage: 1,
            customPageNow: 1,
            fadePageNow: 2,
            pageNow: 1
        };
    }
    model(isShow) {
        this.setState({
            showModal: isShow
        });
    }
    updateChange(page, tag) {
        const obj = {};
        obj[tag] = page;
        this.setState(obj);
        console.log(`${tag} has been:${page}`);
    }
    beforeChange(page, tag) {
        console.log(`${tag} will be: ${page}`);
    }
    render() {
        const data = {
            autoplay: true,
            loop: true,
            dots: false
        };
        let styleList = {
            textAlign: 'center',
            backgroundColor: 'green',
            height: '2em',
            lineHeight: '2em',
            margin: '3em 1em',
            color: '#fff'
        };
        let fadeCarousel = (
            <Carousel
                key={1}
                {...data}
                beforeChange={(page) => { this.beforeChange(page, 'fadePageNow'); }}
                afterChange={(page) => { this.updateChange(page, 'fadePageNow'); }}
                extraClass="yo-carousel-fade"
                defaultPage={2}
                aniObj={aniCss()}
                isDrag={false}
                speed={3}
                ref={(node) => {
                    if (node){ window.carousel = node }
                }}
            >
            {
                dataList.map((item, index) => (
                    <CarouselItem
                        key={index + 1}
                        {...item}
                        lazyload={true}
                       
                        activeClass={'top'}
                    />)
                )
            }
            </Carousel>
        );
        let scrollXCarousel = (
            <Carousel
                key={3}
                {...data}
                beforeChange={(page)=>{this.beforeChange(page,'pageNow')}}
                afterChange={(page)=>{this.updateChange(page,'pageNow')}}
                dots={true}
                defaultPage={1}
                loop={true}
                speed={3}
                autoplay={false}
                aniObj={scrollX()}
                ref={(node) => {
                  if (node) {
                    window.scrollXCarousel = node;
                  }
                }}
            >
            {
                dataList.map((item, index)=>{
                    return (
                        <CarouselItem
                            key={index + 1}
                            // currentPage={this.state.pageNow}
                            {...item}
                            renderContent={(img) => (
                                <div className="unit">
                                    {img}
                                    <span>12345</span>
                                </div>
                            )}
                        ></CarouselItem>);
                    })
            }
            </Carousel>
        );
        let customCarousel = (
            <Carousel
                key={4}
                beforeChange={(page)=>{this.beforeChange(page,'customPageNow')}}
                afterChange={(page)=>{this.updateChange(page,'customPageNow')}}
                autoplay={true}
                dots={true}
                extraClass={'yo-carousel-scale'}
            >
            {
                dataList.map((item, index)=>{
                    return (
                        <CarouselItem
                            key={index + 1}
                            {...item}
                            lazyload={true}
                            extraClass={'scale'}
                        ></CarouselItem>
                    )
                })
            }
            </Carousel>
        );
        let infinateCarousel = (
            <Carousel
                key={5}
                beforeChange={(page)=>{this.beforeChange(page,'infinatePage')}}
                afterChange={(page)=>{this.updateChange(page,'infinatePage')}}
                dots={true}
                aniObj={aniInfinate()}
                autoplay={false}
                loop={false}
                defaultPage={this.state.infinatePage}
            >
            {
                dataList.map((item, index)=>{
                    return (
                        <CarouselItem
                            key={index + 1}
                            {...item}
                            lazyload={false}
                            extraClass={'scale'}
                        ></CarouselItem>
                    )
                })
            }
            </Carousel>
        );
        return (
            <div>
                <h2>normal Item</h2>
                
                {scrollXCarousel}
                
                {/*<div>
                    <Modal
                        align="center"
                        show={this.state.showModal}
                        animation="fade"
                        onMaskTap={() => { this.model(false); }}
                    >
                    {this.state.showModal ? infinateCarousel : null}
                        <span>{this.state.infinatePage}/{dataList.length}</span>
                    </Modal>
                </div>*/}
            </div>
        );
    }
}

render(
    <Container />,
    document.getElementById('target')
);
