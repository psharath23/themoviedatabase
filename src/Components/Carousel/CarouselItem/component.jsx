import "./style.scss"

import Img from "../../Img"
import MovieContext from "Contexts/Movie"
import { useContext } from "react"

export const CarouselItem = ({ item = {} }) => {
    const { image = "", title = "" } = item || {}

    const config = useContext(MovieContext)
    return <div className="carousel-item">
        <div className="carousel-body">
            <div className="carousel-image">
                <Img src={`${config.imageBasePath}/original/${image}`} />
            </div>
            <small className="smaller-text">{title}</small>
        </div>
    </div>
}