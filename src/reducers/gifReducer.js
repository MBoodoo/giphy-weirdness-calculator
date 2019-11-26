import { getRandomID } from "../service"
import { TOGGLE_LIKE, FETCH_GIFS } from "../actions"

export const initState = {
    currentId: getRandomID(),
    currentSearch: "",
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
                currentSearch: action.query
            }
        case TOGGLE_LIKE:
            return {
                ...state,
                likedGifs: [
                    action.payload,
                    ...state.likedGifs
                        .filter(({query, id}) => 
                            (query != action.payload.query ||
                            state.currentSearch != action.payload.query) && 
                            id != action.payload.id
                        )
                ]
            }
        default: 
            return state
    }
}
export default gifReducer