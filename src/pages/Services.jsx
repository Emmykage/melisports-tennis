import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCatalogAccessories, getCatalogRaquets } from '../redux/catalog/catalog'
import Hero from '../components/banner/Hero'

const Services = () => {
  const dispatch = useDispatch()
  const {racquets, accessories} = useSelector(state => state.catalog)
  useEffect(()=>{
    dispatch(getCatalogRaquets())
    dispatch(getCatalogAccessories())

  },[])
  console.log(accessories)

  return (
    <>

<Hero/>
  
  <div className='container catalog bg-theme p-top-5'>
 
    <div className='products-container color-white '>
      <div className='racquets'>
        {racquets.map(racquet => (
        <div className='flex flex-between seperator '>
          <div className=' p-img'>
            <img src={racquet.image} alt='' className='w-full'/>

          </div>
          <div className='flex-2 bg-'>
            <ul className='px-2'>
              <li>
          
                <h2 className='line-space px-1 spantara font-normal'>{racquet.name}</h2>
                <p className='color-white font-bold'>DESCRIPTION:</p>
                <p className='px-1 text-sm'>{racquet.description}</p>
                  <div className='p-top-05'>
                  <h2 className='color-white font-normal'> TECHNICAL CHARACTERISTICS </h2>
                    <ul className='characters px-1 grid grid-2 gap-1'>
                      
                    <li className=' border-t p-05 m-02'>
                      <div className='flex flex-between'>
                        <span className='xter text-sm'>Heade Size:</span>
                        <span className='xter-info text-sm'>645 cm² / 100 in²</span>
                      </div>
                    </li><li className=' border-t m-02 p-05'>
                      <div className='flex flex-between'>
                        <span className='xter text-sm'>Weight (unstrung):</span>
                        <span className='text-sm'>300 g +/- 7g / 10.6 oz</span>
                      </div>
                    </li><li className=' border-t m-02 p-05'>
                      <div className='flex flex-between'>
                        <span className='xter text-sm'>Swing Weight:</span>
                        <span className='text-sm'>290</span>
                      </div>
                    </li><li className=' border-t m-02 p-05'>
                      <div className='flex flex-between'>
                        <span className='xter text-sm'>Stiffness (RA):</span>
                        <span className='text-sm'>69 + / - 3</span>
                      </div>
                    </li><li className=' border-t m-02 p-05'>
                      <div className='flex flex-between'>
                        <span className='xter text-sm'>Composition:</span>
                        <span className='text-sm'>CARBON</span>
                      </div>
                    </li><li className=' border-t m-02 p-05'>
                      <div className='flex flex-between'>
                        <span className='xter text-sm'>Tension Recommended:</span>
                        <span className='text-sm'>  23-27 Kg²</span>
                      </div>
                    </li><li className=' border-t m-02 p-05'>
                      <div className='flex flex-between'>
                        <span className='xter text-sm'>Length:</span>
                        <span className='text-sm'>685 mm / 27 in</span>
                      </div>
                    </li><li className=' border-t m-02 p-05'>
                      <div className='flex flex-between'>
                        <span className='xter text-sm'>Recommended String:</span>
                        <span className='text-sm'>RPM Blast / RPM Rough</span>
                      </div>
                    </li>
                    <li className=' border-t m-02 p-05'>
                      <div className='flex flex-between'>
                        <span className='xter text-sm'>Recommended Grip:</span>
                        <span className='text-sm'>Syntec Pro</span>
                      </div>
                    </li>
                    </ul>
                    
                  </div>
                  <hr />
                  

              
              </li>
            </ul>
        </div>

      </div>)
      )}

      
      </div>
      <div className='accessories'>
        <h2 className='text-white'>Accessories</h2>
        {accessories.map(accessory => (
          <div className='flex flex-between seperator '>
          <div className=' p-img'>
            <img src={accessory.image} alt='' className='w-full'/>

          </div>
          <div className='flex-2 bg-'>
            <ul className='p-1'>
              <li>
                <h3 className='color-white'>Name</h3><p className='px-1 text-base'>{accessory.name}</p>
                <h2 className='color-white'>description:</h2>
                <p className='px-1 text-sm'>{accessory.description}</p>
                  <div className='p-top-05'>
                  <h2 className='color-white'> TECHNICAL CHARACTERISTICS </h2>
                    <ul className='characters px-1 grid grid-2 gap-1'>
                      
                    <li className=' border-t p-05 m-02'>
                      <div className='flex flex-between'>
                        <span className='xter text-sm'>Heade Size:</span>
                        <span className='xter-info text-sm'>645 cm² / 100 in²</span>
                      </div>
                    </li><li className=' border-t m-02 p-05'>
                      <div className='flex flex-between'>
                        <span className='xter text-sm'>Weight (unstrung):</span>
                        <span className='text-sm'>300 g +/- 7g / 10.6 oz</span>
                      </div>
                    </li><li className=' border-t m-02 p-05'>
                      <div className='flex flex-between'>
                        <span className='xter text-sm'>Swing Weight:</span>
                        <span className='text-sm'>290</span>
                      </div>
                    </li><li className=' border-t m-02 p-05'>
                      <div className='flex flex-between'>
                        <span className='xter text-sm'>Stiffness (RA):</span>
                        <span className='text-sm'>69 + / - 3</span>
                      </div>
                    </li><li className=' border-t m-02 p-05'>
                      <div className='flex flex-between'>
                        <span className='xter text-sm'>Composition:</span>
                        <span className='text-sm'>CARBON</span>
                      </div>
                    </li><li className=' border-t m-02 p-05'>
                      <div className='flex flex-between'>
                        <span className='xter text-sm'>Tension Recommended:</span>
                        <span className='text-sm'>  23-27 Kg²</span>
                      </div>
                    </li><li className=' border-t m-02 p-05'>
                      <div className='flex flex-between'>
                        <span className='xter text-sm'>Length:</span>
                        <span className='text-sm'>685 mm / 27 in</span>
                      </div>
                    </li><li className=' border-t m-02 p-05'>
                      <div className='flex flex-between'>
                        <span className='xter text-sm'>Recommended String:</span>
                        <span className='text-sm'>RPM Blast / RPM Rough</span>
                      </div>
                    </li><li className=' border-t m-02 p-05'>
                      <div className='flex flex-between'>
                        <span className='xter text-sm'>Recommended Grip:</span>
                        <span className='text-sm'>Syntec Pro</span>
                      </div>
                    </li>
                    </ul>
                    
                  </div>
                  <hr />
                  

              
              </li>
            </ul>
        </div>

      </div>
        ))}
      </div>
    </div>
        
    </div>
    </>
  )
}

export default Services