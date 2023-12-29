import React from 'react'

const Apparels = ({apparel}) => {
  return (
    <div className='flex flex-between seperator service-table '>
    <div className=' p-img'>
      <img src={apparel.image} alt='' className='w-full h-full'/>

    </div>
    <div className='flex-2 bg- relative overflow-hidden pb-4'>
      <div className='px-2 block'>
        <div>
    
          <h2 className='line-space px-1 spantara font-normal'>{apparel.name}</h2>
          <h2 className='color-white font-light description'>DESCRIPTION:</h2>
          <p className='px-1 text-sm text-white' >{apparel.description}</p>
            <div className='p-top-05'>
            <h2 className='color-white font-normal technical'> TECHNICAL CHARACTERISTICS </h2>
              <ul className='characters-col px-1  gap-1 '>
                
              <li className=' border-t p-05 m-02'>
                <div className='flex flex-between'>
                  <span className='xter text-sm'>Content:</span>
                  <span className='xter-info text-sm'>{apparel.content}</span>
                </div>
              </li>

              <li className=' border-t p-05 m-02'>
                <div className='flex flex-between'>
                  <span className='xter text-sm flex-1'>Colors:</span>
                  <div className='bg- flex-1 flex flex-between gap-1'>

                 
                  {apparel.colors.map(color => (

                  <span className='xter-info text-sm'>{color}</span>

                  ))}
                   </div>
                </div>
              </li>
              
              </ul>
              
            </div>
            <hr />
            

        
        </div>
        {/* <div className={`product-overlay ${toggle}`}>
        
        <div className="close-btn"><a className="border-white close btn px-4 py-1 block m-auto text-white" onClick={()=> setToggle("none")}>close</a></div>
      </div> */}
      </div>
      {/* <div className='flex row px-2 justify-between items-center'>
        <span className='series-btn border' onClick={()=> setToggle('show')}>View Series</span>
      <div className='whatsapp'>
        <a className='block' aria-label="Chat on WhatsApp" target='_blank' href={`https://wa.me/+2347038723093?text=I'm%20interested%20in%20the%20${apparel.name}%20racquet`}> 
        <img alt="Chat on WhatsApp" src={whatsap} /></a>


      </div>

      </div>  */}
     
      
    </div>
 

</div>
  )
}

export default Apparels