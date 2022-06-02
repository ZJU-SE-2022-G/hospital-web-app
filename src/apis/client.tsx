import React, { useContext } from 'react';
import axios, { AxiosInstance } from 'axios';

class Client {
  private _axios: AxiosInstance;

  constructor() {
    this._axios = axios.create({ baseURL: '/api' });
  }

  async get<T>(path: string, req: any = {}): Promise<T> {
    const { data } = await this._axios.get<T>(path, {
      params: req,
    });
    return data;
  }

  async post<T>(path: string, req: any = {}): Promise<T> {
    const { data } = await this._axios.post<T>(path, req);
    return data;
  }
}

const ClientContext = React.createContext<Client>(new Client());

const useClient = () => useContext(ClientContext);

export { useClient };
