import { IState, IGif } from "./reducers/gifReducer"

const toggleByQuery = (payload: IGif, state: IState) => {
    const idx = state.likedGifs
                .findIndex((obj: IGif) => obj.query === payload.query)
                
    return idx === -1 ?
        [...state.likedGifs, payload] :
        [
            ...state.likedGifs.slice(0, idx),
            ...state.likedGifs.slice(idx + 1),
            ...(payload.id === state.likedGifs[idx].id  
            ? [] 
            : [payload]
            )
        ]
}

const reduceAvgByProp = (state: IState) => {
    return Math.round(
        state.likedGifs.reduce((acc, next: IGif) => 
            acc + next.weirdness
        , 0) 
        / state.likedGifs.length
    )
}

export {
    toggleByQuery,
    reduceAvgByProp
}