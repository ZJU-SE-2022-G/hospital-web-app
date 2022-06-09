import { Button, DatePicker, Form, Input, Select } from 'antd';
import React from 'react';

const Doctorapp: React.FC = () => {
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
        name="doctor"
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
          name="age"
          label="年龄"
          rules={[
            { required: true, message: '请输入您的年龄' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="sex"
          label="男/女"
          rules={[{ required: true, message: '请选择您的性别' }]}
        >
          <Select placeholder="请选择您的性别">
            <Option value="男">男</Option>
            <Option value="女">女</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="room"
          label="科室"
          rules={[{ required: true, message: '请选择您就诊的科室' }]}
        >
          <Select placeholder="请选择您要就诊的科室">
            <Option value="内科">内科</Option>
            <Option value="外科">外科</Option>
            <Option value="妇产科">妇产科</Option>
            <Option value="检验科">检验科</Option>
            <Option value="口腔科">口腔科</Option>
            <Option value="耳鼻喉科">耳鼻喉科</Option>
        </Select>
              </Form.Item>
              <Form.Item
          name="doctor"
          label="医生"
          rules={[
            { required: true, message: '请输入您要预约的医生姓名', whitespace: true },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="vaccineDate"
          label="预约日期"
          rules={[
            {
              type: 'object' as const,
              required: true,
              message: '请选择接种日期',
            },
          ]}
        >
          <DatePicker placeholder="请选择就诊日期" />
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

export default Doctorapp;