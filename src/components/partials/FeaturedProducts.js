import React from 'react'
import './style.css'

const FeaturedProducts = (props) => {
    const {id, name, image} = props
  return (
    <div className='feature-grid'>
        <div>
            <img src={image} />
        </div>
        <div className='center'>
            <h4> {name}</h4>
        </div>
    </div>
  )
}

export default FeaturedProducts