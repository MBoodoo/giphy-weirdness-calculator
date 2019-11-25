import axios from "axios"

const API_KEY = "yzXM4tFFVbMqnsOOQMBQr2XPjHjTUNZz"

const RANDOM_ID_URL = "https://api.giphy.com/v1/randomid"
const SEARCH_URL = "api.giphy.com/v1/gifs/translate"

const getRandomID = () => {
    return axios.get(RANDOM_ID_URL, {
        params: {
            api_key: API_KEY
        }
    })
        .then(res => {
            return res.data.data.random_id
        })
        .catch(err => {
            console.error(err)
        })
}

const search = async (random_id, weirdness, s) => {
    await axios.get(SEARCH_URL, {
        api_key: API_KEY,
        random_id,
        weirdness,
        s 
    })
        .then(res => {
            return res.data.images.downsized_large.url
        })
}

export {
    getRandomID,
    search
}