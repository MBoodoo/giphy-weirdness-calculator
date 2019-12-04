import React, { useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from "react-redux"
import styled from "styled-components"
import { fetchGifs } from "../actions"

const SearchArea:  React.FC = () => {
    // Get Dispatch and select fetched gifs (giReducer type is already implicit)
    const dispatch = useDispatch()
    const currentId = useSelector((state: any) => state.gifReducer.currentId, shallowEqual)
    const isLoading = useSelector((state: any) => state.gifReducer.isLoading)
    // Init Loading and Input State
    const [input, setInput] = useState('')

    // Submit callback
    const handleSearch = async (e: any) => {
        if (isLoading) {return}
        e.preventDefault()
        dispatch(await fetchGifs(currentId, input))
    }

    return  <Container>
                <Desc>
                    Find out how weird you are
                </Desc>
                <Form>
                    <input value={input} onChange={e => setInput(e.target.value)}/>
                    <button onClick={e => handleSearch(e)}>Search</button>
                </Form>
                {isLoading && <Loading>Content is Loading</Loading>}
            </Container>
           
}

const Desc = styled.p`
    flex: 1;
`
const Form = styled.form`
    flex: 3;
    & > button {
        
    }
`
const Loading = styled.div`

`

const Container = styled.div`
    grid-area: search;
    display: flex;
    flex-direction: column;
`
export default SearchArea