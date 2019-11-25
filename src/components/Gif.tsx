import React from "react"
import { useDispatch } from "react-redux"
import { toggleLike } from "../actions"
import styled from "styled-components"

export interface GifProps {
    title: String
    url: string,
    id: string,
    liked: boolean
}

const Gif: React.FC<GifProps> = ({ title, url, id }) => {
    const dispatch = useDispatch()

    return  <Container>
                <div>{title}</div>
                <Img src={url} />
                <Like onClick={() => dispatch(toggleLike(id))} />
            </Container>
}

const Container = styled.div`
    display: flex;
`

const Img = styled.img`
    border: 1px solid black;
    width: 15em;
    height: 15em;
`
const Like = styled.button`

`

export default Gif