import styled from "styled-components";

interface QuantityProps {
  quantity: number;
  maxQuantity: number;
  onQuantityChange: (newQuantity: number) => void;
}

const QuantityControlBox = styled.div`
  display: flex;
  width: 110px;
  height: 32px;
  border-radius: 6px;
  border: 1px solid #ddd;
  background: #fff;
  font-size: 13px;
  overflow: hidden;

  .quantity_btn {
    font-size: 16px;
    padding-bottom: 3px;
    flex: none;
    width: 30px;
    height: 30px;
    border: none;
    cursor: pointer;
    background: #fff;
  }

  .decrement {
    cursor: not-allowed;
    opacity: 0.25;
  }

  .input_box {
    border-left: 1px solid #ddd;
    border-right: 1px solid #ddd;
    flex: 1;
    line-height: 30px;
    text-align: center;
    width: 42px;
    font-size: 13px;

    > .quantity_input {
      padding: 0;
      line-height: 30px;
      height: 30px;
      width: 100%;
      border: 0;
      text-align: center;

      &::-webkit-inner-spin-button,
      &::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }
  }
`;

const QuantityControl = ({ quantity, maxQuantity, onQuantityChange }: QuantityProps) => {
  const handleIncrement = () => {
    if (quantity < maxQuantity) {
      onQuantityChange(quantity + 1);
    }
  };
  const handleDecrement = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value);

    if (maxQuantity >= newQuantity) {
      onQuantityChange(newQuantity);
    }
  };

  // const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (e.key === "Backspace" || e.key === "Delete") {
  //     onQuantityChange(undefined);
  //   }
  // };

  return (
    <QuantityControlBox>
      <button className={quantity > 1 ? "quantity_btn" : "quantity_btn decrement "} onClick={handleDecrement}>
        -
      </button>
      <div className="input_box">
        <input className="quantity_input" type="number" value={quantity} onChange={handleQuantityChange} />
      </div>
      <button className={quantity < maxQuantity ? "quantity_btn" : "quantity_btn decrement "} onClick={handleIncrement}>
        +
      </button>
    </QuantityControlBox>
  );
};

export default QuantityControl;
