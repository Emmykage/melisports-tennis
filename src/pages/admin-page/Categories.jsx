import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateCategory } from '../../redux/actions/product_category';
import EditCategories from './addcategory/EditCategories';
import { openDelCatModal } from '../../redux/modal/catDelModal';

const Categories = () => {
  const { product_categories } = useSelector((state) => state.product_categories);
  const dispatch = useDispatch();
  const [toggleEdit, setToggleEdit] = useState(false);

  const [edit, setEdit] = useState({
    name: '',
    level: '',
    description: '',
  });

  const handleEdit = (id) => {
    const category = product_categories.find((item) => item.id === id);
    setToggleEdit(true);
    setEdit({
      id: category.id,
      name: category.name,
      level: category.level,
      description: category.description,
    });
  };
  const handleFormInput = (e) => {
    if (e.target.name === 'description') {
      setEdit(

        {
          ...edit,
          [e.target.name]: e.target.value,
        },
      );
    } else {
      setEdit(

        {
          ...edit,
          [e.target.name]: e.target.value.trim(),
        },
      );
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setToggleEdit(false);
    dispatch(updateCategory({ id: edit.id, data: { name: edit.name, level: edit.level, description: edit.description } }));
  };
  const handleDelete = (id) => {
    dispatch(openDelCatModal(id));
  };
  return (
    <div className="px-4 sm:px-6 lg:px-8 hover:border-gray-900 overflow-y-auto">
      <div className="mt-4 flow-root">
        <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle">
            <table className="min-w-full bg-white border border-gray-200 rounded-md border-separate border-spacing-0 table-auto overflow-x-scroll">
              <thead>
                <tr>
                  <th scope="col" className="sticky top-0 z-10 border-b border-gray-200/50 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-xs font-semibold text-gray-600 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8">categories</th>
                  <th scope="col" className="sticky top-0 z-10 border-b border-gray-200/50 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-xs font-semibold text-gray-600 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8">description</th>
                  <th scope="col" className="sticky top-0 z-10 border-b border-gray-200/50 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-xs font-semibold text-gray-600 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8" />
                  <th scope="col" className="sticky top-0 z-10 border-b border-gray-200/50 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-xs font-semibold text-gray-600 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8" />

                </tr>
              </thead>
              <tbody className='class="min-w-full bg-white border border-gray-200 rounded-md border-separate border-spacing-0 table-auto overflow-hidden"'>
                {product_categories.map((category) => (
                  <tr key={category.id}>
                    <td className="whitespace-nowrap border-b border-gray-200 hidden px-3 py-4 text-sm text-gray-900 font-normal sm:table-cell">{category.name}</td>
                    <td className="whitespace-nowrap border-b border-gray-200 hidden px-3 py-4 text-sm text-gray-900 font-normal sm:table-cell capitalize">
                      {category?.description?.substring(0, 103)}
                      ...
                    </td>
                    <td className="whitespace-nowrap border-b border-gray-200 hidden px-3 py-4 text-sm text-gray-900 font-normal sm:table-cell capitalize"><a className="btn py-1 px-4 text-sm" onClick={() => handleDelete(category.id)}>del</a></td>
                    <td className="whitespace-nowrap border-b border-gray-200 hidden px-3 py-4 text-sm text-gray-900 font-normal sm:table-cell capitalize"><a className="btn py-1 px-4 text-sm" onClick={() => handleEdit(category.id)}>edit</a></td>

                  </tr>
                ))}

              </tbody>
            </table>

          </div>
        </div>
      </div>

      <div className={toggleEdit ? 'category-div ' : 'category-div edit-display'}>
        <EditCategories
          handleSubmit={handleSubmit}
          handleFormInput={handleFormInput}
          edit={edit}
        />
        edit categories

      </div>

    </div>
  );
};

export default Categories;
