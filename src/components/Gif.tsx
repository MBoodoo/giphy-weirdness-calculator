import React from "react"
import { useDispatch } from "react-redux"
import { toggleLike } from "../actions"
import styled from "styled-components"
import { IGif } from "../reducers/gifReducer"

const Gif: React.FC<IGif> = ({ 
    title, 
    url, 
    id, 
    liked, 
    query,
    weirdness
}) => {

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
                <Score>
                    {weirdness} / 10
                </Score>
            </Container>
}

const Container = styled.div`
    position: relative;
    display: flex;
    flex: 1;

    flex-direction: column;
    justify-self: center;

    padding: .5em;
    & > * {
        margin: .2em 0;
    }
`

const Img = styled.img`
    width: 15em;
    height: 12em;
    place-self: center center;
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
`

const Score = styled.div`
    font-size: 22px;
    width: 3em;
    padding: .5em;
    background: linear-gradient(to right, #ffafbd, #ffc3a0);
    line-height: 30px;
    position: absolute;
    right: 15%;
    top: 15%;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
}`

const Like = styled.div`
    width: 5em;
    height: 2em;
    padding: .5em;

    transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
    background: #ffafbd;
    align-self: center;
    line-height: 30px;
    &:hover {
        cursor: pointer;
        background: #ffc3a0;
        letter-spacing: 2.5px;
    }
`

export default Gif