import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addProductCategory } from '../../../redux/actions/product_category'

const AddCategory = () => {
    const dispatch = useDispatch()
   const [formData, setFormData] = useState({
    name: '',
    gender: '',
    description: ""
   })
   const handleFormInput=(e)=>{
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    })
}
const handleSubmit = (e) =>{
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
                            onChange={handleFormInput} 
                            type="text" placeholder="Product category"/>
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
                            onChange={handleFormInput}
                            ></textarea>
                          </label>
                    </div>
                
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