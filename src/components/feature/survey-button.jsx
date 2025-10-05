import React from 'react';
import survey from '../../assets/images/icons/survey.png';

const SurveyButton = () => (

  <section id="survey" className="px-6 my-12 max-w-7xl mx-auto">
    <div className="py-16 mx-auto  text-center bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg">
      {/* Icon */}
      <div className="flex justify-center">
        <img
          src={survey}
          alt="survey icon"
          className="w-20 mb-6 animate-bounce-slow"
        />
      </div>

      {/* Heading */}
      <h3 className="text-2xl md:text-3xl font-medium text-gray-800 tracking-wide mb-6">
        Take a Minute to Fill Out Our Survey
      </h3>
      <p className="text-gray-600 mb-10 max-w-lg mx-auto">
        Your feedback helps us improve and serve you better. It won’t take more
        than a minute!
      </p>

      {/* CTA */}
      <a
        href="https://docs.google.com/forms/d/e/1FAIpQLScUbwSfyzAwo5o1QNjkmOJgc_ILcoIFzvglgLUmZg7n2r4xfA/viewform?pli=1"
        target="_blank"
        rel="noreferrer"
        className="inline-block bg-primary text-white font-medium py-3 px-8 rounded-lg shadow-md hover:bg-primary/90 hover:scale-105 transform transition"
      >
        Start Survey
      </a>
    </div>
  </section>

);

export default SurveyButton;
