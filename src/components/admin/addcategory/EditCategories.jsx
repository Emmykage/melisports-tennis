import React from 'react';
import { useSelector } from 'react-redux';

const EditCategories = (props) => {
  const { status, loading, report } = useSelector((state) => state.categories);
  const { handleSubmit, edit, handleFormInput } = props;
  return (
    <div>
      <div>
        <div className="close" />

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="input-full">
              <label htmlFor="">
                {' '}
                Category Name
                </label>
                <input
                  name="name"
                  value={edit.name}
                  onChange={handleFormInput}
                  type="text"
                  placeholder="Product category"
                />
            
            </div>

          </div>
          <div className="form-row">
            <div className="input-full">
              <label htmlFor="">
                {' '}
                Category type
                </label>
                <input
                  name="level"
                  value={edit.level}
                  onChange={handleFormInput}
                  type="text"
                  placeholder="Product category"
                />
             
            </div>

          </div>

          <div className="form-row">
            <div className='input-full'>
              <label htmlFor="description">
                Description
                </label>
                <textarea
                  name="description"
                  value={edit.description}
                  onChange={handleFormInput}
                />
             
            </div>

          </div>

          <button className="btn">
            Update
          </button>
        </form>
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

      </div>
    </div>
  );
};

export default EditCategories;
