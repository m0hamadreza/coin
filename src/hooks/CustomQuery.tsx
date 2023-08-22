import { useQuery, UseQueryResult, UseQueryOptions } from 'react-query';
import  { AxiosResponse } from 'axios';
import { axiosInstance } from '../axios/axios';

// typescript of this part need more time


type Data = any;

const fetchData = async (url: string, params: Record<string, any>): Promise<Data> => {
  const response: AxiosResponse<Data> = await axiosInstance.get(url, { params });
  return response.data;
};

const useCustomQuery = (
  url: string,
  queryKey: any[],
  params: Record<string, any>,
  options?: UseQueryOptions<any>
): UseQueryResult<Data> => {
  return useQuery([queryKey, url, params], () => fetchData(url, params), options);
};

export default useCustomQuery;