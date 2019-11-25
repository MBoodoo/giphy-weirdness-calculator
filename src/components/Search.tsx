import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { fetchGifs } from "../actions"

const SearchArea:  React.FC = () => {
    const dispatch = useDispatch()
    const currentId = useSelector((state: any) => state.currentId)

    const [input, setInput] = useState('')
    const [isLoading, setLoading] = useState(false)

    const handleSearch = async (e: any) => {
        e.preventDefault()

        if (isLoading) {return}
        setLoading(true)

        dispatch(await fetchGifs(currentId, input))
        return setLoading(false)
    }

    return  <Container>
                <Desc>
                    Find out how weird you are
                </Desc>
                <Form>
                    <input value={input} onChange={e => setInput(e.target.value)}/>
                    <button onClick={e => handleSearch(e)}>Search</button>
                </Form>
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
const Input = styled.input`

`
const Container = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid black;
    & > * {
        border: 1px solid black;
    }
    width: 50vw;
    height: 100vh;
`
export default SearchArea