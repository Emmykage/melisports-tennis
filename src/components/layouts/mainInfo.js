import { useSelector } from 'react-redux';
import Footer from '../footer/Footer';
import Modal from '../modal/Modal';
import ChatBox from '../sideNav/ChatBox';
import MobileFooter from '../footer/mobile_footer';
import FooterInfo from '../footer-info/FooterInfo';
import Header from '../header/Header';

const MainInfoLayout = ({ children }) => {
  const { isOpen } = useSelector((state) => state.modal);

  return (

    <div className="relative h-screen  overflow-y-auto main">
          <Header store={false} />

      {isOpen && <Modal />}
      {children}
      <FooterInfo />

      <Footer />
      <ChatBox />
      <MobileFooter />

    </div>
  );
};

export default MainInfoLayout;
