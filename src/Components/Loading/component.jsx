import "./style.scss"

import { useEffect, useRef } from "react"

export const Loading = () => {
    const ref = useRef(null)
    useEffect(() => {
        return () => {
            const { current } = ref || {}
            const { setAttribute, className } = current || {}
            if (current) {
                setAttribute("class", className + " fade")
            }
        }
    }, [])
    return <div ref={ref} className="loading"><span className="loading-dots">loading</span></div>
}