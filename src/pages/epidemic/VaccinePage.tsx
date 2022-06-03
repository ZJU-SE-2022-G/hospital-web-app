import { Button, DatePicker, Form, Input, Select } from 'antd';
import React from 'react';

const VaccinePage: React.FC = () => {
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
        name="vaccine"
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
          name="vac_num"
          label="第一针/第二针/第三针"
          rules={[{ required: true, message: '请选择您要接种第几针' }]}
        >
          <Select placeholder="请选择您要接种第几针">
            <Option value="第一针">第一针</Option>
            <Option value="第二针">第二针</Option>
            <Option value="第三针">第三针</Option>
          </Select>
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
          <DatePicker placeholder="请选择接种日期" />
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

export default VaccinePage;