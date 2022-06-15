import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import { PageHeader, Typography, Button, Skeleton, Modal, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Viewer from '../../components/Viewer';
import {
  useGetCurrentUserQuery,
  useGetNoticeQuery,
  useDeleteNoticeMutation,
} from '../../apis/apiSlice';
import { useBreadcrumbProps } from '../../utils/breadcrumb';
import pageStyles from '../../styles/Page.module.css';
import styles from './NoticeDetailPage.module.css';

const { confirm } = Modal;
const { Title, Text } = Typography;

const NoticeDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { noticeId = '' } = useParams();
  const { data: user } = useGetCurrentUserQuery();
  const { data, isFetching } = useGetNoticeQuery({ id: noticeId });
  const [remove] = useDeleteNoticeMutation();
  const breadcrumb = useBreadcrumbProps([
    { path: '/', breadcrumbName: '首页' },
    { path: '/notices', breadcrumbName: '院内公告' },
    { path: `/notices/${noticeId}`, breadcrumbName: '公告详情' },
  ]);

  const onDelete = () =>
    confirm({
      title: '确认删除该公告？',
      onOk: async () => {
        try {
          await remove({ id: noticeId }).unwrap();
          navigate('/notices');
          message.success('删除成功');
        } catch (err: any) {
          message.error(err.message || err.status);
        }
      },
    });

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
        user?.isAdmin && data
          ? [
              <Link key="update" to={`/notices/edit/${noticeId}`}>
                <Button type="primary" icon={<EditOutlined />}>
                  更新公告
                </Button>
              </Link>,
              <Button
                type="primary"
                danger
                icon={<DeleteOutlined />}
                onClick={onDelete}
              >
                删除公告
              </Button>,
            ]
          : []
      }
    >
      <Skeleton active loading={isFetching}>
        {data ? <Viewer initialValue={data.content} /> : '加载失败'}
      </Skeleton>
    </PageHeader>
  );
};

export default NoticeDetailPage;
