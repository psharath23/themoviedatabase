import React, { Suspense } from "react"
import { Route, Routes } from "react-router"

import Loading from "Components/Loading"
import ResourceNotFound from "../../Pages/ResourceNotFound";

const Home = React.lazy(() => import("Pages/Home"));
const Detail = React.lazy(() => import("Pages/Detail"));
const WishList = React.lazy(() => import("Pages/WishList"));


export const Main = () => {
    return <main>
        <Suspense fallback={<Loading />}>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/:movieKind/:id"
                    element={<Detail />}></Route>
                <Route path={"/wishlist"} element={<WishList />}></Route>
                <Route path="*" element={<ResourceNotFound/>}></Route>
            </Routes>
        </Suspense>
    </main>
}