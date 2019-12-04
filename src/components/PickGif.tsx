import React, { useEffect, useState } from "react"
import { useSelector, shallowEqual } from "react-redux"
import { IGif } from "../reducers/gifReducer"

import styled from "styled-components"
import { motion, useMotionValue, useTransform } from "framer-motion"
import Gif from "./Gif"

const PickGif:  React.FC = () => {
    // Select gifs and liked gifs from store
    const fetchedGifs = useSelector((state: any) => state.gifReducer.fetchedGifs, shallowEqual)
    const likedGifs = useSelector((state: any) => state.gifReducer.likedGifs, shallowEqual)

    // Init weird index for slider
    const [weirdIdx, setWeirdIdx] = useState(0)

    // Init slider position for interpolation
    const x = useMotionValue(0)
    const input = [0, 150]
    const output = [0, 10]
    const sliderValue = useTransform(x, input, output)

    // Round the slider value and set it to the current weird index
    useEffect(() => 
        sliderValue.onChange(latest => {
            setWeirdIdx(Math.floor(latest))
    }), [sliderValue])
    
    // Make all gif data into gif components and set the liked prop
    // based on if that gif exists in the overall 'liked gifs' array
    const gifs = fetchedGifs.map((gif: IGif) => {
        return <Gif id={gif.id} 
                    title={gif.title}
                    url={gif.url}
                    liked={
                        likedGifs.findIndex((liked: IGif) => liked.id === gif.id) !== -1
                    }
                    query={gif.query}
                    weirdness={gif.weirdness}
                />
    })

    return  <Container>
                {gifs[weirdIdx]}
                <Info>
                    {gifs.length > 0 ?
                            `Weirdness: ${weirdIdx}` :
                            `Make a search then move the 
                            knob to set your desired weirdness`
                    }
                </Info>
                <Slider>
                    <Knob   
                        drag="x" 
                        style={{ x }}
                        dragElastic={.3}
                        dragMomentum={false}
                        dragConstraints={{
                            right: 150,
                            left: 0
                        }}
                    />
                </Slider>
            </Container>
}

const Container = styled.div`
    grid-area: result;
    display: flex;
    justify-content: space-around;
    position: relative;
    padding: 15px;
`
const Info = styled.div`
    position: absolute;
    top: 5%;
    right: 5%;
    font-size: 24px;
`
const Knob = styled(motion.div)`
    border-radius: 50%;
    background: white;
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    height: 1.5em;
    width: 1.5em;

`
const Slider = styled.div`
    width: 10em;
    height: 1.5em;
    background: linear-gradient(to right, #ffafbd, #ffc3a0);
    place-self: center end;
    position: relative;
    border-radius: 10px;

` 

export default PickGif