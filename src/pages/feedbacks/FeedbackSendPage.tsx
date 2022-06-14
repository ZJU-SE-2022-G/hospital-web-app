import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader, Form, Radio, message } from 'antd';
import TitleContentForm from '../../components/TitleContentForm';
import {
  useGetCurrentUserQuery,
  useCreateFeedbackMutation,
} from '../../apis/apiSlice';
import { useBreadcrumbProps } from '../../utils/breadcrumb';
import styles from '../../styles/Page.module.css';

const FeedbackSendPage: React.FC = () => {
  const navigate = useNavigate();
  const { data: user } = useGetCurrentUserQuery();
  const [send, { isLoading }] = useCreateFeedbackMutation();
  const breadcrumb = useBreadcrumbProps([
    { path: '/', breadcrumbName: '首页' },
    { path: '/feedback', breadcrumbName: '问题反馈' },
  ]);

  const onFinish = async (values: any) => {
    try {
      await send({
        problemType: values['type'],
        title: values['title'],
        problem: values['content'],
      }).unwrap();
      navigate('/');
      message.success('提交成功');
    } catch (err: any) {
      message.error(err.message || err.status);
    }
  };

  return (
    <PageHeader
      className={styles.largePage}
      title="问题反馈"
      breadcrumb={breadcrumb}
    >
      {user ? (
        <TitleContentForm
          name="feedback"
          extra={
            <Form.Item
              name="type"
              label="问题类型"
              rules={[{ required: true, message: '请选择问题类型' }]}
            >
              <Radio.Group
                name="problem-type"
                options={['信息有误', '使用不便', '其他意见']}
              />
            </Form.Item>
          }
          titleLabel="问题概述"
          contentLabel="问题详情"
          submitLabel="提交"
          loading={isLoading}
          onFinish={onFinish}
          onCancel={() => navigate(-1)}
        />
      ) : (
        '请先登录'
      )}
    </PageHeader>
  );
};

export default FeedbackSendPage;
