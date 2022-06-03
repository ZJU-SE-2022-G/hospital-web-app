import { Button, DatePicker, Form, Input, Select } from 'antd';
import React from 'react';

const NucleicPage: React.FC = () => {
  const [form] = Form.useForm();
  const onFinish = async (values: any) => {
    console.log('Received: ', values);
  };
  const { Option } = Select;
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 4 },
  };
  const formTailLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8, offset: 8 },
  };
  return (
    <div style={{ marginTop: 25 }}>
      <Form
        form={form}
        name="nucleic"
        onFinish={onFinish}
        {...formItemLayout}
        scrollToFirstError
      >
        <Form.Item
          name="name"
          label="姓名"
          rules={[
            { required: true, message: '请输入真实姓名', whitespace: true },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="idcard"
          label="身份证号"
          rules={[
            { required: true, message: '请输入身份证号' },
            () => ({
              validator(_, value) {
                if (!value || value.length == 18) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('身份证号长度不符'));
              },
            }),
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="nucleicType"
          label="单检/混检"
          rules={[{ required: true, message: '请选择检查类型' }]}
        >
          <Select placeholder="请选择检查类型">
            <Option value="单检">单检</Option>
            <Option value="混检">混检</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="nucleicDate"
          label="预约日期"
          rules={[
            {
              type: 'object' as const,
              required: true,
              message: '请选择检查日期',
            },
          ]}
        >
          <DatePicker placeholder="请选择检查日期" />
        </Form.Item>
        <Form.Item {...formTailLayout}>
          <Button type="dashed" htmlType="reset" shape="round">
            取消
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            shape="round"
            style={{ margin: 10 }}
          >
            提交
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default NucleicPage;
