// 주류 리스트 데이터
export interface AlcoholListData {
  itemId: number;
  title_Kor: string;
  discountRate: string;
  price: number;
  categories: string[];
  profile: string;
  reviewCount: number;
  reviewRating: number;
}

// 주류 리스트 상세 데이터
// export interface AlcoholData {

// }

// 페이지네이션 Props
export interface PaginationProps {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  itemsPerPage: number;
  totalItems: number | 0;
  data: AlcoholListData | null;
}
