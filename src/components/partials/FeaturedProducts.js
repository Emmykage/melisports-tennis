import React from 'react'

const FeaturedProducts = (props) => {
    const [id, name, image] = props
  return (
    <div>
        <div>
            <img src={image} />
        </div>
        <div>
            <h4> {name}</h4>
        </div>
    </div>
  )
}

export default FeaturedProducts