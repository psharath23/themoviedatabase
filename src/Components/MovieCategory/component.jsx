import "./style.scss"

import { useContext, useMemo } from "react"

import Card from "../Card"
import Carousel from "Components/Carousel"
import Loading from "Components/Loading"
import MovieContext from "Contexts/Movie"
import WithDataFetching from "Hooks/withDataFetching"

export const MovieCategory = ({ name, url, pathName }) => {
    const movieContext = useContext(MovieContext)
    const { genre = {} } = movieContext
    const [category, loading] = WithDataFetching(url, "get")

    const data = useMemo(() => {
        const { results = [] } = category || {}
        return results ? results.map(item => {
            const { id, title, overview, genre_ids, poster_path } = item
            return {
                title: title,
                overview: overview.length > 100 ? overview.slice(100) + "..." : overview,
                genre: genre_ids.map((g) => genre[g]),
                image: poster_path,
                pathName: pathName,
                id: id
            }
        }) : []
    }, [movieContext, category, pathName])

    return <Card data-testid="movie"><div className="category">
        {loading && <Loading />}
        {!loading && <>
            <h3>{name}</h3>
            <Carousel data={data} />
        </>}
    </div>
    </Card >
}