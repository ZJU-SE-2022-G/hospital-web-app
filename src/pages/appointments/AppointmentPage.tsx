import React, { useState } from 'react';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { useNavigate } from 'react-router-dom';
import {
  PageHeader,
  Form,
  Input,
  InputNumber,
  Radio,
  Cascader,
  DatePicker,
  Tooltip,
  Button,
  message,
} from 'antd';
import {
  useGetCurrentUserQuery,
  useCreateAppointmentMutation,
  useListDoctorWorkdaysQuery,
  useListDepartmentsQuery,
  useListDoctorsQuery,
} from '../../apis/apiSlice';
import { useBreadcrumbProps } from '../../utils/breadcrumb';
import styles from '../../styles/Page.module.css';

const AppointmentPage: React.FC = () => {
  const [doctorId, setDoctorId] = useState('');
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { data: user } = useGetCurrentUserQuery();
  const [reserve, { isLoading }] = useCreateAppointmentMutation();
  const { data: workdays } = useListDoctorWorkdaysQuery(doctorId || skipToken);
  const { data: departments } = useListDepartmentsQuery();
  const { data: doctors } = useListDoctorsQuery();
  const breadcrumb = useBreadcrumbProps([
    { path: '/', breadcrumbName: '首页' },
    { path: '/reserve', breadcrumbName: '门诊预约' },
  ]);

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
          orderedTime: values['date'].format('YYYY-MM-DD'),
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
          initialValues={{ name: user.name, id: user.id }}
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
            <Cascader
              options={options}
              onChange={value => {
                form.resetFields(['date']);
                setDoctorId(
                  doctors?.find(doctor => doctor.docName === value[1])?.docId ||
                    '',
                );
              }}
            />
          </Form.Item>
          <Form.Item
            name="date"
            label="预约日期"
            rules={[{ required: true, message: '请选择预约日期' }]}
          >
            <DatePicker
              inputReadOnly
              dateRender={current => {
                const workday = workdays?.find(
                  workday => workday.workTime === current.format('YYYY-MM-DD'),
                );
                const remaining =
                  workday && workday.totalNum - workday.orderedNum;
                return (
                  <Tooltip
                    overlay={remaining ? `剩余号源：${remaining}` : '暂无号源'}
                  >
                    <div
                      className="ant-picker-cell-inner"
                      style={
                        remaining
                          ? {
                              background:
                                remaining <= 5
                                  ? '#ff4d4f'
                                  : remaining <= 10
                                  ? '#ffc53d'
                                  : '#73d13d',
                            }
                          : undefined
                      }
                    >
                      {current.format('D')}
                    </div>
                  </Tooltip>
                );
              }}
              disabledDate={current => {
                const workday = workdays?.find(
                  workday => workday.workTime === current.format('YYYY-MM-DD'),
                );
                return !workday || workday.orderedNum >= workday.totalNum;
              }}
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
