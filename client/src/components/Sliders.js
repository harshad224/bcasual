import React from "react";
import '../css/slider.css';
import { sliderImg } from './sliderImg';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Sliders() {

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return (
        <>
            <div className="slickslider">
                <Slider {...settings}>
                    {sliderImg.map(z => {
                        return (
                            < div>
                                <div className="slide1">
                                    <div className="imgdiv">
                                        <div className="imagsize1">
                                            <img className="imgsize" src={z.img} alt="jacket" />
                                        </div>
                                    </div>

                                    <div className="infor">
                                        <h1 className="titles">{z.title}</h1>
                                        <p className="info">{z.info}</p>
                                    </div>

                                </div>
                            </div>
                        )
                    })}
                </Slider>
            </div >
        </>
    )
}