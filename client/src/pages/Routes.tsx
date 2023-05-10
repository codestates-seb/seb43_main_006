import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Home/Home';
import Cart from './Cart/Cart';
import Login from './Certification/Login';
import Signup from './Certification/Signup';
import Mypage from './Mypage/Mypage';
import Payment from './Payment/Payment';
import Place from './Place/Place';
import PaymentConfirm from './Payment/PaymentConfirm';
import Alcohol from './Alcohol/Alcohol';
import AlcoholDetail from './Alcohol/AlcoholDetail';

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