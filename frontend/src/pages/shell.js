import React from 'react'
import { Header } from '../Component/header'
import { Footer } from '../Component/footer'
import styled from 'styled-components'

const Wrapper = styled.div`
height: 100%; 
overflow-y: auto;
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