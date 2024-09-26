import React from 'react'
import survey from '../../assets/images/icons/survey.png'
const SurveyButton = () => {
  return (

    <section id='survey' className='px-4 my-4'>
        <div className='py-20 m-auto max-w-4xl text-center'>
    <img src={survey} alt='survey icon' className=' w-20 m-auto'/>
                <h3 className='text-lg my-8'>Take Out a minute to fill Our survey</h3>
                <a href="https://docs.google.com/forms/d/e/1FAIpQLScUbwSfyzAwo5o1QNjkmOJgc_ILcoIFzvglgLUmZg7n2r4xfA/viewform?pli=1" target="_blank" className='bg-primary text-white py-3 px-8 rounded-lg hover:bg-primary/80'>Survey</a>

            </div>  
    </section>
   
  )
}

export default SurveyButton