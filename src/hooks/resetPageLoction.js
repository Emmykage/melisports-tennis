import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useResetPageLoction = () => {
  const { pathname } = useLocation();

  console.log(pathname)

  useEffect(() => {
    console.log("scroll reste triggered")
    window.scrollTo(0, 0);
  }, [pathname]);
};

export default useResetPageLoction;
