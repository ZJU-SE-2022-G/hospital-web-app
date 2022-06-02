import { useRequest } from 'ahooks';
import { useClient } from './client';

const useProvinceData = () => {
  const client = useClient();

  return useRequest(async () => {
    const data = await client.get<any>('/epidemic/map');
    return {
      updateTime: data.data.times,
      provinceData: data.data.list.map(({ name, econNum: value }: any) => ({
        name,
        value,
      })),
    };
  });
};

export { useProvinceData };
