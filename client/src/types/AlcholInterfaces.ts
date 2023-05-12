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

// 주류 리스트 상세 데이터
// export interface AlcoholData {

// }

// 페이지네이션 Props
export interface PaginationProps {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  itemsPerPage: number;
  totalData: number;
}
