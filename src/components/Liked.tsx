import React from "react"
import { useSelector, shallowEqual } from "react-redux"
import styled from "styled-components"
import Gif, { GifProps } from "./Gif"

const Liked: React.FC = () => {
    const selectLikedGifs = useSelector((state: any) => 
        state.fetchedGifs.filter((gif: GifProps) =>
            (gif.liked)
        ), shallowEqual)

    const likedGifs = selectLikedGifs.map((gif: GifProps) => {
        return <Gif id={gif.id} 
                title={gif.title}
                url={gif.url}
                liked={gif.liked}
             />
    })

    return  <Container>
                {likedGifs}
            </Container>
}

const Calculate = styled.button`

`
const Container = styled.div`

`

export default Liked 