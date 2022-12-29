import "./style.scss"

import Button from "../../Components/Button"
import Card from "../../Components/Card"
import { Link } from "react-router-dom"
import { MovieContext } from "../../Contexts/Movie"
import NoRecords from "../../Components/NoRecords"
import { useContext } from "react"

export const WishList = () => {
    const movieContext = useContext(MovieContext)
    const { wishList, removeFromWishList } = movieContext

    return <div className="wishlist">
        {
            wishList.map((movie, i) => {
                const { id, title, movieKind } = movie
                return <Card key={`movie-${i}`} className="wishlistitem">
                    <div className="movie-part">
                        <Link to={`/${movieKind}/${id}`}>
                            <small>{title}</small>
                        </Link>
                    </div>
                    <div className="action-part">
                        <Button className="remove" onClick={() => removeFromWishList(id)}>
                            remove
                        </Button>
                    </div>
                </Card >
            })
        }
        {
            wishList.length === 0 && <NoRecords />
        }
    </div>
}