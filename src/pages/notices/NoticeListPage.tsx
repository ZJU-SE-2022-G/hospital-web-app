import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { PageHeader, Button, List, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {
  useGetCurrentUserQuery,
  useListNoticesQuery,
} from '../../apis/apiSlice';
import { useBreadcrumbProps } from '../../utils/breadcrumb';
import styles from '../../styles/Page.module.css';

const { Text } = Typography;

const NoticeListPage: React.FC = () => {
  const [current, setCurrent] = useState(1);
  const { data: user } = useGetCurrentUserQuery();
  const { data, isFetching } = useListNoticesQuery({
    p: current,
    pageSize: 10,
  });
  const breadcrumb = useBreadcrumbProps([
    { path: '/', breadcrumbName: '首页' },
    { path: '/notices', breadcrumbName: '院内公告' },
  ]);

  return (
    <PageHeader
      className={styles.largePage}
      title="院内公告"
      breadcrumb={breadcrumb}
      extra={
        user?.isAdmin
          ? [
              <Link key="issue" to="/notice">
                <Button type="primary" icon={<PlusOutlined />}>
                  发布公告
                </Button>
              </Link>,
            ]
          : []
      }
    >
      <List
        size="small"
        dataSource={data?.records}
        renderItem={notice => (
          <List.Item
            actions={[moment(notice.releaseTime).format('YYYY-MM-DD')]}
          >
            <Link to={`/notices/${notice.id}`}>
              <Text>{notice.title}</Text>
            </Link>
          </List.Item>
        )}
        pagination={{
          showSizeChanger: false,
          total: data?.total,
          onChange: page => setCurrent(page),
        }}
        loading={isFetching}
      />
    </PageHeader>
  );
};

export default NoticeListPage;
