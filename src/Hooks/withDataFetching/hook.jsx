import { useEffect, useState } from "react"

import service from "Services"

export const withDataFetching = (url, method, body, ignoreHost = false) => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)

    const makeCall = async () => {
        // setTimeout(async () => {
        try {
            setLoading(true)
            const resp = await service.makeCall(url, method, body, ignoreHost)
            if (resp.status != 200) {
                throw Error(resp.statusText)
            }
            const d = await resp.json()
            setData(d)
        } catch (err) {
            setError(err)
        } finally {
            setLoading(false)
        }
        // }, 3000)

    }

    useEffect(() => {
        makeCall()
    }, [url, method, body])


    return [data, loading, error]

}