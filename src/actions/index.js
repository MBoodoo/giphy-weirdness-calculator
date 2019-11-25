import { search } from "../service/api"

export const FETCH_GIFS = 'FETCH_GIFS'
export const FETCH_GIFS_PENDING = 'FETCH_GIFS_PENDING'
export const FETCH_GIFS_ERROR = 'FETCH_GIFS_ERROR'
export const TOGGLE_LIKE = "TOGGLE_LIKE"

const gifsPending = () => {
    return {
        type: FETCH_GIFS_PENDING
    }
}

const fetchGifsError = () => {
    return {
        type: FETCH_GIFS_ERROR
    }
}

const fetchGifs = async (id, string) => {
    let gifs = []
    for (let i = 0; i <= 10; i++ ) {
        const gif = await search(id, i, string)
        gifs.push(gif)
    }
    return await {
        payload: gifs,
        type: FETCH_GIFS
    }
}

const toggleLike = id => {
    return {
        type: TOGGLE_LIKE,
        id
    }
}

export {
    fetchGifs,
    toggleLike
}