import { api } from '../../api';

export type User = {
  id: number;
  name: string;
};

export const userApi = api.injectEndpoints({
  endpoints: build => ({
    fetchOne: build.query<User, string>({
      query: id => `/users/${id}`,
    }),
  }),
  overrideExisting: false,
});

export const getRestourantsApi = api.injectEndpoints({
  endpoints: build => ({
    getRestourants: build.query<any, any>({
      query: id => `api/v1/getRestourants`,
    }),
  }),
  overrideExisting: false,
});

export const getMenuApi = api.injectEndpoints({
  endpoints: build => ({
    getMenu: build.query<any, any>({
      query: id => `api/v1/getMenuItems`,
    }),
  }),
  overrideExisting: false,
});

export const { useLazyFetchOneQuery } = userApi;
export const { useLazyGetRestourantsQuery } = getRestourantsApi;
export const { useLazyGetMenuQuery } = getMenuApi;
