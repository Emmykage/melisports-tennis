import React from 'react'
import Loader from '../../pages/Loader'
import { useSelector } from 'react-redux'

const LoaderModal = () => {

    const {isLoader} = useSelector(state => state.app)

    const show = "flex fixed top-0 left-0  bg-gray-800/60 justify-center items-center  z-[100] h-screen w-screen"
    const hidden = "hidden"
  return (
    <div className={`${isLoader ? show : hidden}`}>
        <Loader/>
    </div>
  )
}

export default LoaderModal