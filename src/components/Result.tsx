import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import styled from "styled-components"
import { motion, useMotionValue, useTransform } from "framer-motion"
import Gif, {GifProps} from "./Gif"

const Result:  React.FC = () => {
    const selectGifResults = useSelector((state: any) => state.fetchedGifs)
    const [weirdIdx, setWeirdIdx] = useState(0)

    const x = useMotionValue(0)
    const input = [0, 150]
    const output = [0, 10]

    const sliderValue = useTransform(x, input, output)
/*
    useEffect(() => {
        console.log(gifResults)
    }, [gifResults])
*/
    useEffect(() => 
        sliderValue.onChange(latest => {
            setWeirdIdx(Math.floor(latest))
    }), [])
    
    const gifs = selectGifResults.map((gif: GifProps) => {
        return <Gif id={gif.id} 
                    title={gif.title}
                    url={gif.url}
                    liked={gif.liked}
                />
    })
    return  <Container>
                {gifs[weirdIdx]}
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

const Knob = styled(motion.div)`

`
const Slider = styled.div`

` 

const Container = styled.div`
    border: 1px solid black;
    & > * {
        border: 1px solid black;
    }
    flex: 1;
    display: flex;
`
export default Result 