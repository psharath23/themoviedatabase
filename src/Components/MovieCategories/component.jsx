import "./style.scss"

import MovieCategory from "../MovieCategory"

const movieCategories = [
    {
        name: "Latest Movies",
        url: "/movie/popular",
        pathName: "latest"
    },
    {
        name: "Top Upcoming Movies",
        url: "movie/upcoming",
        pathName: "upcoming"
    },
    {
        name: "Top Rated Movies",
        url: "/movie/top_rated",
        pathName: "toprated"
    }
]
export const MovieCategories = () => {
    return <div className="categories">
        {
            movieCategories.map((category, i) => {
                const { name, url, pathName } = category
                return <MovieCategory key={`movie-category-${i}`}
                    name={name}
                    url={url}
                    pathName={pathName}
                />
            })
        }
    </div>
}