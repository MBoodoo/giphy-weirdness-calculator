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
    type: typeof FAILED,
    payload: IGif
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
    query: string
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
        let gif = await search(id, i, query) as IGif 
        
        if (!gif) {
            const failingAction = dispatch(gifFailed(query, i))
            gif = failingAction.payload
        }

        gifs.push(gif)
    }
    // unknown errors logged in console but not added to state

    return await dispatch(gifsFetched(gifs)) 
}   

const fetchingGifs = () => {
    let action: IFetching = {
        type: FETCHING,
    }
    return action
}

const gifFailed = (query: string, weirdness: number ) => {

    const failingPayload: IGif = {
        title: "Sorry, the gif you searched could not be fetched",
        url: "https://media2.giphy.com/media/14uQ3cOFteDaU/giphy.gif?cid=5a210f27722f0840414ceec4be24a3e41e2de1cb5c7468f9&rid=giphy.gif",
        id: "", // empty ID means there is an error
        query,
        weirdness
    }
    let action: IFailed = {
        type: FAILED,
        payload: failingPayload
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