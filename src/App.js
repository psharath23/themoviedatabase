import "./App.scss";

import Header from "Components/Header"
import Main from "Components/Main";
import { MovieContextProvider } from "Contexts/Movie";
import WithDataFetching from "Hooks/withDataFetching";
import { useMemo } from "react";
import usePersistedState from "./Hooks/usePersistedState";

const App = () => {
  const [genre] = WithDataFetching(
    "/genre/movie/list", "get"
  )
  const [wishList, setWishList] = usePersistedState("WishList", [])
  const addToWishList = (movie, movieKind) => {
    setWishList([...wishList, { ...movie, movieKind }])
  }
  const removeFromWishList = (id) => {
    setWishList(wishList.filter(movie => movie.id !== id))
  }
  const contextValue = useMemo(() => {
    const { genres = [] } = genre || {}
    return {
      genre: genres.reduce((acc, g) => {
        return {
          ...acc, ...{ [g.id]: g.name }
        }
      }, {}),
      imageBasePath: "http://image.tmdb.org/t/p",
      wishList, addToWishList, removeFromWishList
    }
  }, [genre, wishList])
  return <MovieContextProvider value={contextValue}>
    <div className="wrapper">
      <Header />
      <Main />
    </div>
  </MovieContextProvider>

}
export default App