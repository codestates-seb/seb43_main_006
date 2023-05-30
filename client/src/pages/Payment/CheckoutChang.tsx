import { loadTossPayments } from "@tosspayments/payment-sdk";
import { nanoid } from "nanoid";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ItemOrder } from "../../types/AlcholInterfaces";
import { useNavigate } from "react-router-dom";

const clientKey = "test_ck_4vZnjEJeQVxQPQONwmMrPmOoBN0k";

function authTokenExpired(authToken: string) {
  if (!authToken) {
    // authToken is missing
    return true; // treat as expired
  }

  // authToken is present
  const decodedToken = decodeAuthToken(authToken);
  const expSeconds = decodedToken.exp;
  const nowSeconds = Math.floor(Date.now() / 1000);

  return expSeconds < nowSeconds; // true if expired, false if valid
}

function decodeAuthToken(authToken: string) {
  // Implement the logic to decode the authToken
  // You can use a JWT decoding library or your own implementation
  const payload = authToken.split(".")[1];
  const decodedPayload = atob(payload);
  const { exp } = JSON.parse(decodedPayload);
  return { exp };
}
const CheckoutChang = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userInfo = location.state ? location.state.userInfo : [];
  const items: ItemOrder[] = location.state ? location.state.items : [];
  const selectedDate = location.state ? location.state.selectedDate : null;
  const orderNames = items.map((item) => item.titleKor);
  const orderName = orderNames.join(", ");
  const { totalPrice } = items.reduce(
    (acc: { totalquantity: number; totalPrice: number }, item: ItemOrder) => {
      acc.totalquantity += item.quantity;
      acc.totalPrice += item.price * item.quantity;
      return acc;
    },
    { totalquantity: 0, totalPrice: 0 },
  );
  const authToken = localStorage.getItem("authToken");
  useEffect(() => {
    // Check if the authToken is missing or expired
    if (!authToken || authTokenExpired(authToken)) {
      navigate("/login");
      return;
    }
  });

  useEffect(() => {
    // ------ 클라이언트 키로 객체 초기화 ------
    loadTossPayments(clientKey).then((tossPayments) => {
      // ------ 결제창 띄우기 ------
      tossPayments
        .requestPayment("카드", {
          // 결제수단 파라미터
          // 결제 정보 파라미터
          // 더 많은 결제 정보 파라미터는 결제창 Javascript SDK에서 확인하세요.
          // https://docs.tosspayments.com/reference/js-sdk
          // amount: totalPrice, // 결제 금액
          amount: totalPrice,
          orderId: nanoid(), // 주문 ID
          orderName: orderName, // 주문명
          customerName: userInfo.realName, // 구매자 이름
          customerEmail: userInfo.email,
          successUrl: `${window.location.origin}/PaymentConfirm`, // 결제 성공 시 이동할 페이지(이 주소는 예시입니다. 상점에서 직접 만들어주세요.)
          failUrl: `${window.location.origin}/fail`, // 결제 실패 시 이동할 페이지(이 주소는 예시입니다. 상점에서 직접 만들어주세요.)
        })
        // ------ 결제창을 띄울 수 없는 에러 처리 ------
        // 메서드 실행에 실패해서 reject 된 에러를 처리하는 블록입니다.
        // 결제창에서 발생할 수 있는 에러를 확인하세요.
        // https://docs.tosspayments.com/reference/error-codes#결제창공통-sdk-에러
        .catch(function (error) {
          if (error.code === "USER_CANCEL") {
            // 결제 고객이 결제창을 닫았을 때 에러 처리
          } else if (error.code === "INVALID_CARD_COMPANY") {
            // 유효하지 않은 카드 코드에 대한 에러 처리
          }
        });
    });
  }, [totalPrice, items, userInfo, selectedDate]);

  return <script src="https://js.tosspayments.com/v1/payment%22%3E"></script>; // JSX 반환
};

export default CheckoutChang;
