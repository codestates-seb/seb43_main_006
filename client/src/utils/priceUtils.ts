export function PriceRegular(price: number): string {
  return price
    .toString()
    .split("")
    .reverse()
    .join("")
    .replace(/(\d{3})(?=\d)/g, "$1,")
    .split("")
    .reverse()
    .join("");
  // 브라우저 호환성 문제
  // return price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}
