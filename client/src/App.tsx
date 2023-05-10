import styled from "styled-components";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Likepage from "./pages/Mypage/likepage";
import Buyend from "./pages/Mypage/buyend";
import Infochange from "./pages/Mypage/infochange";
import Notmember from "./pages/Mypage/notmember";
import Orderpage from "./pages/Mypage/orderpage";

import Payment from "./pages/Payment/Payment";
import Place from "./pages/Place";
import PaymentConfirm from "./pages/Payment/PaymentConfirm";
import Alcohol from "./pages/Alcohol";
import AlcoholDetail from "./pages/AlcoholDetail";
import Layout from "./layout/index";
import HelpCenter from "./pages/HelpCenter";

const BodyContainer = styled.div`
  min-height: 100vh;
  ${({ theme }) => theme.common.flexCol};
`;
//0509 22:12
const App = () => {
  return (
    <BodyContainer>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/alcohol" element={<Alcohol />} />
          <Route path="/alcohol/detail/:id" element={<AlcoholDetail />} />
          <Route path="/cart/" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/mypage/likepage" element={<Likepage />} />
          <Route path="/mypage/buyend" element={<Buyend />} />
          <Route path="/mypage/infochange" element={<Infochange />} />
          <Route path="/mypage/notmember" element={<Notmember />} />
          <Route path="/mypage/orderpage" element={<Orderpage />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/payment/confirm" element={<PaymentConfirm />} />
          <Route path="/place" element={<Place />} />
          <Route path="/helpcenter" element={<HelpCenter />} />
        </Routes>
      </Layout>
    </BodyContainer>
  );
};

export default App;
