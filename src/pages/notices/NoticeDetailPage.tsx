import React from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { PageHeader, Typography, Skeleton } from 'antd';
import Viewer from '../../components/Viewer';
import { useGetNoticeQuery } from '../../apis/apiSlice';
import { useBreadcrumbProps } from '../../utils/breadcrumb';
import pageStyles from '../../styles/Page.module.css';
import styles from './NoticeDetailPage.module.css';

const { Title, Text } = Typography;

const NoticeDetailPage: React.FC = () => {
  const { noticeId = '' } = useParams();
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
              发布时间：{moment(data.releaseTime).format('YYYY-MM-DD')}
            </Text>
          </>
        )
      }
      breadcrumb={breadcrumb}
    >
      <Skeleton active loading={isFetching}>
        {data ? <Viewer initialValue={data.content} /> : '加载失败'}
      </Skeleton>
    </PageHeader>
  );
};

export default NoticeDetailPage;
