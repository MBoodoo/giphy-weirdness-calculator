import axios from "axios"
import uuid from "uuid"

const API_KEY = "yzXM4tFFVbMqnsOOQMBQr2XPjHjTUNZz" // will store key as secret inside sessionStorage

const RANDOM_ID_URL = "https://api.giphy.com/v1/randomid"
const SEARCH_URL = "https://api.giphy.com/v1/gifs/translate"

const getRandomID = () => {
    return axios.get(RANDOM_ID_URL, {
        params: {
            api_key: API_KEY
        }
    })
        .then(res => {
            return res.data.data.random_id
        })
        .catch(err => console.error(err))
}

const search = (
    random_id: string, 
    weirdness: Number, 
    s: string,
    ) => {
    return axios.get(SEARCH_URL, {
        params: {
            api_key: API_KEY,
            random_id,
            weirdness,
            s
        }
    })
        .then((res: any) => {
            return {
                url: res.data.data.images.downsized_large.url, 
                title: res.data.data.title,
                id: uuid(),
                query: s,
                weirdness
            } 
        })
        .catch(e => console.error(e))
}

export {
    getRandomID,
    search,
}
