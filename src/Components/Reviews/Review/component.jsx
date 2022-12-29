import "./style.scss"

import Img from "../../Img"
import MovieContext from "Contexts/Movie"
import ReadMore from "Components/ReadMore"
import { useContext } from "react"

const toHoursMins = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m`;
}
export const Review = ({ review }) => {
    const { author_details, content, updated_at } = review
    const { avatar_path, rating } = author_details
    const config = useContext(MovieContext)
    return <div className="review">
        <div className="review-body">
            <div className="author-details">
                <div className="author-avatar">
                    <Img src={`${config.imageBasePath}/original/${avatar_path}`} />
                </div>
                <div className="info">
                    <div>
                        <span className="bolder-text">{name}</span>
                    </div>
                    <div>
                        <span className="smaller-text">Rating: <span className="bolder-text">{rating ? rating + "/10" : "not rated"}</span></span>
                    </div>
                </div>
            </div>
            <div className="smaller-text pad-10 align-left"><ReadMore text={content} limit={100}></ReadMore></div>
        </div>
        <div className="timestamps">
            <div className="smaller-text">{new Date(updated_at).toDateString()}</div>
        </div>
    </div>
}