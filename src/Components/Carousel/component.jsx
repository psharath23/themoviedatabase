import "./style.scss"

import { useEffect, useRef, useState } from "react"

import CarouselItem from "./CarouselItem"
import Img from "../Img"
import { Link } from "react-router-dom"
import NoRecords from "Components/NoRecords"

const backPNG = require("./../../Images/back.png").default

const scrollTs = 5000
const pauseClear = 5000

export const Carousel = ({ data = [] }) => {
    const carouselItemRef = useRef(null)
    const [paused, setPause] = useState(false)
    const [focussed, setFocussed] = useState(false)
    // this useeffect will control the automatic sliding of carousel
    useEffect(() => {
        const swipeInterval = setInterval(() => {
            if (!paused) {
                nextSlide()
            }
        }, scrollTs)
        return () => { clearInterval(swipeInterval) }
    }, [data, carouselItemRef, paused])

    // this useEffect will control the paused status
    // when ever a used manually clicks the left or right arrows of carousel
    // the automatic sliding will be paused for 5 minutes
    useEffect(() => {
        if (paused && !focussed) {
            const pauseTimeout = setTimeout(() => {
                setPause(false)
            }, pauseClear)
            return () => {
                clearTimeout(pauseTimeout)
            }
        }
    }, [paused])

    const pauseScrolling = () => {
        setFocussed(true)
        setPause(true)
    }

    const resumeScrolling = () => {
        setFocussed(false)
        setPause(false)
    }

    const isScrollEnd = (
        offsetWidth,
        scrollLeft,
        scrollWidth
    ) => ((offsetWidth + scrollLeft) / scrollWidth) * 100 > 95

    const nextSlide = () => {
        if (carouselItemRef.current) {
            const {
                offsetWidth,
                scrollLeft,
                scrollWidth
            } = carouselItemRef.current;
            if (isScrollEnd(offsetWidth, scrollLeft, scrollWidth)) {
                carouselItemRef.current.scrollLeft -= scrollWidth
            } else {
                carouselItemRef.current.scrollLeft += offsetWidth * 50 / 100
            }
        }
    }

    const prevSlide = () => {
        if (carouselItemRef.current) {
            const { offsetWidth,
                scrollLeft,
                scrollWidth } = carouselItemRef.current;
            if (scrollLeft === 0) {
                carouselItemRef.current.scrollLeft += scrollWidth
            } else {
                carouselItemRef.current.scrollLeft -= offsetWidth * 50 / 100
            }
        }
    }
    const IndicatorLeft = () => <div className="indicator-left">
        <Img src={backPNG} onClick={() => { prevSlide(); setPause(true) }} />
    </div>
    const IndicatorRight = () => <div className="indicator-right">
        <Img src={backPNG} onClick={() => { nextSlide(); setPause(true) }} />
    </div>

    return data && <div className="carousel">
        <div className="carousel-content">
            <IndicatorLeft />
            <div data-testid={"carousel-items"} className="carousel-items" ref={carouselItemRef} onMouseEnter={pauseScrolling} onMouseLeave={resumeScrolling}>
                {
                    data.map((item, i) => {
                        return <Link
                            key={`item-${i}`}
                            to={`${item.pathName}/${item.id}`}>
                            <CarouselItem item={item} />
                        </Link>
                    })
                }
                {
                    data?.length === 0 && <NoRecords />
                }
            </div>
            <IndicatorRight />
        </div>
    </div >

}