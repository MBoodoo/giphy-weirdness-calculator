import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { calcWeirdness } from "../actions"
import { IGif } from "../reducers/gifReducer"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

import styled from "styled-components"
import { motion, useCycle } from "framer-motion"
import Gif from "./Gif"

const containerVariants = {
    default: {
        width: `auto`,
        x: 0,
    },
    expanded: {
        width: `100vw`,
        x: `-60%`,
        transition: {
            type: "spring",
          }
    }
}

const Liked: React.FC = () => {

    const [expanded, toggleExpanded] = useCycle(false, true)

    const dispatch = useDispatch()
    const likedGifs = useSelector((state: any) => 
        state.gifReducer.likedGifs
    )
    const weirdnessScore = useSelector((state: any) => 
        state.gifReducer.weirdnessScore
    )

    const handleClick = () => {
        toggleExpanded()
        dispatch(calcWeirdness())
    }

    const gifs = likedGifs.map((gif: IGif) => {
        return <Gif id={gif.id} 
                title={gif.title}
                url={gif.url}
                liked={
                    likedGifs.findIndex((liked: IGif) => liked.id === gif.id) !== -1
                }
                query={gif.query}
                weirdness={gif.weirdness}
                key={gif.id}
             />
    }) 

    useEffect(() => {
        if (gifs.length < 5 && expanded) {
            toggleExpanded()
        }
    }, [gifs])
    
    return  <Container 
                initial={false}
                animate={expanded ? "expanded" : "default"}
                variants={containerVariants}
            >
                <Router>
                    {gifs}
                    { gifs.length >= 5 &&
                        <Calculate onClick={() => handleClick()}>
                            {!expanded ? 
                                <Link to="/results">
                                    Calculate Weirdness!
                                </Link> :
                                <Link to="/">
                                    Back to Search
                                </Link> 
                            } 
                        </Calculate>
                    }
                    { expanded &&
                        <Switch>
                            <Route path="/results">
                                <Score>
                                You scored a {weirdnessScore} out of 10 on the weirdness scale!
                                </Score>
                            </Route>
                        </Switch> 
                    }
                </Router>
            </Container>
}

const Calculate = styled.div`
    position: fixed;
    top: 10%;
    padding: 1em;
    background: #ffc3a0;
    & > * {
        text-decoration: none;
        color: black;
    }
    &:hover {
        cursor: pointer;
    }
`
const Container = styled(motion.div)`
    grid-area: likes;
    display: grid;
    grid-template-rows: repeat(1fr);
    grid-template-columns: repeat(auto-fill, minmax(25em, 1fr));
    grid-gap: 1em;
    overflow-y: scroll;
`
const Score = styled.div`
    place self: center center;
    padding: .5em;
    background: linear-gradient(to right, #ffafbd, #ffc3a0);
    font-size: 20px;
    width: 12em;
    max-height: 5em;
    line-height: 20px;

`
export default Liked 