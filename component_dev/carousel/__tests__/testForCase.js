import React, { Component } from 'react';
import Carousel from '../src/carousel.js';
import CarouselItem from '../src/carouselItem.js';
import testData from './testData.js';

class Demo extends Component {
    constructor() {
        super();
        this.state = {
            pageNow: 1
        };
    }
    prev() {
        this.carousel.prev();
    }
    next() {
        this.carousel.next();
    }
    arrive() {
        this.carousel.arrive(3);
    }
    render() {
        return (
            <div>
                <Carousel
                    key={3}
                    afterChange={page => {
                        this.setState({
                            pageNow: page
                        });
                    }}
                    ref={node => {
                        this.carousel = node;
                    }}
                    {...this.props}
                >
                    {testData.map((item, index) => (
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
                <div onClick={this.prev.bind(this)} ref="prev" />
                <div onClick={this.next.bind(this)} ref="next" />
                <div onClick={this.arrive.bind(this)} ref="arrive3" />
            </div>
           );
    }
}
function testDemo(options) {
    return <Demo {...options} />;
}
testDemo.Demo = Demo;
export default testDemo;