import React from 'react'
import { Header } from '../Component/header'
import { Footer } from '../Component/footer'
import styled from 'styled-components'

const Wrapper = styled.div`
overflow-y: auto;
margin: 30px;
padding: 2rem;
`;

const Container = styled.div`
overflow: hidden;
`;



export function Shell({children}) {

    return (
        <Container>
            <Header />
            <Wrapper>
                {children}
                </Wrapper>
            <Footer />
        </Container>
    )
}