import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userProfile } from "../redux/actions/auth";

const useInitializeData = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userProfile());
  }, []);
};

export default useInitializeData;
