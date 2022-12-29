import "./style.scss"

import { useContext, useMemo } from "react"

import Card from "../Card"
import Img from "../Img"
import { Link } from "react-router-dom"
import MovieContext from "./../../Contexts/Movie"
import { useLocation } from "react-router"

const backPNG = require("./../../Images/back.png").default
export const Header = () => {
    const location = useLocation()
    const movieContext = useContext(MovieContext)
    const { wishList } = movieContext
    const totalWishListItems = useMemo(() => {

        return wishList.length
    }, [wishList])

    const headerTitle = useMemo(() => {
        if (["/", ""].includes(location.pathname)) {
            return "The Movie Database"
        }
        if (location.pathname.includes("upcoming")) {
            return "Upcoming Movie"
        }
        if (location.pathname.includes("latest")) {
            return "Latest Movie"
        }
        if (location.pathname.includes("toprated")) {
            return "Top Rated Movie"
        }
    }, [location])
    return <header>
        <Card className="header">
            <div className="backnav">
                {
                    location.pathname != "/" && <Link to={"/"}>
                        <Img src={backPNG} />
                    </Link>
                }
            </div>
            <div className="title">{headerTitle}</div>
            <div className="wishlist">
                <Link to={"/wishlist"}>Wishlist {totalWishListItems > 0 && `(${totalWishListItems})`}</Link>
            </div>
        </Card>
    </header>
}