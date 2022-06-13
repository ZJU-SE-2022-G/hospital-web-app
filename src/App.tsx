import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import moment from 'moment';
import 'moment/dist/locale/zh-cn';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import store from './stores';
import Routes from './routes';

moment.locale('zh-cn');

const App: React.FC = () => (
  <Provider store={store}>
    <ConfigProvider locale={zhCN}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </ConfigProvider>
  </Provider>
);

export default App;
