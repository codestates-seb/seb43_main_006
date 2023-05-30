import { PriceRegular } from "@utils/priceUtils";

interface PriceType {
  price: number;
}
const PriceDisplay = ({ price }: PriceType) => {
  return <>{PriceRegular(price)}</>;
};

export default PriceDisplay;
