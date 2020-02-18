import React from 'react'
import { Header } from '../Component/header'
import { Footer } from '../Component/footer'




export function Shell({children}) {

    return (
        <>
            <Header />
                {children}
            <Footer />
            </>
    )
}