import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';

const resetPageLoction = () => {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
  
}

export default resetPageLoction