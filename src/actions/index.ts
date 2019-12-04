import { search } from "../service"
import { IGif } from "../reducers/gifReducer"

import { Action, Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'

export const FETCHING = 'FETCHING_GIFS'
export const FULFILLED = 'FETCHING_GIFS_FULFILLED'
export const FAILED = 'FETCHING_GIFS_FAILED'

export const TOGGLE_LIKE = 'TOGGLE_LIKE'
export const CALC_WEIRDNESS = 'CALC_WEIRDNESS'


////////////////////// Move to *.d.ts

interface IFetching extends Action {
    type: typeof FETCHING
}

interface IFulfilled extends Action {
    payload: IGif[],
    type: typeof FULFILLED
}

interface IFailed extends Action {
    type: typeof FAILED
}

interface IToggle extends Action {
    payload: IGif,
    type: typeof TOGGLE_LIKE
}

interface ICalcWeirdness extends Action {
    type: typeof CALC_WEIRDNESS
}

export type GifAction = 
    IFetching |
    IFulfilled | 
    IFailed | 
    IToggle | 
    ICalcWeirdness

//////////////////////

const fetchGifs = ( 
    id: string, 
    input: string
): ThunkAction<
    Promise<IFulfilled | IFailed>, // Type of last action dispatched
    IGif[], 
    null, 
    IFulfilled | IFailed
    > => async (dispatch: Dispatch) => {

    dispatch(fetchingGifs())
    // Get 10 items for the weirdness scale, 
    // Should work for one at a time as well if the action 
    // is dispatched in the useEffect() of 'Result.tsx'
     
    let gifs: IGif[] = []
    for (let i = 0; i <= 10; i++ ) {
        const gif = await search(id, i, input) as IGif || null
        gifs.push(gif)
    }

    // unknown errors logged in console but not added to state
    // will fix issue that dispatches failed action on pending promise 

    return await dispatch(gifsFetched(gifs)) 
}   

const fetchingGifs = () => {
    let action: IFetching = {
        type: FETCHING,
    }
    return action
}

const gifsFailed = () => {
    let action: IFailed = {
        type: FAILED
    }
    return action
}

const gifsFetched = (payload: IGif[]) => {
    let action: IFulfilled = {
        type: FULFILLED,
        payload
    }
    return action
}

const toggleLike = (payload: IGif) => {
    let action: IToggle = {
        type: TOGGLE_LIKE,
        payload
    }
    
    return action
}

const calcWeirdness = () => {
    let action: ICalcWeirdness = {
        type: CALC_WEIRDNESS
    }
    return action
}

export {
    fetchGifs,
    toggleLike,
    calcWeirdness
}