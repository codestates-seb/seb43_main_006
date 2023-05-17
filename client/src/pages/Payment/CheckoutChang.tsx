import { loadTossPayments } from "@tosspayments/payment-sdk";
import { nanoid } from "nanoid";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ItemOrder } from "../../types/AlcholInterfaces";

const clientKey = "test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq";

const CheckoutChang = () => {
  const location = useLocation();
  const items: ItemOrder[] = location.state ? location.state.items : [];
  const user = location.state ? location.state.user : [];
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
  console.log(totalPrice);
  console.log(user.name);
  console.log(orderName);
  console.log(nanoid());

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
          amount: totalPrice, // 결제 금액
          orderId: nanoid(), // 주문 ID
          orderName: orderName, // 주문명
          customerName: user.name, // 구매자 이름
          customerEmail: user.email,
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
  }, [totalPrice, items, user]);

  return <script src="https://js.tosspayments.com/v1/payment%22%3E"></script>; // JSX 반환
};

export default CheckoutChang;
