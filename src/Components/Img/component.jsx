import "./style.scss"

import { useEffect, useState } from "react"

const dummyImg = require("./../../Images/image-placeholder.png").default


export const Img = ({ src, ...rest }) => {
    const [imgSrc, setImgSrc] = useState(dummyImg)
    const setActualImg = () => {
        setImgSrc(src)
    }
    useEffect(() => {
        const img = new Image()
        img.src = src;
        img.addEventListener("load", setActualImg);
        return () => {
            img.removeEventListener("load", setActualImg);
        }
    }, [])

    return <div className="img-component">
        <img src={imgSrc}{...rest} loading="lazy" />
    </div>
}