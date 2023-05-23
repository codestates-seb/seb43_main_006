import styled from "styled-components";
import { Route, Routes } from "react-router-dom";

//Pages
import Home from "@pages/Home";
import Cart from "@pages/Cart";
import Place from "@pages/Place";
import Alcohol from "@pages/Alcohol";
import HelpCenter from "@pages/HelpCenter";
import AlcoholDetail from "@pages/AlcoholDetail";
import Login from "@Loginpages/Login";
import FindEmail from "@Loginpages/FindEmail";
import FindPassword from "@Loginpages/FindPassword";
import SignupInput from "@Signuppages/SignupInput";
import SignupSelection from "@Signuppages/SignupSelection";
import SignupTerm from "@Signuppages/SignupTerm";
import Likepage from "@Mypagepages/likepage";
import Orderpage from "@Mypagepages/orderpage";
import Changeinfopage from "@Mypagepages/changeinfo";
import Payment from "@Paymentpages/Payment";
import PaymentConfirm from "@Paymentpages/PaymentConfirm";
import FailPage from "@Paymentpages/Fail";
import Checkout from "@Paymentpages/Checkout";
import CheckoutChang from "@pages/Payment/CheckoutChang";
import ChatComponent from "@components/Chat/ChatComponent";
import Layout from "@layout/index";

const BodyContainer = styled.div`
  min-height: 100vh;
  ${({ theme }) => theme.common.flexCol};
`;

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
          <Route path="/signup/term" element={<SignupTerm />} />
          <Route path="/mypage/likepage" element={<Likepage />} />
          <Route path="/mypage/orderpage" element={<Orderpage />} />
          <Route path="/mypage/changeinfo" element={<Changeinfopage />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkoutChang" element={<CheckoutChang />} />
          <Route path="/paymentconfirm" element={<PaymentConfirm />} />
          <Route path="/fail" element={<FailPage />} />
          <Route path="/place" element={<Place />} />
          <Route path="/helpcenter" element={<HelpCenter />} />
          <Route path="/signup" element={<SignupSelection />} />
          <Route path="/signup/input" element={<SignupInput />} />
          <Route path="/findemail/" element={<FindEmail />} />
          <Route path="/findpassword" element={<FindPassword />} />
        </Routes>
        <ChatComponent />
      </Layout>
    </BodyContainer>
  );
};

export default App;
