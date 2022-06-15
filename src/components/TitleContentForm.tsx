import React, { useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import Editor from './Editor';
import styles from '../styles/Page.module.css';

interface TitleContentFormProps {
  name: string;
  extra?: React.ReactNode;
  titleLabel: string;
  titleDefaultValue?: string;
  contentLabel: string;
  contentDefaultValue?: string;
  submitLabel: string;
  loading: boolean;
  onFinish: (values: any) => void;
  onCancel: () => void;
}

const TitleContentForm: React.FC<TitleContentFormProps> = ({
  name,
  extra,
  titleLabel,
  titleDefaultValue,
  contentLabel,
  contentDefaultValue,
  submitLabel,
  loading,
  onFinish,
  onCancel,
}) => {
  const [form] = Form.useForm();

  useEffect(
    () =>
      form.setFieldsValue({
        title: titleDefaultValue,
        content: contentDefaultValue,
      }),
    [],
  );

  return (
    <Form
      form={form}
      name={name}
      labelAlign="left"
      labelCol={{ sm: { span: 6 }, md: { span: 4 }, lg: { span: 3 } }}
      validateTrigger="onBlur"
      onFinish={onFinish}
    >
      {extra}
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
        <Editor initialValue={contentDefaultValue} />
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
