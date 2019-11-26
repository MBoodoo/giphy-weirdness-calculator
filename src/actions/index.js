import { search } from "../service"

export const FETCH_GIFS = 'FETCH_GIFS'
export const TOGGLE_LIKE = "TOGGLE_LIKE"

const fetchGifs = async (id, string) => {
    let gifs = []
    for (let i = 0; i <= 10; i++ ) {
        const gif = await search(id, i, string)
        gifs.push(gif)
    }
    return await {
        payload: gifs,
        type: FETCH_GIFS,
        query: string
    }
}

const toggleLike = (payload) => {
    return {
        type: TOGGLE_LIKE,
        payload
    }
}

export {
    fetchGifs,
    toggleLike
}