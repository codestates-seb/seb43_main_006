import styled from 'styled-components';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home.tsx';
import Cart from './pages/Cart.tsx';
import Login from './pages/Login.tsx';
import Signup from './pages/Signup.tsx';
import Mypage from './pages/Mypage.tsx';
import Payment from './pages/Payment/Payment.tsx';
import Place from './pages/Place.tsx';
import PaymentConfirm from './pages/Payment/PaymentConfirm.tsx';
import Alcohol from './pages/Alcohol.tsx';
import AlcoholDetail from './pages/AlcoholDetail.tsx';
import Layout from './layout/index.tsx';
import HelpCenter from './pages/HelpCenter.tsx';

const BodyContainer = styled.body`
  min-height: 100vh;
  ${({ theme }) => theme.common.flexCenterCol};
`;

const App = () => {
  return (
    <BodyContainer>
      <button>asdf</button>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/alcohol" element={<Alcohol />} />
          <Route path="/alcohol/detail/:id" element={<AlcoholDetail />} />
          <Route path="/cart/" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/mypage/" element={<Mypage />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/payment/confirm" element={<PaymentConfirm />} />
          <Route path="/place" element={<Place />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/helpcenter" element={<HelpCenter />} />
        </Routes>
      </Layout>
    </BodyContainer>
  );
};

export default App;
