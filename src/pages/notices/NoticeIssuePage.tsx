import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader, message } from 'antd';
import TitleContentForm from '../../components/TitleContentForm';
import {
  useGetCurrentUserQuery,
  useCreateNoticeMutation,
} from '../../apis/apiSlice';
import { useBreadcrumbProps } from '../../utils/breadcrumb';
import styles from '../../styles/Page.module.css';

const NoticeIssuePage: React.FC = () => {
  const navigate = useNavigate();
  const { data: user } = useGetCurrentUserQuery();
  const [issue, { isLoading }] = useCreateNoticeMutation();
  const breadcrumb = useBreadcrumbProps([
    { path: '/', breadcrumbName: '首页' },
    { path: '/notices', breadcrumbName: '院内公告' },
    { path: '/notice', breadcrumbName: '发布公告' },
  ]);

  const onFinish = async (values: any) => {
    try {
      const notice = await issue({
        title: values['title'],
        content: values['content'],
      }).unwrap();
      navigate(`/notices/${notice.id}`);
      message.success('发布成功');
    } catch (err: any) {
      message.error(err.message || err.status);
    }
  };

  return (
    <PageHeader
      className={styles.largePage}
      title="发布公告"
      breadcrumb={breadcrumb}
    >
      {user?.isAdmin ? (
        <TitleContentForm
          name="notice"
          titleLabel="公告标题"
          contentLabel="公告内容"
          submitLabel="发布"
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

export default NoticeIssuePage;
