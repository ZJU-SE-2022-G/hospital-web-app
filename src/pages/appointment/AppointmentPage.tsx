import React from 'react';
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
  useCreateDoctorReservationMutation,
  useListDepartmentsQuery,
  useListDoctorsQuery,
} from '../../apis/apiSlice';
import { useBreadcrumbProps } from '../../utils/breadcrumb';
import styles from '../../styles/Page.module.css';

const AppointmentPage: React.FC = () => {
  const { data: departmentData } = useListDepartmentsQuery();
  const { data: docData } = useListDoctorsQuery();

  const departmentInfo = departmentData?.map(
    (department: any) => department.name,
  );
  const docInfo = departmentInfo?.map((department: any) => ({
    value: department,
    label: department,
    children: docData
      ?.filter((item: any) => item.departmantName == department)
      .map((item: any) => ({ value: item.docName, label: item.docName })),
  }));
  console.log(docInfo);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [reserve, { isLoading }] = useCreateDoctorReservationMutation();
  const breadcrumb = useBreadcrumbProps([
    { path: '/', breadcrumbName: '首页' },
    { path: '/reserve', breadcrumbName: '门诊预约' },
  ]);

  const onFinish = async (values: any) => {
    try {
      console.log(values);
      console.log({
        departmentName: values['doc'][0],
        docName: values['doc'][1],
        name: values['name'],
        orderedTime: values['data'].format('MMDD'),
        uid: values['uid'],
        age: values['age'],
        pwd: values['id'],
        sex: values['sex'],
      });
      await reserve({
        departmentName: values['doc'][0],
        docName: values['doc'][1],
        name: values['name'],
        orderedTime: values['data'].format('MMDD'),
        uid: values['uid'],
        age: values['age'],
        pwd: values['id'],
        sex: values['sex'],
      }).unwrap();
      navigate('/');
      message.success('预约成功');
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
      <Form
        form={form}
        name="doctor"
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
          name="uid"
          label="用户编号"
          rules={[
            {
              required: true,
              message: '请输入用户编号（可在个人信息栏中查看）',
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          name="age"
          label="年龄"
          rules={[{ required: true, message: '请输入您的年龄' }]}
        >
          <InputNumber max={200} min={0} />
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
          name="sex"
          label="性别"
          rules={[{ required: true, message: '请选择性别' }]}
        >
          <Radio.Group name="sex-type" options={['男', '女']} />
        </Form.Item>
        <Form.Item name="doc" label="预约医生" rules={[{ required: true }]}>
          <Cascader options={docInfo} placeholder="请选择" />
        </Form.Item>
        <Form.Item
          name="data"
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
    </PageHeader>
  );
};

export default AppointmentPage;
