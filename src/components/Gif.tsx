import React from "react"
import { useDispatch } from "react-redux"
import { toggleLike } from "../actions"
import styled from "styled-components"
import { IGif } from "../reducers/gifReducer"

export interface IGifProps {
    title: string
    url: string,
    id: string,
    liked?: boolean,
    query: string,
    weirdness: number
}

const Gif: React.FC<IGif> = ({ 
    title, 
    url, 
    id, 
    liked, 
    query,
    weirdness
}) => {
    // Get dispatch
    const dispatch = useDispatch()

    const handleLike = () => {

        dispatch(
            toggleLike({ 
                id, 
                url, 
                title, 
                query, 
                weirdness
            })
        )
    }

    return  <Container>
                <div>{title}</div>
                <Img src={url} />
                <Like onClick={() => handleLike()}>
                    {!liked ? 'Like' : 'Unlike'}
                </Like>
            </Container>
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-self: center;
    padding: .5em;
    & > * {
        margin: .2em 0;
    }
`

const Img = styled.img`
    border: 1px solid black;
    width: 15em;
    height: 12em;
    place-self: center center;
`
const Like = styled.div`
    width: 5em;
    height: 2em;
    padding: .5em;
    background: #ffafbd;
    align-self: center;
    line-height: 30px;
    &:hover {
        cursor: pointer;
        background: #ffc3a0;
    }
`

export default Gif