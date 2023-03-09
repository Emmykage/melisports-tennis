import React from 'react'

const EditCategories = (props) => {
    const {handleSubmit, edit, handleFormInput} = props
  return (
    <div>
        <div >
            <div className='close'>
            </div>
           
        <form onSubmit={handleSubmit}>
                <div className='form-row'>
                    <div className='input-half'>
                        <label htmlFor=""> Category Name
                            <input 
                            name='name'
                            value={edit.name}  
                            onChange={handleFormInput} 
                            type="text" placeholder="Product category"/>
                        </label>
                    </div>
                  
                </div>
                <div className='form-row'>
                    <div className='input-half'>
                        <label htmlFor=""> Category type
                            <input 
                            name='level'
                            value={edit.level}  
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
                            value={edit.description}
                            onChange={handleFormInput}
                            ></textarea>
                          </label>
                    </div>
                
                </div>

                
                <button>
                    Update
                </button>
            </form>

        </div>
    </div>
  )
}

export default EditCategories