import React, { useState, useEffect } from "react"
import { useSelector, shallowEqual } from "react-redux"
import styled from "styled-components"
import Gif, { IGif } from "./Gif"

const Liked: React.FC = () => {
    const [liked, setLiked] = useState<IGif[] | any>([])

    const selectLikedGifs = useSelector((state: any) => 
        state.gifReducer.likedGifs //fetchedGifs.filter((gif: any) => gif.liked)
    )

    useEffect(() => {
        console.log(selectLikedGifs)
    }, [selectLikedGifs])

    const likedGifs = selectLikedGifs.map((gif: IGif) => {
        return <Gif id={gif.id} 
                title={gif.title}
                url={gif.url}
             />
    }) 

    return  <Container>
                {likedGifs}
                {likedGifs.length >= 5 &&
                    <Calculate>Calculate Weirdness!</Calculate>
                }
            </Container>
}

const Calculate = styled.div`
    place-self: center end;
`
const Container = styled.div`
    grid-area: likes;
    diplay: flex;

`

export default Liked 