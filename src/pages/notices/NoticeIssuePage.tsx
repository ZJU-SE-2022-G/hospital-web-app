import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader, Form, Input, Button, message } from 'antd';
import Editor from '../../components/Editor';
import { useCreateNoticeMutation } from '../../apis/apiSlice';
import { useBreadcrumbProps } from '../../utils/breadcrumb';
import styles from '../../styles/Page.module.css';

const NoticeIssuePage: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [issue, { isLoading }] = useCreateNoticeMutation();
  const breadcrumb = useBreadcrumbProps([
    { path: '/', breadcrumbName: '首页' },
    { path: '/notices', breadcrumbName: '院内公告' },
    { path: '/notice', breadcrumbName: '发布公告' },
  ]);

  const onFinish = async (values: any) => {
    try {
      await issue({
        title: values['title'],
        content: values['content'],
      }).unwrap();
      navigate('/notices');
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
      <Form
        form={form}
        name="notice"
        labelAlign="left"
        labelCol={{ sm: { span: 6 }, md: { span: 4 }, lg: { span: 3 } }}
        validateTrigger="onBlur"
        onFinish={onFinish}
      >
        <Form.Item
          name="title"
          label="公告标题"
          rules={[{ required: true, message: '请输入公告标题' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="content"
          label="公告内容"
          rules={[{ required: true, message: '请输入公告内容' }]}
        >
          <Editor />
        </Form.Item>
        <Form.Item label=" " colon={false}>
          <Button
            className={styles.button}
            htmlType="reset"
            type="dashed"
            shape="round"
            onClick={() => navigate(-1)}
          >
            取消
          </Button>
          <Button
            className={styles.button}
            htmlType="submit"
            type="primary"
            shape="round"
            disabled={isLoading}
          >
            发布
          </Button>
        </Form.Item>
      </Form>
    </PageHeader>
  );
};

export default NoticeIssuePage;
