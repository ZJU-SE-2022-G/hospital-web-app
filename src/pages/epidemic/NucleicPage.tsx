import React from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import {
  PageHeader,
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  message,
} from 'antd';
import { useReserveNucleicMutation } from '../../apis/apiSlice';
import styles from './NucleicPage.module.css';

const { Option } = Select;

const NucleicPage: React.FC = () => {
  const [form] = Form.useForm();
  const [reserve, { isLoading }] = useReserveNucleicMutation();
  const navigate = useNavigate();

  const onFinish = async () => {
    try {
      await reserve({
        usrId: form.getFieldValue('idcard'),
        usrName: form.getFieldValue('name'),
        testType: form.getFieldValue('nucleicType'),
        testDate: (form.getFieldValue('nucleicDate') as moment.Moment).format(
          'YYYY-MM-DD',
        ),
      }).unwrap();
      navigate('/');
      message.success('预约成功');
    } catch (err: any) {
      message.error(err.message || err.status);
    }
  };

  return (
    <PageHeader className={styles.page} title="核酸预约">
      <Form
        form={form}
        name="nucleic"
        labelAlign="left"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        validateTrigger="onBlur"
        onFinish={onFinish}
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
            {
              validator: (_, value) =>
                !value || (value.length === 18 && /^\d+X?$/.test(value))
                  ? Promise.resolve()
                  : Promise.reject(new Error('请输入正确的身份证号')),
            },
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
          rules={[{ required: true, message: '请选择检查日期' }]}
        >
          <DatePicker
            placeholder="请选择检查日期"
            disabledDate={current =>
              current &&
              (current < moment().endOf('day') ||
                current > moment().add(7, 'days').endOf('day'))
            }
          />
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
            提交
          </Button>
        </Form.Item>
      </Form>
    </PageHeader>
  );
};

export default NucleicPage;
