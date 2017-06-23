import React from 'react';
import { render } from 'react-dom';
import Carousel from '../src/';
import CarouselItem from '../src/carouselItem.js';
import scrollX from '../src/aniScrollx.js';
import Modal from '../../modal/src';
import aniInfinate from '../src/aniInfinate.js';
import aniCss from '../src/aniCss.js';
import loopInfinateAni from '../src/aniLoopInfinate.js';
import dataList from './testData.js';

class Container extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            infinatePage: 1,
            customPageNow: 1,
            loopInfinatePage: 1,
            fadePageNow: 2,
            pageNow: 1,
            showCarousel: true
        };
    }
    model(isShow) {
        this.setState({ showModal: isShow });
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
        const fadeCarousel = (
            <Carousel
                key={1}
                {...data}
                beforeChange={(page) => {
                    this.beforeChange(page, 'fadePageNow');
                }}
                afterChange={(page) => {
                    this.updateChange(page, 'fadePageNow');
                }}
                extraClass="yo-carousel-fade"
                defaultPage={2}
                aniObj={aniCss()}
                isDrag={false}
                speed={3}
                ref={(node) => {
                    if (node) {
                        window.carousel = node;
                    }
                }}
            >
                {dataList.map((item, index) => (<CarouselItem key={index + 1} {...item} lazyload={true} activeClass={'top'} />))
}
            </Carousel>
        );
        const scrollXCarousel = (
            <Carousel
                key={3}
                {...data}
                beforeChange={page => {
                    this.beforeChange(page, 'pageNow');
                }}
                afterChange={page => {
                    this.updateChange(page, 'pageNow');
                }}
                dots={true}
                defaultPage={1}
                loop={false}
                speed={3}
                autoplay={false}
                aniObj={scrollX(0.57, 30, 1, 0)}
                disable={true}
                ref={(node) => {
                    if (node) {
                        window.scrollXCarousel = node;
                    }
                }}
            >
                {dataList.map((item, index) => (
                    <CarouselItem
                        key={index + 1}
                        {...item}
                        renderContent={(img) => (
                            <div className="unit">
                                {img}
                                <span>12345</span>
                            </div>
                        )}
                    />
                    ))
                }
            </Carousel>
        );
        const infinateCarousel = (
            <Carousel
                key={5}
                beforeChange={(page) => {
                    this.beforeChange(page, 'infinatePage');
                }}
                afterChange={(page) => {
                    this.updateChange(page, 'infinatePage');
                }}
                dots={true}
                aniObj={aniInfinate()}
                autoplay={false}
                loop={true}
                defaultPage={3}
                disable={true}
            >
                {dataList.map((item, index) => (
                    <CarouselItem key={index + 1} {...item} lazyload={false} extraClass={'scale'} />
                ))
                }
            </Carousel>
        );
        const loopInfinateCarousel = (
            <Carousel
                beforeChange={(page) => {
                    this.beforeChange(page, 'loopInfinatePage');
                }}
                afterChange={(page) => {
                    this.updateChange(page, 'loopInfinatePage');
                }}
                aniObj={loopInfinateAni(20, 1, 5)}
                autoplay={false}
                defaultPage={3}
                disable={true}
            >
                {dataList.map((item, index) => (
                    <CarouselItem key={index + 1} {...item} lazyload={false} />
                    ))
                }
            </Carousel>
        );
        return (
            <div>
                <h2>normal Item</h2>
                {this.state.showCarousel && scrollXCarousel}
                <h2>loopInfinateCarousel</h2>
                {this.state.showCarousel && loopInfinateCarousel}
                <h2>infinateCarousel</h2>
                {this.state.showCarousel && infinateCarousel}
                <h2>fadeCarousel</h2>
                {this.state.fadeCarousel && fadeCarousel}

                {
                    <div>
                        <Modal
                            align="center"
                            show={this.state.showModal}
                            animation="fade"
                            onMaskTap={() => {
                                this.model(false);
                            }}
                        >
                        {this.state.showModal
                            ? infinateCarousel
                            : null
                        }
                            <span>{this.state.infinatePage}/{dataList.length}</span>
                        </Modal>
                    </div>
                }
                <div
                    style={{
                        height: '20px',
                        backgroundColor: 'red'
                    }}
                    onTouchTap={() => {
                        this.setState({
                            showCarousel: !this.state.showCarousel
                        });
                    }}
                ></div>
            </div>
        );
    }
}

render(<Container />, document.getElementById('target'));

document.addEventListener('touchmove', (e) => {
    e.preventDefault();
});