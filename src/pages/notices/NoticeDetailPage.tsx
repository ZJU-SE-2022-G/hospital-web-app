import React from 'react';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';
import { PageHeader, Typography, Button, Skeleton } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import Viewer from '../../components/Viewer';
import { useGetCurrentUserQuery, useGetNoticeQuery } from '../../apis/apiSlice';
import { useBreadcrumbProps } from '../../utils/breadcrumb';
import pageStyles from '../../styles/Page.module.css';
import styles from './NoticeDetailPage.module.css';

const { Title, Text } = Typography;

const NoticeDetailPage: React.FC = () => {
  const { noticeId = '' } = useParams();
  const { data: user } = useGetCurrentUserQuery();
  const { data, isFetching } = useGetNoticeQuery({ id: noticeId });
  const breadcrumb = useBreadcrumbProps([
    { path: '/', breadcrumbName: '首页' },
    { path: '/notices', breadcrumbName: '院内公告' },
    { path: `/notices/${noticeId}`, breadcrumbName: '公告详情' },
  ]);

  return (
    <PageHeader
      className={pageStyles.largePage}
      title={
        data && (
          <>
            <Title className={styles.title} level={2}>
              {data.title}
            </Title>
            <Text className={styles.subTitle} type="secondary">
              发布时间：{moment(data.updateTime).format('YYYY-MM-DD HH:mm:ss')}
            </Text>
          </>
        )
      }
      breadcrumb={breadcrumb}
      extra={
        user?.isAdmin && data ? (
          <Link key="update" to={`/notices/edit/${noticeId}`}>
            <Button type="primary" icon={<EditOutlined />}>
              更新公告
            </Button>
          </Link>
        ) : undefined
      }
    >
      <Skeleton active loading={isFetching}>
        {data ? <Viewer initialValue={data.content} /> : '加载失败'}
      </Skeleton>
    </PageHeader>
  );
};

export default NoticeDetailPage;
