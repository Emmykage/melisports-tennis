import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateCategory } from '../../redux/actions/product_category'
import EditCategories from './addcategory/EditCategories'
import { deleteCategory } from '../../redux/actions/product_category'
import { openDelModal } from '../../redux/modal/delModal'
import { openDelCatModal } from '../../redux/modal/catDelModal'

const Categories = () => {
  const {product_categories} = useSelector((state) => state.product_categories)
  const dispatch = useDispatch()
  const [toggleEdit, setToggleEdit] = useState(false)

  const [edit, setEdit] = useState({
    name: "",
    gender: "",
    description: ""
  })


  const handleEdit = (id) => {
    const category = product_categories.find((item) => item.id === id);
    setToggleEdit(true)
    setEdit({
        id: category.id,
        name: category.name,
        gender: category.gender,
        description: category.description
    })
    // console.log(id)
        // console.log(edit)


  }
  const handleFormInput=(e)=>{
   if(e.target.name === "description"){
       setEdit(
     
           {
           ...edit,
           [e.target.name]: e.target.value
       })
}else{
   setEdit(
     
       {
       ...edit,
       [e.target.name]: e.target.value.trim()
   })
}
   
}
const handleSubmit = (e) =>{
   e.preventDefault()
   setToggleEdit(false)
   dispatch(updateCategory({id: edit.id, data: {name: edit.name, type: edit.gender, description: edit.description}}))
//    console.log(edit)

}
const handleDelete = (id) => {
  console.log("hey")
  dispatch(openDelCatModal(id))
}
  return (
    <div className='cat-div'>
        <table>
            <thead>
              <tr>
                <th>categories</th>
                <th>description</th>
                <th>type</th>

              </tr>
            </thead>
            <tbody>
              {product_categories.map((category) =>(
                 <tr key={category.id}>
                 <td>{category.name}</td>
                 <td>{category.type}</td>
                 <td>{category.description}</td>
                 <td><a onClick={()=> handleDelete(category.id)}>del</a></td>
                 <td><a onClick={()=> handleEdit(category.id)}>edit</a></td>


               </tr>
              ))}
             

            </tbody>
        </table>
        <div className={toggleEdit? 'category-div ' : 'category-div edit-display'}>
            <EditCategories 
            handleSubmit={handleSubmit} 
            handleFormInput={handleFormInput} 
            edit={edit} />
            edit categories
        
        </div>

    </div>
  )
}

export default Categories