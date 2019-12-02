import { search } from "../service"

export const FETCH_GIFS = 'FETCH_GIFS'
export const TOGGLE_LIKE = 'TOGGLE_LIKE'
export const CALC_WEIRDNESS = 'CALC_WEIRDNESS'

const fetchGifs = async (id, string) => {
    let gifs = []
    for (let i = 0; i <= 10; i++ ) {
        const gif = await search(id, i, string)
        gifs.push(gif)
    }
    return await {
        payload: gifs,
        type: FETCH_GIFS,
    }
}

const toggleLike = (payload) => {
    return {
        type: TOGGLE_LIKE,
        payload
    }
}

const calcWeirdness = () => {
    return {
        type: CALC_WEIRDNESS
    }
}

export {
    fetchGifs,
    toggleLike,
    calcWeirdness
}