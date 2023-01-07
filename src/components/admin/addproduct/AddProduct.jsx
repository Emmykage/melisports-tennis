import React from 'react'

const AddProduct = () => {
  return (
    <div className='product-form'>
        
            <form>
                <div className='form-row'>
                    <div className='input-half'>
                        <label> Product Name
                            <input  type="text" placeholder="product name"/>
                        </label>
                    </div>
                    <div className='input-half'>
                        <label> Model
                        <input type="text" placeholder="model"/>
  
                        </label>
                    </div>
                </div>
                <div className='form-row'>
                    <div className='input-half'>
                        <label> price
                        <input type="number" placeholder='price'/>

                        </label>
                    </div>
                    <div className='input-half'>
                        <label htmlFor=""> grip size
                        <input type="number" placeholder='grip size'/>

                        </label>
                    </div>
                
                </div>
              
                
                <div className="form-row">
                    <div className='input-half' >
                        <label htmlFor="" className="rating">
                            ratin
                            <input type="text" value="645" />

                        </label>
                    </div>
                    <div className='input-half'>
                        <label htmlFor=""> Length
                        <input type="text"   placeholder="lenght"/>

                        </label>
                    </div>
                
                </div>

                <div className='form-row'>
                    <div className='input-half'>
                        <label htmlFor="">weight
                        <input type="text"  placeholder="weight"/>

                        </label>
                    </div>
                    <div  className='input-half'>
                        <label htmlFor=""> Swing weight
                        <input type="text"  placeholder="swing weight"/>

                        </label>
                    </div>
                    <div  className='input-half'>
                        <label htmlFor="">Stiffness
                        <input type="text"  placeholder="stiffness"/>

                        </label>
                    </div>
                    <div>
                        <label htmlFor="">
                            composition
                            <input type="text"  placeholder="composition"/>

                        </label>
                    </div>

                </div>
                <div className='text-form-container'>
                    <label htmlFor="">Select product category

                    <select placeholder='product category'>
                        <option>Rackets</option>
                        <option>Shoes</option>
                        <option>Shoes</option>
                        <option>Shoes</option>
                        <option>Shoes</option>

                    </select>
                    </label>
                </div>


               


                <div>
                    <label htmlFor="">
                        strung/unstrung
                    
                    <input type="text"  placeholder="strung"/>
                    </label>
                </div>
                <div>
                    <label htmlFor="">
                        Image 1
                    
                    <input type="url"  placeholder="strung"/>
                    </label>
                </div>
                <div>
                    <label htmlFor="">
                        Image 1
                    
                    <input type="url"  placeholder="strung"/>
                    </label>
                </div>
                <div>
                    <label htmlFor="">
                        Image 2
                    
                    <input type="url"  placeholder="strung"/>
                    </label>
                </div>
                <div>
                    <label htmlFor="">
                        Image 3
                    
                    <input type="url"  placeholder="strung"/>
                    </label>
                </div>
                <div>
                    <label htmlFor="">
                        Image 4
                    
                    <input type="url"  placeholder="strung"/>
                    </label>
                </div>

                <div>
                    <label htmlFor=""> Description
                    <textarea placeholder='Enter description'></textarea>

                    </label>
                </div>

                <div>
                    <label htmlFor=""> Description
                    <textarea placeholder='Enter description'></textarea>

                    </label>
                </div>
                <button>
                    add product
                </button>
            </form>
     
    </div>
  )
}

export default AddProduct