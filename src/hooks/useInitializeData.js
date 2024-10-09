import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { userProfile } from "../redux/actions/auth"

const useInitializeData = () => {
    const dispatch = useDispatch()

    useEffect(()=> {
        dispatch(userProfile())

    },[])


    console.log("data initializer")

}

export default useInitializeData