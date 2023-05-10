import axios from "axios";
import { useState, useEffect } from "react";

interface UserAxiosProps {
  url: string;
  params?: object;
}
const headers = {
  "Content-Type": "application/json",
  // accept: "text/html; charset=utf-8",
  "ngrok-skip-browser-warning": "69420", // ngrok cors 에러
};

interface UseAxiosState<T> {
  data: T | null;
  isLoading: boolean;
  error: unknown;
  totalData?: number | null;
}

const useAxios = <T extends NonNullable<unknown>>({ url, params }: UserAxiosProps): UseAxiosState<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, serError] = useState<unknown>(null);
  const [totalData, setTotalData] = useState<number | null>(null);

  const options = {
    method: "GET",
    params,
    headers,
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  const fetchData = async () => {
    setIsLoading(true);

    const response = await axios(url, options);
    try {
      const { data } = response;
      setData(data.data);
      setTotalData(data.pageInfo.totalElements);
    } catch (err) {
      serError(err);
    }
    setIsLoading(false);
  };

  return { data, isLoading, error, totalData };
};

export default useAxios;
