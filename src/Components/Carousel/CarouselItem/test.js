import { getByTestId, render } from "@testing-library/react"
import '@testing-library/jest-dom'
import CarouselItem from "./component"
import { movie } from "./testdata"
describe("CarouselItem", () => {
    it("renders without crashing", () => {
        render(<CarouselItem item={movie} />)
    })

    it("renders without crashing when item prop is null", () => {
        render(<CarouselItem item={null} />)
    })

    it("renders movie title", () => {
        const {getByText} = render(<CarouselItem item={movie} />)
        expect(getByText(movie.title)).toBeInTheDocument()
    })


})