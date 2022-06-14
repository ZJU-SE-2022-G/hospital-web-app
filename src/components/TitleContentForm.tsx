import React from 'react';
import { Form, Input, Button } from 'antd';
import Editor from './Editor';
import styles from '../styles/Page.module.css';

interface TitleContentFormProps {
  name: string;
  titleLabel: string;
  contentLabel: string;
  submitLabel: string;
  loading: boolean;
  onFinish: (values: any) => void;
  onCancel: () => void;
}

const TitleContentForm: React.FC<TitleContentFormProps> = ({
  name,
  titleLabel,
  contentLabel,
  submitLabel,
  loading,
  onFinish,
  onCancel,
}) => {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      name={name}
      labelAlign="left"
      labelCol={{ sm: { span: 6 }, md: { span: 4 }, lg: { span: 3 } }}
      validateTrigger="onBlur"
      onFinish={onFinish}
    >
      <Form.Item
        name="title"
        label={titleLabel}
        rules={[{ required: true, message: `请输入${titleLabel}` }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="content"
        label={contentLabel}
        rules={[{ required: true, message: `请输入${contentLabel}` }]}
      >
        <Editor />
      </Form.Item>
      <Form.Item label=" " colon={false}>
        <Button
          className={styles.button}
          htmlType="reset"
          type="dashed"
          shape="round"
          onClick={onCancel}
        >
          取消
        </Button>
        <Button
          className={styles.button}
          htmlType="submit"
          type="primary"
          shape="round"
          loading={loading}
        >
          {submitLabel}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TitleContentForm;
