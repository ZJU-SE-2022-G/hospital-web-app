import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import {
  PageHeader,
  Form,
  Input,
  InputNumber,
  DatePicker,
  Button,
  message,
  Cascader,
  Radio,
} from 'antd';
import {
  useGetCurrentUserQuery,
  useCreateAppointmentMutation,
  useListDepartmentsQuery,
  useListDoctorsQuery,
} from '../../apis/apiSlice';
import { useBreadcrumbProps } from '../../utils/breadcrumb';
import styles from '../../styles/Page.module.css';

const AppointmentPage: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { data: user } = useGetCurrentUserQuery();
  const [reserve, { isLoading }] = useCreateAppointmentMutation();
  const { data: departments } = useListDepartmentsQuery();
  const { data: doctors } = useListDoctorsQuery();
  const breadcrumb = useBreadcrumbProps([
    { path: '/', breadcrumbName: '首页' },
    { path: '/reserve', breadcrumbName: '门诊预约' },
  ]);

  useEffect(() => {
    form.setFieldsValue({ name: user?.name, id: user?.id });
  }, [user]);

  const options = departments?.map(department => ({
    value: department.name,
    label: department.name,
    children: doctors
      ?.filter(doctor => doctor.departmantName === department.name)
      .map(doctor => ({ value: doctor.docName, label: doctor.docName })),
  }));

  const onFinish = async (values: any) => {
    try {
      if (user) {
        await reserve({
          uid: user.uid,
          name: values['name'],
          sex: values['sex'],
          age: values['age'],
          pwd: values['id'],
          departmentName: values['doctor'][0],
          docName: values['doctor'][1],
          orderedTime: values['date'].format('MMDD'),
        }).unwrap();
        navigate('/user');
        message.success('预约成功');
      }
    } catch (err: any) {
      message.error(err.message || err.status);
    }
  };

  return (
    <PageHeader
      className={styles.page}
      title="门诊预约"
      breadcrumb={breadcrumb}
    >
      {user ? (
        <Form
          form={form}
          name="appoint"
          labelAlign="left"
          labelCol={{ span: 6 }}
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
            name="doctor"
            label="预约医生"
            rules={[{ required: true, message: '请选择预约医生' }]}
          >
            <Cascader options={options} />
          </Form.Item>
          <Form.Item
            name="date"
            label="预约日期"
            rules={[{ required: true, message: '请选择预约日期' }]}
          >
            <DatePicker
              disabledDate={current =>
                current &&
                (current < moment().endOf('day') ||
                  current > moment().add(7, 'days').endOf('day'))
              }
            />
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
              loading={isLoading}
            >
              预约
            </Button>
          </Form.Item>
        </Form>
      ) : (
        '请先登录'
      )}
    </PageHeader>
  );
};

export default AppointmentPage;
