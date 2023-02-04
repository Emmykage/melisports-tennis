import React from 'react'

const SignUp = () => {
  return (
    <div>
        <div className='form-cont'>
            <form>
                <div>
                    <label htmlFor="username">
                        <input type="text" />
                    </label>
                
                </div>
                <div>
                    <label htmlFor="email">
                        <input type="text" />
                    </label>
                </div>
                <div>
                    <label htmlFor="email">
                        <input type="number" />
                    </label>
                </div>
                <div>
                    <label htmlFor="password">
                        <input type="password" />
                    </label>
                </div>
            </form>
        </div>
    </div>
  )
}

export default SignUp