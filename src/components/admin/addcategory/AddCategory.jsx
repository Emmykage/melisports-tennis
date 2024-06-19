import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProductCategory } from '../../../redux/actions/product_category';
import strung from '../../mock/Strung';
import { resetProduct } from '../../../redux/product/product';

const AddCategory = () => {
  const dispatch = useDispatch();
  const formRef = useRef(null);

  const { loading, status, report } = useSelector((state) => state.product_categories);
  const [formData, setFormData] = useState({
    name: '',
    level: '',
    description: '',
  });
  const handleFormInput = (e) => {
    if (e.target.name === 'description') {
      setFormData(

        {
          ...formData,
          [e.target.name]: e.target.value,
        },
      );
    } else {
      setFormData(

        {
          ...formData,
          [e.target.name]: e.target.value.trim(),
        },
      );
    }
  };

  useEffect(() => {
    const element = formRef.current;
    if (status === 'success') {
      element.reset();

      const timeOutOp = setTimeout(() => {
        dispatch(resetProduct());
      }, 5000);

      return () => { clearTimeout(timeOutOp); };
    }
  }, [status]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addProductCategory(formData));
  };
  return (
    <div className="category-modal modal-display admin">
      <div className="category-div">
        <div className="close" />

        <form onSubmit={handleSubmit} ref={formRef}>
          <div className="form-row">
            <div className="input-half">
              <label htmlFor="">
                {' '}
                Category Name
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleFormInput}
                  type="text"
                  placeholder="Product category"
                />
              </label>
            </div>

          </div>
          <div className="form-row">
            <div className="input-half">
              <label htmlFor="">
                {' '}
                Category type
                <input
                  name="level"
                  value={formData.level}
                  onChange={handleFormInput}
                  type="text"
                  placeholder="Product category"
                />
              </label>
            </div>

          </div>

          <div className="form-row">
            <div>
              <label htmlFor="">
                Description
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleFormInput}
                />
              </label>
            </div>

          </div>

          <button className="btn">
            add category
          </button>
          {loading ? (
            <p className="normal">
              {' '}
              {report}
            </p>
          ) : (status == 'success' ? (
            <p className="green">
              {' '}
              {report}
            </p>
          ) : (
            <p className="red">
              {' '}
              {report}
            </p>
          )) }

        </form>

      </div>

    </div>
  );
};

export default AddCategory;
