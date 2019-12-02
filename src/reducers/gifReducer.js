import { getRandomID } from "../service"
import { TOGGLE_LIKE, FETCH_GIFS, CALC_WEIRDNESS } from "../actions"

export const initState = {
    currentId: getRandomID(),
    fetchedGifs: [],
    likedGifs: [],
    weirdnessScore: 0, 
}

const gifReducer = (state = initState, action) => {
    switch (action.type) {
        case FETCH_GIFS:
            return {
                ...state,
                fetchedGifs: action.payload,
            }

        case TOGGLE_LIKE:
            const toggle = payload => {
                const idx = state.likedGifs
                            .findIndex(obj => obj.query === payload.query)
                
                return idx === -1 ?
                [...state.likedGifs, payload] :
                [
                    ...state.likedGifs.slice(0, idx),
                    ...state.likedGifs.slice(idx + 1),
                    ...(payload.id === state.likedGifs[idx].id ? 
                        [] : 
                        [payload]
                    )
                ]
            }

            return {
                ...state,
                likedGifs: toggle(action.payload)
            } 
        case CALC_WEIRDNESS: 
            return {
                ...state,
                weirdnessScore: Math.round(
                    state.likedGifs.reduce((acc, next) => 
                        acc + next.weirdness
                    , 0) 
                    / state.likedGifs.length
                )
            }
        default: 
            return state
    }
}
export default gifReducer