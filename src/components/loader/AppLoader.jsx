import Loader from '../../pages/Loader';

const AppLoader = ({ className }) => (
  <div className={`${className} h-40 mt-40`}>
    <Loader />
  </div>
);

export default AppLoader;
