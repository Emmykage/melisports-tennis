import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../buttons/Button';
import { sendReview } from '../../redux/actions/review';
import LoaderModal from '../loader/Loader';
import { closeLoader, setLoader } from '../../redux/app/app';
import ErrorMessage from '../error-message/ErrorMessage';

const Reviews = () => {
  const [review, setReview] = useState({
    content: '',
  });

  const dispatch = useDispatch();

  const { message, loading, error } = useSelector((state) => state.reviews);
  return (
    <section className="px-4 py-10 bg-white my-10">

      <div className="max-w-7xl m-auto">

        <h3 className="py-1 text-3xl font-normal text-center">Write us a review to help inprove the site</h3>

        <div className="max-w-3xl py-10 m-auto gap-10 justify-center flex-col md:flex-row flex items-center">

          <div className="flex flex-wrap flex-1 gap-3 items-center justify-center">
            {' '}
            <FaStar className="text-primary" />
            <FaStar className="text-primary" />
            <FaStar className="text-primary" />
            <FaStar className="text-primary" />
            <FaStar className="text-primary" />
            {' '}
            <p className="text-lg font-medium"> help improve our site</p>
          </div>

          <div className="flex md:border-l-2  md:pl-10 flex-1 justify-center border-gray-900">
            <button className="bg-primary hover:bg-primary/80 rounded font-medium text-white py-2 px-2">Leave a review</button>
          </div>
        </div>

        <div className="my-10">

          <textarea
            name="review"
            id="review"
            onChange={(e) => setReview({
              content: e.target.value,
            })}
            value={review.content}
            className="w-full h-60 p-6 border border-theme rounded"
          />
        </div>

        <ErrorMessage error={error} loading={loading} message={message} />

        <Button
          loading={false}
          disabled={!review.content.trim()}
          btnFunc={() => {
            if (review.content.trim()) {
              dispatch(setLoader());
              dispatch(sendReview(review)).then(
                (result) => {
                  if (sendReview.fulfilled.match(result)) {
                    dispatch(closeLoader());
                    setReview({
                      content: '',
                    });
                  } else {
                    dispatch(closeLoader());
                  }
                },
              );
            }
          }}
        >
          {' '}
          Send
        </Button>
      </div>

      <LoaderModal />
    </section>
  );
};

export default Reviews;
