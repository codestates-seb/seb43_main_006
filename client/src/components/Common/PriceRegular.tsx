interface PriceType {
  price: number;
}
const PriceRegular = ({ price }: PriceType) => {
  return <>{price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</>;
};

export default PriceRegular;
