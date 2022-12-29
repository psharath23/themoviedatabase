class Service {

    constructor(API_URL, API_VERSION, ACCESS_TOKEN) {
        this.ACCESS_TOKEN = ACCESS_TOKEN
        this.API_URL = API_URL
        this.API_VERSION = API_VERSION
        this.URL = `${this.API_URL}/${this.API_VERSION}`
        this.Headers = {
            'Authorization': `Bearer ${this.ACCESS_TOKEN}`,
            'Content-Type': 'application/json;charset=utf-8'
        }
    }

    makeCall(url, method, body, ignoreHost) {
        return fetch(`${ignoreHost ? "" : this.URL}/${url}`, {
            headers: this.Headers,
            method: method,
            body: JSON.stringify(body)
        })
    }

    get(url) {
        return fetch(`${this.URL}/${url}`, {
            headers: this.Headers,
        })
    }

    post(url, body) {
        return fetch(`${this.URL}/${url}`, {
            headers: this.Headers,
            body: JSON.stringify(body)
        })
    }
}

export default new Service(
    process.env.API_URL,
    process.env.API_VERSION,
    process.env.ACCESS_TOKEN)