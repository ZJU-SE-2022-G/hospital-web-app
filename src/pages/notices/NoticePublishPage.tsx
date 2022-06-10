import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader, Form, Input, Button, message } from 'antd';
import { useIssueNoticeMutation } from '../../apis/apiSlice';
import styles from '../../styles/Form.module.css';

const { TextArea } = Input;

const NoticePublishPage: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [issue, { isLoading }] = useIssueNoticeMutation();

  const onFinish = async (values: any) => {
    try {
      await issue({
        authorId: 0,
        title: values['title'],
        content: values['content'],
      }).unwrap();
      navigate(-1);
      message.success('登录成功');
    } catch (err: any) {
      message.error(err.message || err.status);
    }
  };

  return (
    <PageHeader className={styles.form} title="发布公告">
      <Form
        form={form}
        name="notice"
        labelAlign="left"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
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
          <TextArea autoSize={{ minRows: 10 }} />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
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

export default NoticePublishPage;
