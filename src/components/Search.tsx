import React, { useState } from 'react';
import styled from "styled-components"



export default ({}) => {
    return  <Container>
                <Desc>

                </Desc>
                <Form>
                    <button>Search</button>
                </Form>
            </Container>
}

const Desc = styled.p`

`
const Form = styled.div`

    & > button {
        
    }
`

const Container = styled.div`
    border: 1px solid black;
    & > * {
        border: 1px solid black;
    }
    width: 50vw;
    height: 100vh;
`