import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import moment from 'moment';
import { PageHeader, Input, Button, List, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {
  useGetCurrentUserQuery,
  useListNoticesQuery,
} from '../../apis/apiSlice';
import { useBreadcrumbProps } from '../../utils/breadcrumb';
import styles from '../../styles/Page.module.css';

const { Search } = Input;
const { Text } = Typography;

const NoticeListPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [current, setCurrent] = useState(
    parseInt(searchParams.get('page') || '1'),
  );
  const [search, setSearch] = useState(searchParams.get('query') || '');
  const { data: user } = useGetCurrentUserQuery();
  const { data, isFetching } = useListNoticesQuery({
    p: current,
    pageSize: 10,
    query: search,
  });
  const breadcrumb = useBreadcrumbProps([
    { path: '/', breadcrumbName: '首页' },
    { path: '/notices', breadcrumbName: '院内公告' },
  ]);

  useEffect(
    () => setSearchParams({ page: current.toString(), query: search }),
    [current, search],
  );

  return (
    <PageHeader
      className={styles.largePage}
      title="院内公告"
      breadcrumb={breadcrumb}
      extra={[
        <Search
          key="search"
          allowClear
          loading={isFetching}
          defaultValue={search}
          onSearch={value => {
            setCurrent(1);
            setSearch(value);
          }}
        />,
        user?.isAdmin ? (
          <Link key="create" to="/notice">
            <Button type="primary" icon={<PlusOutlined />}>
              发布公告
            </Button>
          </Link>
        ) : undefined,
      ]}
    >
      <List
        size="small"
        dataSource={data?.records}
        renderItem={notice => (
          <List.Item actions={[moment(notice.updateTime).format('YYYY-MM-DD')]}>
            <Link to={`/notices/${notice.id}`}>
              <Text>{notice.title}</Text>
            </Link>
          </List.Item>
        )}
        pagination={{
          showSizeChanger: false,
          total: data?.total,
          current,
          onChange: page => setCurrent(page),
        }}
        loading={isFetching}
      />
    </PageHeader>
  );
};

export default NoticeListPage;
