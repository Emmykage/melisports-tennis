import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userProfile } from '../redux/actions/auth';

const useInitializeData = () => {
  const {  user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userProfile());
  }, []);

  console.log(user, 'data initializer');
};

export default useInitializeData;
