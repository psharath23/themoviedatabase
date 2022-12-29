/**
 * @jest-environment jsdom
 */
import React from "react"
import App from "./App"
import { fireEvent, render } from "@testing-library/react"
import '@testing-library/jest-dom'
import { act } from "react-dom/test-utils"
import { BrowserRouter } from "react-router-dom"

describe("App", () => {
    it("renders without crashing", async () => {
        await act(() => {
            render(<App />)
        })

    })
    it("initally in home page", () => {
        const { getByText } = render(<App />)
        expect(getByText(/the movie database/i)).toBeInTheDocument()
    })
    it("navigates to Latest Movie Details on clicking a carousel item", () => {
        const { getAllByTestId, getByText } = render(<App />)
        const latestMovieCarouselItems = getAllByTestId("carousel-items")[0]
        const firstCarouselItem = latestMovieCarouselItems.childNodes[0]
        fireEvent.click(firstCarouselItem)
        expect(getByText(/Latest Movie/i)).toBeInTheDocument()
    })
    it("navigates to UpComing Movie Details on clicking a carousel item", () => {
        const { getAllByTestId, getByText } = render(<App />)
        const upcomingMovieCarouselItems = getAllByTestId("carousel-items")[1]
        const firstCarouselItem = upcomingMovieCarouselItems.childNodes[0]
        fireEvent.click(firstCarouselItem)
        expect(getByText(/Upcoming Movie/i)).toBeInTheDocument()
    })

    it("navigates to Top Rated Movie Details on clicking a carousel item", () => {
        const { getAllByTestId, getByText } = render(<App />)
        const topRatedMovieCarouselItems = getAllByTestId("carousel-items")[1]
        const firstCarouselItem = topRatedMovieCarouselItems.childNodes[0]
        fireEvent.click(firstCarouselItem)
        expect(getByText(/Top Rated Movie/i)).toBeInTheDocument()
    })
})
