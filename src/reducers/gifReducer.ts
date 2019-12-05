import { getRandomID } from "../service"
import { 
    TOGGLE_LIKE, 
    FETCHING,
    FULFILLED,
    FAILED,
    CALC_WEIRDNESS,  
    GifAction
} from "../actions"

import { toggleByQuery, reduceAvgByProp } from "../utils"

// Move to *.d.ts

export interface IGif {
    title: string
    url: string,
    id: string,
    liked?: boolean, // Conditional for rendering "liked" when used for props
    query: string
    weirdness: number
}

export interface IScoreHistory {

}

export interface IState{
    readonly currentId: Promise<string>,
    readonly fetchedGifs: IGif[],
    readonly likedGifs: IGif[],
    readonly weirdnessScore: number, 
    readonly isLoading: Boolean,
    readonly fetchFailed: Boolean
}

export const initState: IState = {
    currentId: getRandomID(),
    fetchedGifs: [],
    likedGifs: [],
    weirdnessScore: 0, 
    isLoading: false,
    fetchFailed: false
}

const gifReducer = (state = initState, action: GifAction) => {
    switch (action.type) {
        case FETCHING:
            return {
                ...state,
                isLoading: true
            }
        case FAILED:
            return {
                ...state,
                isLoading: false,
                fetchFailed: true
            }
        case FULFILLED:
            return {
                ...state,
                fetchedGifs: action.payload,
                isLoading: false,
                fetchFailed: false
            }

        case TOGGLE_LIKE:
            return {
                ...state,
                likedGifs: toggleByQuery(action.payload, state)
            } 

        case CALC_WEIRDNESS: 
            return {
                ...state,
                weirdnessScore: reduceAvgByProp(state)
            }

        default: 
            return state
    }
}

export default gifReducer