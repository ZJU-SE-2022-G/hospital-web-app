import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader, List, Typography, Skeleton } from 'antd';
import { useGetNoticesQuery } from '../../apis/apiSlice';
import styles from './NoticeListPage.module.css';

const { Text } = Typography;

const NoticeListPage: React.FC = () => {
  const [current, setCurrent] = useState(1);
  const { data, isLoading } = useGetNoticesQuery({ p: current, pageSize: 10 });

  return (
    <PageHeader className={styles.page} title="院内公告">
      <Skeleton
        active
        title={false}
        paragraph={{ rows: 10, width: '100%' }}
        loading={isLoading}
      >
        {data ? (
          <List
            size="small"
            dataSource={data.records}
            renderItem={notice => (
              <List.Item actions={[notice.releaseTime]}>
                <Link to={`/notice/${notice.id}`}>
                  <Text>{notice.title}</Text>
                </Link>
              </List.Item>
            )}
            pagination={{
              showSizeChanger: false,
              total: data.total,
              onChange: page => setCurrent(page),
            }}
          />
        ) : (
          '加载失败'
        )}
      </Skeleton>
    </PageHeader>
  );
};

export default NoticeListPage;
