import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Home/Home.tsx';
import Cart from './Cart/Cart.tsx';
import Login from './Certification/Login.tsx';
import Signup from './Certification/Signup.js';//수정해야함
import Mypage from './Mypage/Mypage.tsx';
import Payment from './Payment/Payment.tsx';
import Place from './Place/Place.tsx';
import PaymentConfirm from './Payment/PaymentConfirm.tsx';
import Alcohol from './Alcohol/Alcohol.tsx';
import AlcoholDetail from './Alcohol/AlcoholDetail.tsx';

const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/*" element={<Home />} />
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
    </Routes>
  );
};

export default RoutesComponent;