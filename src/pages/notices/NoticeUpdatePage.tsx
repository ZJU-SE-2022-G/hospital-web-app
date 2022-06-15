import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PageHeader, message } from 'antd';
import TitleContentForm from '../../components/TitleContentForm';
import {
  useGetCurrentUserQuery,
  useGetNoticeQuery,
  useUpdateNoticeMutation,
} from '../../apis/apiSlice';
import { useBreadcrumbProps } from '../../utils/breadcrumb';
import styles from '../../styles/Page.module.css';

const NoticeUpdatePage: React.FC = () => {
  const navigate = useNavigate();
  const { noticeId = '' } = useParams();
  const { data: user } = useGetCurrentUserQuery();
  const { data } = useGetNoticeQuery({ id: noticeId });
  const [update, { isLoading }] = useUpdateNoticeMutation();
  const breadcrumb = useBreadcrumbProps([
    { path: '/', breadcrumbName: '首页' },
    { path: '/notices', breadcrumbName: '院内公告' },
    { path: `/notices/${noticeId}`, breadcrumbName: '公告详情' },
    { path: `/notices/edit/${noticeId}`, breadcrumbName: '更新公告' },
  ]);

  const onFinish = async (values: any) => {
    try {
      await update({
        id: noticeId,
        title: values['title'],
        content: values['content'],
      }).unwrap();
      navigate(`/notices/${noticeId}`);
      message.success('更新成功');
    } catch (err: any) {
      message.error(err.message || err.status);
    }
  };

  return (
    <PageHeader
      className={styles.largePage}
      title="更新公告"
      breadcrumb={breadcrumb}
    >
      {user?.isAdmin && data ? (
        <TitleContentForm
          name="notice"
          titleLabel="公告标题"
          titleDefaultValue={data.title}
          contentLabel="公告内容"
          contentDefaultValue={data.content}
          submitLabel="更新"
          loading={isLoading}
          onFinish={onFinish}
          onCancel={() => navigate(-1)}
        />
      ) : (
        '权限不足'
      )}
    </PageHeader>
  );
};

export default NoticeUpdatePage;
