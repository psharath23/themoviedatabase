import React from "react"
import { render } from "@testing-library/react"
import Home from "./index"

describe("Home", () => {
    it("Home loads without crashing", () => {
        render(<Home />)
    });
});