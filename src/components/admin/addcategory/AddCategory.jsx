import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addProductCategory } from '../../../redux/actions/product_category'

const AddCategory = () => {
    const dispatch = useDispatch()
   const [formData, setFormData] = useState({
    name: '',
    description: ""
   })
   const handleFormInput=(e)=>{
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    })
}
const handleSubmit = () =>{
    e.preventDefault()
    dispatch(addProductCategory(formData))
    console.log(formData)

}
  return (
    <div className={"category-modal modal-display admin" }>
        <div className='category-div'>
            <div className='close'>
            </div>
           
        <form onSubmit={handleSubmit}>
                <div className='form-row'>
                    <div className='input-half'>
                        <label htmlFor=""> Category Name
                            <input 
                            name='name'
                            value={formData.name}  
                            onClick={handleFormInput} 
                            type="text" placeholder="product name"/>
                        </label>
                    </div>
                  
            
                
                </div>
              
                
                <div className="form-row">
                    <div >
                        <label htmlFor="">
                            Description
                            <textarea
                            name='description'
                            value={formData.description}
                            onClick={handleFormInput}
                            ></textarea>
                          </label>
                    </div>
                
                </div>

                
              


               


                <div>
                    <label htmlFor="">
                        strung/unstrung
                    
                    <input type="text"  placeholder="strung"/>
                    </label>
                </div>
               
                <button>
                    add product
                </button>
            </form>

        </div>
        
    </div>
  )
}

export default AddCategory