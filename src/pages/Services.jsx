import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCatalogAccessories, getCatalogRaquets } from '../redux/catalog/catalog'
import Hero from '../components/banner/Hero'
import { closeNav } from '../redux/modal/nav'
import Rackets from '../components/catalogue/Rackets'
import Apparels from '../components/catalogue/Apparels'

const Services = () => {
  const dispatch = useDispatch()
  const {racquets, accessories, apparels} = useSelector(state => state.catalog)
  useEffect(()=>{
    dispatch(getCatalogRaquets())
    dispatch(getCatalogAccessories())
    dispatch(closeNav())

  },[])

  return (
    <>

<Hero/>
  
  <div className='container catalog bg-theme'>
 
    <div className='products-container color-white '>
      <div className='racquets'>
      <h2 className='headers'>Racquets</h2>

        {racquets.map(racquet => (
        <Rackets racquet={racquet}/>)
      )}      
      
      </div>
      <div className='apparel'>
        <h2 className='headers'>Apparels</h2>
        {apparels.map(apparel => (
          <Apparels apparel={apparel} />
        ))}

      </div>
    </div>
        
    </div>
    </>
  )
}

export default Services