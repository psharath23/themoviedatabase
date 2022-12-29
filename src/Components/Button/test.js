import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import Button from './component'

describe("Button", () => {
    it("renders without crashing", () => {
        render(<Button />)
    })

    it("renders the children", () => {
        const { getByText } = render(<Button>Click Me</Button>)
        expect(getByText("Click Me")).toBeInTheDocument()
    })
    it("has onclick", () => {
        const onClick = jest.fn()
        const e = render(<Button onClick={onClick}>Click Me</Button>)
        const b = e.getByText("Click Me")
        fireEvent.click(b)
        expect(onClick).toBeCalledTimes(1)
    })
})