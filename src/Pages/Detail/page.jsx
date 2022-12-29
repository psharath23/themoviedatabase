import "./style.scss"

import { useContext, useMemo } from "react"

import Button from "Components/Button"
import Card from "Components/Card"
import Img from "../../Components/Img"
import Loading from "Components/Loading"
import MovieContext from "Contexts/Movie"
import ReadMore from "Components/ReadMore"
import Reviews from "../../Components/Reviews"
import WithDataFetching from "Hooks/withDataFetching"
import cn from "classnames"
import { useParams } from "react-router"

export const Detail = () => {
    const params = useParams()
    const { id = "", movieKind } = params
    const config = useContext(MovieContext)

    const [movieDetails, movieLoading] = WithDataFetching(`/movie/${id}`, "get")
    const [reviewDetails, reviewLoading] = WithDataFetching(`/movie/${id}/reviews`, "get")

    const movieContext = useContext(MovieContext)
    const { wishList, addToWishList, removeFromWishList, genre } = movieContext
    const inWishList = useMemo(() => {
        const ids = wishList.map((movie) => movie.id)
        return ids.includes(+id)
    }, [movieContext])

    const { title, tagline, status, overview, genres = [], spoken_languages = [], production_companies = [], backdrop_path, release_date } = movieDetails || {}

    return <div className={cn("details", movieKind)}>
        <div className="main-details">
            <Card className="image">
                {!movieLoading && <><Img src={`${config.imageBasePath}/original${backdrop_path}`} loading={"lazy"} />
                    <div className="overview">
                        <ReadMore text={overview} limit={200} />
                    </div></>
                }
                {movieLoading && <Loading />}
            </Card>
            <Card className="description">
                {movieLoading && <Loading />}
                {!movieLoading && <>
                    <div className="wish-list-section">
                        <Button className={cn({ "remove": inWishList })}
                            onClick={() => {
                                inWishList ? removeFromWishList(+id) : addToWishList(movieDetails, movieKind)
                            }}>{inWishList ? "remove from wishlist!" : "Add to wishlist"}</Button>
                    </div>
                    <div className="movie-title">
                        {title}
                        <div className="movie-tagline">{tagline}</div>
                    </div>
                    <div className="badges"><div className={cn("badge", status.toLowerCase().replace(" ", "-"))}>{status}: {new Date(release_date).toDateString()}</div></div>
                    <div className="badges">
                        {
                            spoken_languages.map((lang, i) => {
                                return <div key={`lang-${i}`} className="badge">{lang.name}</div>
                            })
                        }
                    </div>
                    <div className="badges">
                        {
                            genres.map((g, i) => <span key={`genre-${i}`} className="badge">{genre[g.id]}</span>)
                        }
                    </div>
                    <div className="flex">
                        {
                            production_companies.map((comp, i) => {
                                const { logo_path } = comp
                                return <div key={`comp-${i}`} className="circle">
                                    <Img src={`${config.imageBasePath}/w45${logo_path}`} />
                                </div>
                            })
                        }

                    </div>

                </>}
            </Card>
        </div>
        <Card>
            <div className="additional-info">
                {reviewLoading && <Loading />}
                {!reviewLoading && <>
                    <div className="bolder-text">Top Reviews</div>
                    <Reviews reviews={reviewDetails.results} />
                </>}
            </div>
        </Card>
    </div >
}