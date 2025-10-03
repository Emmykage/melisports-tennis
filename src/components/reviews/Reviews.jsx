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
    <section className="px-4 py-16 bg-gradient-to-b from-white to-gray-50 my-12">
      <div className="max-w-6xl mx-auto text-center">
        {/* Heading */}
        <h3 className="text-3xl md:text-4xl font-medium text-gray-800 mb-6">
          Share Your Thoughts 💬
        </h3>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Help us improve the site by leaving your honest feedback.
          Your input means a lot to us!
        </p>

        {/* Rating + CTA */}
        <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-10">
          {/* Stars */}
          <div className="flex flex-wrap gap-2 items-center justify-center">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="text-yellow-400 text-2xl cursor-pointer hover:scale-110 transition-transform" />
            ))}
            <p className="text-lg font-medium text-gray-700 ml-2">Rate us</p>
          </div>

          {/* CTA */}
          <div className="flex items-center md:border-l md:pl-10 border-gray-300">
            <button className="bg-primary hover:bg-primary/90 rounded-lg font-medium text-white py-3 px-6 shadow-lg transition">
              Leave a Review
            </button>
          </div>
        </div>

        {/* Review Textarea */}
        <div className="my-10 max-w-3xl mx-auto">
          <textarea
            name="review"
            id="review"
            onChange={(e) => setReview({
              content: e.target.value,
            })}
            value={review.content}
            placeholder="Write your review here..."
            className="w-full h-52 p-5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary/60 focus:outline-none resize-none transition"
          />
        </div>

        {/* Messages */}
        <ErrorMessage error={error} loading={loading} message={message} />

        {/* Submit */}
        <Button
          loading={false}
          disabled={!review.content.trim()}
          btnFunc={() => {
            if (review.content.trim()) {
              dispatch(setLoader());
              dispatch(sendReview(review)).then((result) => {
                if (sendReview.fulfilled.match(result)) {
                  dispatch(closeLoader());
                  setReview({
                    content: '',
                  });
                } else {
                  dispatch(closeLoader());
                }
              });
            }
          }}
          className="bg-primary m-auto text-white font-medium py-3 px-6 rounded-lg shadow-md hover:bg-primary/90 transition"
        >
          Send Review
        </Button>
      </div>

      <LoaderModal />
    </section>

  );
};

export default Reviews;
