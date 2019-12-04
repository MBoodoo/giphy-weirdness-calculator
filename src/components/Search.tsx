import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from "react-redux"
import styled from "styled-components"
import { fetchGifs } from "../actions"

const SearchArea:  React.FC = () => {
    // Get Dispatch and select fetched gifs (giReducer type is already implicit)
    const dispatch = useDispatch()
    const currentId = useSelector((state: any) => state.gifReducer.currentId, shallowEqual)
    const isLoading = useSelector((state: any) => state.gifReducer.isLoading)

    // Init Input and Error State
    const [input, setInput] = useState('')
    const [error, setError] = useState<string | boolean>('')

    const handleSearch = async (e: any) => {
        e.preventDefault()
        
        // Sanitize and throttle submission
        if (isLoading) {
            return
        } else if (input.replace(/[^A-Z0-9]/ig, '') === "") {
            setError("Please fill it in with words and numbers only")
            return
        }

        try {
            dispatch(await fetchGifs(currentId, input))
            setError(false)
        } catch (e) {
            console.error(e)
            setError(e)
        }
    }

    return  <Container>
                <Desc>
                    Find out how weird you are
                </Desc>

                <Form>
                    <input value={input} onChange={e => setInput(e.target.value)}/>
                    <button onClick={e => handleSearch(e)}>Search</button>
                </Form>

                {isLoading && <div>Content is Loading</div>}
                {error && 
                    <div> 
                        There was an error loading content:
                        <br/>  
                        <span style={{color: `red`}}>{error}</span> 
                    </div>
                }
            </Container>
}

const Desc = styled.p`
    flex: 1;
`
const Form = styled.form`
    flex: 3;
    & > input {
        font-size: 20px;
    }
    
    & > button {
       margin: 1em;
       padding: .5em;
       font-size: 16px;
       background: linear-gradient(to left, #ffafbd, #ffc3a0);

       &:hover {
        cursor: pointer;
       }
    }
`

const Container = styled.div`
    grid-area: search;
    display: flex;
    flex-direction: column;
`
export default SearchArea