import { useEffect, useState } from "react"

export const usePersistedState = (name, intitalValue) => {
    const [state, setState] = useState(localStorage.getItem(name) ? JSON.parse(localStorage.getItem(name)) : intitalValue)
    useEffect(() => {
        localStorage.setItem(name, JSON.stringify(state))
    }, [state])

    return [state, setState]
}