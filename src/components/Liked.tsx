import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { calcWeirdness } from "../actions"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import styled from "styled-components"
import Gif, { IGif } from "./Gif"

const Liked: React.FC = () => {

    const [expanded, setExpanded] = useState(false)

    const dispatch = useDispatch()
    const likedGifs = useSelector((state: any) => 
        state.gifReducer.likedGifs
    )
    const weirdnessScore = useSelector((state: any) => 
        state.gifReducer.weirdnessScore
    )

    const handleClick = async () => {
        setExpanded(!expanded)
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
             />
    }) 
    
    return  <Container>
                <Router>
                    {gifs}
                    { gifs.length >= 5 &&
                        <Calculate onClick={() => handleClick()}>
                            <Link to="/results">
                                Calculate Weirdness!
                            </Link>
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
    }
    &:hover {
        cursor: pointer;
    }
`
const Container = styled.div`
    grid-area: likes;
    diplay: flex;
    overflow-y: scroll;
`
const Score = styled.div`
    border: 1px solid black;
`
export default Liked 