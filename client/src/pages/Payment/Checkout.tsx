import { useEffect, useRef } from "react";
import { PaymentWidgetInstance, loadPaymentWidget } from "@tosspayments/payment-widget-sdk";
import { nanoid } from "nanoid";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { ItemOrder } from "../../types/AlcholInterfaces";

const clientKey = "test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq";
const customerKey = "YbX2HuSlsC9uVJW6NMRMj";

export default function Checkout() {
  const paymentWidgetRef = useRef<PaymentWidgetInstance | null>(null);
  const paymentMethodsWidgetRef = useRef<ReturnType<PaymentWidgetInstance["renderPaymentMethods"]> | null>(null);
  // const [price, setPrice] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();
  const items = location.state ? location.state.items : [];
  const user = location.state ? location.state.user : [];

  const { totalPrice } = items.reduce(
    (acc: { totalquantity: number; totalPrice: number }, item: ItemOrder) => {
      acc.totalquantity += item.quantity;
      acc.totalPrice += item.price * item.quantity;
      return acc;
    },
    { totalquantity: 0, totalPrice: 0 },
  );

  useEffect(() => {
    (async () => {
      const paymentWidget = await loadPaymentWidget(clientKey, customerKey);

      const paymentMethodsWidget = paymentWidget.renderPaymentMethods("#payment-widget", totalPrice);

      paymentWidgetRef.current = paymentWidget;
      paymentMethodsWidgetRef.current = paymentMethodsWidget;
    })();
  }, []);

  useEffect(() => {
    const paymentMethodsWidget = paymentMethodsWidgetRef.current;

    if (paymentMethodsWidget == null) {
      return;
    }

    paymentMethodsWidget.updateAmount(totalPrice, paymentMethodsWidget.UPDATE_REASON.COUPON);
  }, [totalPrice]);

  return (
    <Container>
      <CheckoutBox>
        <Title>주문서</Title>
        <Price>{`${totalPrice.toLocaleString()}원`}</Price>
        <PaymentWidgetWrapper id="payment-widget" />
        <div className="bt">
          <PayButton onClick={() => navigate(-1)}>취소하기</PayButton>
          <PayButton
            onClick={async () => {
              const paymentWidget = paymentWidgetRef.current;

              try {
                await paymentWidget?.requestPayment({
                  orderId: nanoid(),
                  orderName: user.id,
                  customerName: user.name,
                  customerEmail: user.email,
                  successUrl: `${window.location.origin}/paymentconfirm`,
                  failUrl: `${window.location.origin}/fail`,
                });
              } catch (error) {
                // handle error
              }
            }}
          >
            결제하기
          </PayButton>
        </div>
      </CheckoutBox>
    </Container>
  );
}
const Container = styled.div`
  padding: 1rem;
  z-index: 2;
  ${({ theme }) => theme.common.flexCenterCol};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  /* background-color: white; */
  border: 1px solid gray;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 20px 20px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 1px 1px, rgba(0, 0, 0, 0.09) 0px -2px 3px;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 5rem;
`;

const Price = styled.span`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const PaymentWidgetWrapper = styled.div`
  margin-bottom: 1rem;
  width: 100%;
  height: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PayButton = styled.button`
  background-color: #00b894;
  color: #fff;
  font-size: 1.2rem;
  border: none;
  border-radius: 0.3rem;
  cursor: pointer;
`;

const CheckoutBox = styled.div`
  ${({ theme }) => theme.common.flexCenterCol};
  flex-direction: column;
  background-color: white;
  border-radius: 10px;
  width: 600px;
  height: 720px;
  padding: 15px;
  .bt {
    width: 90%;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
`;
