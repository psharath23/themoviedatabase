import { render } from "@testing-library/react"
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom'
import Carousel from "./component"
import { movies } from "./testdata"
describe("Carousel", () => {
    it("carousel renders when data is undefined", () => {
        render(<Carousel data={undefined} />)
    })

    it("carousel renders when data is empty array", () => {
        render(<Carousel data={[]} />)
    })

    it("<NoRecords> is rendered when data is undefined", () => {
        const { getByText } = render(<Carousel data={undefined} />)
        expect(getByText("No records found")).toBeInTheDocument()
    })

    it("<NoRecords> is rendered when data is empty array", () => {
        const { getByText } = render(<Carousel data={[]} />)
        expect(getByText("No records found")).toBeInTheDocument()
    })

    it("carousel renders all the elements in data prop", () => {

        const { getByTestId, baseElement } = render(<Carousel data={movies} />, { wrapper: MemoryRouter })
        const carouselItems = getByTestId("carousel-items")
        expect(carouselItems.childElementCount).toEqual(movies.length)

    })
})