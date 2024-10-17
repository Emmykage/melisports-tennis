import React from 'react'

const Button = ({children, btnFunc, type}) => {
  return (
    <button onClick={btnFunc} className={`font-semibold border-4 items-center block  w-max  py-2 px-5 border-theme bg-light hover:bg-theme-dark hover:text-light ${type == "cancel" ? "text-red-500" : ""}`}>

        {children}
    </button>
  )
}

export default Button