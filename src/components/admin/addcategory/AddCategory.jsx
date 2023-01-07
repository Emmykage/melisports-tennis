import React, { useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { setModal } from '../../../redux/modal/categoryModal'

const AddCategory = () => {
    // const toggleModal = useSelector((state) => state.product_categories.toggleModal)
    // const dispatch = useDispatch();
//    const handleModal = () => {
//     dispatch(setModal())
//    }
  return (
    <div className={"category-modal modal-display admin" }>
        <div className='category-div'>
            <div className='close'>
            {/* <span className='close-icon' onClick={handleModal}>X</span> */}
            </div>
           
        <form>
                <div className='form-row'>
                    <div className='input-half'>
                        <label htmlFor=""> Category Name
                            <input  type="text" placeholder="product name"/>
                        </label>
                    </div>
                  
            
                
                </div>
              
                
                <div className="form-row">
                    <div >
                        <label htmlFor="">
                            Description
                            <textarea></textarea>
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