import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addProduct } from '../../../redux/actions/product';

const AddProduct = () => {
    const [formInput, setFormInput] = useState({
        name: 'yankee',
        // model: "",
        price: 23,
        image: '',
        sku: "",
        product_category_id: 1,
        // gripSize: "",
        // rating: "",
        // weight: "",
        // length: "",
        // stiffness: "",
        // composition: "",
        // category: "",
        description: "hey get the best here"
        


    })
    const dispatch = useDispatch();
    const handleFormInput = (e) =>{
        setFormInput({
            ...formInput,
            [e.target.name]: e.target.value
        })

    }
    // const [name, setName] = useState('');
    // const [model, setModel] = useState("");
    // const [price, setPrice] = useState('');
    // const [gripSize, setgripSize] = useState('');
    // const [rating, setRating] = useState('');
    // const [length, setLength] = useState('');
    // const [weight, setWeight] = useState('');
    // const [stiffness, setStiffness] = useState('');
    // const [composition, setComposition] = useState('');
    // const [category, setCategory] = useState("Racket")

    const handleSubmit = (e)=>{
        e.preventDefault();
        dispatch(addProduct(formInput))

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
                            type="text" placeholder="product name"/>
                        </label>
                    </div>
                    <div className='input-half'>
                        <label> Model
                        <input
                        value={ formInput.model}
                        name="model"
                         onChange={handleFormInput}
                        type="text" placeholder="model"/>
  
                        </label>
                    </div>
                </div>
                <div className='form-row'>
                    <div className='input-half'>
                        <label> price
                        <input 
                        value={formInput.price}
                        name="price"
                         onChange={handleFormInput}
                        type="number" placeholder='price'/>

                        </label>
                    </div>
                    <div className='input-half'>
                        <label htmlFor=""> grip size
                        <input
                        name='gripSize'
                        value={formInput.gripSize}
                        onChange={handleFormInput} 
                        type="number" placeholder='grip size'/>

                        </label>
                    </div>
                
                </div>
              
                
                <div className="form-row">
                    <div className='input-half' >
                        <label htmlFor="" className="rating">
                            ratin
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
                        value={formInput.length}
                        onChange={handleFormInput}
                         type="text"   placeholder="lenght"/>

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
                        type="text"  placeholder="weight"/>

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
                        name='Stiffness'
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
                    value={formInput.category}
                    onChange={handleFormInput}>
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
                     onChange={handleFormInput}
                     placeholder='Enter description'></textarea>

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