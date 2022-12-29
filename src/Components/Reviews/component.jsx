import "./style.scss"

import NoRecords from "../NoRecords"
import Review from "./Review"

export const Reviews = ({ reviews = [] }) => {
    return <div className="reviews">
        {
            reviews.length === 0 && <NoRecords />
        }
        {
            reviews
                .filter(review => {
                    const { author_details } = review
                    const { rating } = author_details
                    return rating
                })
                .sort((review1, review2) => {
                    review2?.author_details?.rating - review1?.author_details?.rating
                })
                .slice(0, 2)
                .map((review, i) => {
                    return <Review key={`review-${i}`} review={review} />
                })
        }
    </div>
}