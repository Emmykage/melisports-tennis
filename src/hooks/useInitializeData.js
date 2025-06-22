import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userProfile } from '../redux/actions/auth';

const useInitializeData = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();


  console.log("fetch user from hooks",  user)
  useEffect(() => {
    dispatch(userProfile());
  }, []);
};

export default useInitializeData;
