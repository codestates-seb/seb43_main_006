import styled from "styled-components";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./pages/Login/Login";
import SignupInput from "./pages/Signup/SignupInput";
import Likepage from "./pages/Mypage/likepage";
import Orderpage from "./pages/Mypage/orderpage";
import Payment from "./pages/Payment/Payment";
import Place from "./pages/Place";
import PaymentConfirm from "./pages/Payment/PaymentConfirm";
import Alcohol from "./pages/Alcohol";
import AlcoholDetail from "./pages/AlcoholDetail";
import Layout from "./layout/index";
import HelpCenter from "./pages/HelpCenter";
import SignupSelection from "./pages/Signup/SignupSelection";
import SignupTerm from "./pages/Signup/SignupTerm";
import FindEmail from "./pages/Login/FindEmail";
import FindPassword from "./pages/Login/FindPassword";
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
          <Route path="/signup/term" element={<SignupTerm />} />
          <Route path="/mypage/likepage" element={<Likepage />} />
          <Route path="/mypage/orderpage" element={<Orderpage />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/payment/confirm" element={<PaymentConfirm />} />
          <Route path="/place" element={<Place />} />
          <Route path="/helpcenter" element={<HelpCenter />} />
          <Route path="/signup" element={<SignupSelection />} />
          <Route path="/signup/input" element={<SignupInput />} />
          <Route path="/findemail/" element={<FindEmail />} />
          <Route path="/findpassword" element={<FindPassword />} />
        </Routes>
      </Layout>
    </BodyContainer>
  );
};

export default App;
