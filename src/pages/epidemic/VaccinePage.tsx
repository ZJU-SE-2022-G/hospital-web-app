import React from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import {
  PageHeader,
  Form,
  Input,
  InputNumber,
  Radio,
  DatePicker,
  Button,
  message,
} from 'antd';
import { useReserveVaccineMutation } from '../../apis/apiSlice';
import styles from '../../styles/Form.module.css';

const VaccinePage: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [reserve, { isLoading }] = useReserveVaccineMutation();

  const onFinish = async (values: any) => {
    try {
      await reserve({
        usrId: values['id'],
        usrName: values['name'],
        age: values['age'],
        sex: values['sex'],
        vacNum: values['vaccine-number'],
        vacDate: values['vaccine-date'].format('YYYY-MM-DD'),
      }).unwrap();
      navigate(-1);
      message.success('预约成功');
    } catch (err: any) {
      message.error(err.message || err.status);
    }
  };

  return (
    <PageHeader className={styles.form} title="疫苗接种预约">
      <Form
        form={form}
        name="vaccine"
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
          name="id"
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
          name="age"
          label="年龄"
          rules={[{ required: true, message: '请输入您的年龄' }]}
        >
          <InputNumber max={200} min={0} />
        </Form.Item>
        <Form.Item
          name="sex"
          label="性别"
          rules={[{ required: true, message: '请选择您的性别' }]}
        >
          <Radio.Group name="sex" options={['男', '女']} />
        </Form.Item>
        <Form.Item
          name="vaccine-number"
          label="接种针次"
          rules={[{ required: true, message: '请选择接种针次' }]}
        >
          <Radio.Group
            name="vaccine-number"
            options={['第一针', '第二针', '第三针']}
          />
        </Form.Item>
        <Form.Item
          name="vaccine-date"
          label="接种日期"
          rules={[{ required: true, message: '请选择接种日期' }]}
        >
          <DatePicker
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

export default VaccinePage;
