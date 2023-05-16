// 주류 리스트 데이터
export interface AlcoholListData {
  itemId: number;
  titleKor: string;
  discountRate: number;
  price: number;
  categories: string[];
  profile: string;
  reviewCount: number;
  reviewRating: number;
}

// 주류 리스트 상세 데이터
export interface AlcoholData {
  itemId: number;
  titleKor: string;
  titleEng: string;
  profile: string;
  content: string;
  categories: string[];
  price: number;
  capacity: number;
  volume: number;
  country: string;
  aroma: string;
  taste: string;
  field: string;
  sales: string;
  quantity: number;
  discountRate: string;
  reviewCount: number;
  reviewRating: number;
  reviews: ItemReviewsType[];
}

// 주류 리스트 아이템 정렬 Props
export interface SortItemsProps {
  totalData: number;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
}

// 주류 리스트 데이터 Props
export interface AlcoholListProps {
  data: AlcoholListData[] | null;
  totalData: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  size: number;
}

// 페이지네이션 Props
export interface PaginationProps {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  itemsPerPage: number;
  totalData: number;
}

// 결제 페이지 아이템 Props
export interface ItemOrder {
  itemId: number;
  titleKor: string;
  price: number;
  profile: string;
  quantity: number;
}
// 장바구니 => 결제페이지로 정제된 Props
export interface Props {
  items: ItemOrder[];
  cartId?: number;
}
// 장바구니에 담긴 Props 배열
export interface CartItemsProps {
  cartId?: number;
  itemCarts: ItemOrder[];
}

// 결제 페이지 UserProps
export interface UserProps {
  id?: string;
  name: string;
  email: string;
  phoneNumber: string;
}

export interface CheckoutProps {
  onClose?: () => void;
  onPaymentRequest?: () => Promise<void>;
}

// 주류 상세 페이지 리뷰 조회
export interface ItemReviewsType {
  reviewId: number;
  title: string;
  content: string;
  rating: number;
  displayName: string;
  createdAt: string;
  modifiedAt: string;
  reviewImages: string[];
}
