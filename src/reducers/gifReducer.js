import { getRandomID } from "../service/api"
import { TOGGLE_LIKE, FETCH_GIFS } from "../actions"

const initState = {
    currentId: getRandomID(),
    fetchedGifs: [],
    isFetching: false,
    error: null,
    weirdnessScore: 0
}

const gifReducer = (state = initState, action) => {
    switch (action.type) {
        case FETCH_GIFS:
            return {
                ...state,
                fetchedGifs: action.payload
            }
        case TOGGLE_LIKE:
            return {
                ...state,
                fetchedGifs: state.fetchedGifs.map(gif => 
                    (gif.id === action.id)
                        ? {...gif, liked: !gif.liked}
                        : gif
                )
            }
    }
}
export default gifReducer