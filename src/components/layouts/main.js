import React from 'react'
import Nav from '../nav/Nav'
import Footer from '../footer/Footer'


const MainLayout = ({children}) => {
  return (
    <div className='container'>
        <Nav />
        {children}
        <Footer />
    </div>
  )
}

export default MainLayout