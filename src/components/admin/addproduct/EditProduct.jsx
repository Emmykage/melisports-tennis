import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { getProduct, updateProduct } from '../../../redux/actions/product';
import { getProductCategories } from '../../../redux/actions/product_category';

const EditProduct = () => {
    const categories = useSelector((state) => state.product_categories.product_categories)

    const dispatch = useDispatch();
    const product = useSelector((state)=> state.product.product)
    const {editId} = useParams()
     console.log(product)
    const [formInput, setFormInput] = useState({
        name: product.name,
        price: product.price,
        image: product.image,
        sku: product.sku,
        product_category_id: product.product_category_id,
        grip_size: product.grip_size,
        head_size: product.head_size,
        rating: product.rating,
        weight: product.weight,
        length: product.length,
        stiffness: product.stiffness,
        composition: product.composition,
        description: product.description
        
    })
    useEffect(()=>{
        dispatch(getProduct(editId))
        dispatch(getProductCategories())
        setFormInput({
            ...formInput
        })
        
    }, [])
   
    const handleFormInput = (e) =>{
        setFormInput({
            ...formInput,
            [e.target.name]: e.target.value
        })

    }
   
    

    const handleSubmit = (e)=>{
        e.preventDefault();
        dispatch(updateProduct(formInput))
        setFormInput({
            name: '',
            price: "",
            image: '',
            sku: "",
            product_category_id: 1,
            grip_size: "",
            head_size: '',
            rating: "",
            weight: "",
            length: "",
            stiffness: "",
            composition: "",
            category: "",
            description: ""
            
    
        })
     
       
    }
  return (
    <div className='product-form admin'>
        
            <form onSubmit={handleSubmit}>
                <div className='form-row'>
                    <div className='input-half'>
                        <label> Product Name
                            <input 
                            value={formInput.name}
                            name="name"
                            onChange={handleFormInput}
                            type="text" />
                        </label>
                    </div>
                    <div className='input-half'>
                        <label> price
                        <input 
                        value={product.price}
                        name="price"
                         onChange={handleFormInput}
                        type="number" />

                        </label>
                    </div>
                </div>
                <div className='form-row'>
                    
                    <div className='input-half'>
                        <label htmlFor=""> head size
                        <input
                        name='head_size'
                        value={formInput.head_size}
                        onChange={handleFormInput} 
                        type="number"/>

                        </label>
                    </div>
                    <div className='input-half'>
                        <label htmlFor=""> grip size
                        <input
                        name='grip_size'
                        value={formInput.grip_size}
                        onChange={handleFormInput} 
                        type="text"/>

                        </label>
                    </div>
                
                </div>
              
                
                <div className="form-row">
                    <div className='input-half' >
                        <label htmlFor="" className="rating">
                            rating
                            <input
                            name='rating'
                            value={formInput.rating}
                            onChange={handleFormInput}
                             type="text" />

                        </label>
                    </div>
                    <div className='input-half'>
                        <label htmlFor=""> Length
                        <input
                        name="length"
                        value={formInput.length}
                        onChange={handleFormInput}
                         type="text"/>

                        </label>
                    </div>
                
                </div>

                <div className='form-row'>
                    <div className='input-half'>
                        <label htmlFor="">weight
                        <input
                        name='weight'
                        value={formInput.weight}
                        onChange={handleFormInput} 
                        type="text"/>

                        </label>
                    </div>
                    <div  className='input-half'>
                        <label htmlFor=""> Swing weight
                        <input 
                        name="swingWeight"
                        value={formInput.swingWeight}
                        onChange={handleFormInput}
                         type="text"  placeholder="swing weight"/>

                        </label>
                    </div>
                    <div  className='input-half'>
                        <label htmlFor="">Stiffness
                        <input
                        name='stiffness'
                        value={formInput.stiffness} 
                        onChange={handleFormInput}
                        type="text"  placeholder="stiffness"/>

                        </label>
                    </div>
                    <div>
                        <label htmlFor="">
                            composition
                            <input 
                            name='composition'

                            value={formInput.composition}
                            onChange={handleFormInput}
                            type="text"  placeholder="composition"/>

                        </label>
                    </div>

                </div>
                <div className='text-form-container'>
                    <label htmlFor="">Select product category

                    <select placeholder='product category'
                    value={formInput.product_category_id}
                    onChange={handleFormInput}>
                        {categories.map((category) =>(
                            <option value={category.id}>{category.name}</option>
                        ))}

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
                    
                    <input type="url"  
                    name='image'
                    onChange={handleFormInput}
                    value={formInput.image}
                    placeholder="image url"/>
                    </label>
                </div>
                 

                <div>
                    <label htmlFor=""> Description
                    <textarea
                     name="description" 
                     value={formInput.description}
                     onChange={handleFormInput}
                    ></textarea>

                    </label>
                </div>

                <button>
                    add product
                </button>
            </form>
     
    </div>
  )
}

export default EditProduct