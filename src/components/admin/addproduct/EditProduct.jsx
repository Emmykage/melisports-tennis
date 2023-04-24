import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { getGenders } from '../../../redux/actions/gender';
import { getLevels } from '../../../redux/actions/misc';
import { getProduct, updateProduct } from '../../../redux/actions/product';
import { getProductCategories } from '../../../redux/actions/product_category';
import baseURL from '../../../redux/baseURL';
const EditProduct = () => {
    const {editId} = useParams()

    const categories = useSelector((state) => state.product_categories.product_categories)

    const dispatch = useDispatch();
    // const product = useSelector((state)=> state.product.product)
    // const [product, setProduct] = useState([])
    const levels = useSelector((state) => state.level.levels)
    const genders = useSelector((state) => state.gender.genders)
    const [formInput, setFormInput] = useState({})
    // console.log(product)

//    const [formInput, setFormInput] = useState()
    useEffect(()=>{
        fetch(`${baseURL}products/${editId}`)
        .then(res => res.json()).then(json => setFormInput(json))
        dispatch(getProductCategories())
        dispatch(getLevels())
        dispatch(getGenders())
            
    }, [])

//     {
//         name: json.name,
//         price: json.price,
//         image: json.image,
//         level_id: json.level.id,
//         gender_id: json.gender.id,
//         sku: json.sku,
//         product_category_id: json.product_category.id,
//         grip_size: json.grip_size,
//         head_size: json.head_size,
//         rating: json.rating,
//         weight: json.weight,
//         length: json.length,
//         stiffness: json.stiffness,
//         composition: json.composition,
//         description: json.description
        
//   }

    // console.log(formInput.product_category.id)
   

    const handleFormInput = (e) =>{
        setFormInput({
            ...formInput,
            [e.target.name]: e.target.value
        })

    }
   
console.log(levels)
console.log(formInput)
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

        console.log(formInput)
     
       
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
                        value={formInput.price}
                        name="price"
                         onChange={handleFormInput}
                        type="number" />

                        </label>
                    </div>
                </div>
                <div className='form-row'>
                    <div className='input-half'>
                        <label htmlFor="">professionalism
                        <select placeholder='professionalism'
                        name="level_id"
                        value={formInput.level_id}
                        onChange={handleFormInput}>
                            {levels.map((level) =>(
                                <option value={level.id}>{level.stage}</option>
                        ))}
                        </select>
                    </label>
                    </div>
                    <div className='input-half'>
                    <label htmlFor="">Gender
                    <select placeholder='gender' 
                    name="gender_id" 
                    value={formInput.gender_id}
                    onChange={handleFormInput}>
                    {genders.map((gender) =>(
        <option value={gender.id}>{gender.name}</option>
    ))}
</select>
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
                    update product
                </button>
            </form>
     
    </div>
  )
}

export default EditProduct




// {
//     name: product.name,
//     price: product.price,
//     image: product.image,
//     sku: product.sku,
//     product_category_id: product.product_category_id,
//     grip_size: product.grip_size,
//     head_size: product.head_size,
//     rating: product.rating,
//     weight: product.weight,
//     length: product.length,
//     stiffness: product.stiffness,
//     composition: product.composition,
//     description: product.description
    
// }