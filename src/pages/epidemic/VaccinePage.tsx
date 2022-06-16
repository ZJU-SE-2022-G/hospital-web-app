import React, { useState, useEffect } from 'react';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import {
  PageHeader,
  Button,
  Form,
  Input,
  InputNumber,
  Radio,
  DatePicker,
  Modal,
  Descriptions,
  message,
} from 'antd';
import { FormOutlined, DeleteOutlined } from '@ant-design/icons';
import {
  useGetCurrentUserQuery,
  useGetVaccineReservationQuery,
  useCreateVaccineReservationMutation,
  useDeleteVaccineReservationMutation,
} from '../../apis/apiSlice';
import { useBreadcrumbProps } from '../../utils/breadcrumb';
import styles from '../../styles/Page.module.css';

const VaccinePage: React.FC = () => {
  const [infoVisible, setInfoVisible] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { data: user } = useGetCurrentUserQuery();
  const { data } = useGetVaccineReservationQuery(user?.id || skipToken);
  const [reserve, { isLoading: reserveLoading }] =
    useCreateVaccineReservationMutation();
  const [remove, { isLoading: removeLoading }] =
    useDeleteVaccineReservationMutation();
  const breadcrumb = useBreadcrumbProps([
    { path: '/', breadcrumbName: '首页' },
    { path: '/epidemic/vaccine', breadcrumbName: '疫苗预约' },
  ]);

  const onFinish = async (values: any) => {
    try {
      console.log(values);
      await reserve({
        usrId: values['id'],
        usrName: values['name'],
        age: values['age'],
        sex: values['sex'],
        vacNum: values['vaccine-number'],
        vacDate: values['vaccine-date'].format('YYYY-MM-DD'),
      }).unwrap();
      setInfoVisible(true);
      message.success('预约成功');
    } catch (err: any) {
      message.error(err.message || err.status);
    }
  };

  const onDelete = async () => {
    try {
      if (user?.id) {
        await remove(user.id).unwrap();
        setInfoVisible(false);
        message.success('取消成功');
      }
    } catch (err: any) {
      message.error(err.message || err.status);
    }
  };

  useEffect(() => {
    form.setFieldsValue({ name: user?.name, id: user?.id });
  }, [user]);

  return (
    <>
      <PageHeader
        className={styles.page}
        title="疫苗接种预约"
        breadcrumb={breadcrumb}
        extra={
          user && (
            <Button
              type="primary"
              icon={<FormOutlined />}
              onClick={() => setInfoVisible(true)}
            >
              我的预约
            </Button>
          )
        }
      >
        {user ? (
          <Form
            form={form}
            name="vaccine"
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
              name="vaccine-number"
              label="接种针次"
              rules={[{ required: true, message: '请选择接种针次' }]}
            >
              <Radio.Group
                name="vaccine-number"
                options={[
                  { label: '第一针', value: 1 },
                  { label: '第二针', value: 2 },
                  { label: '第三针', value: 3 },
                ]}
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
                loading={reserveLoading}
              >
                预约
              </Button>
            </Form.Item>
          </Form>
        ) : (
          '请先登录'
        )}
      </PageHeader>
      <Modal
        title="我的预约"
        footer={null}
        visible={infoVisible}
        onCancel={() => setInfoVisible(false)}
      >
        {data ? (
          <>
            <Descriptions contentStyle={{ background: '#ffffff' }} bordered>
              <Descriptions.Item label="姓名">{data.usrName}</Descriptions.Item>
              <Descriptions.Item label="身份证号">
                {data.usrId}
              </Descriptions.Item>
              <Descriptions.Item label="年龄">{data.age}</Descriptions.Item>
              <Descriptions.Item label="性别">{data.sex}</Descriptions.Item>
              <Descriptions.Item label="接种针次">
                {data.vacNum}
              </Descriptions.Item>
              <Descriptions.Item label="接种日期">
                {`${data.vacDate[0]}-${data.vacDate[1]}-${data.vacDate[2]}`}
              </Descriptions.Item>
            </Descriptions>
            <Button
              type="primary"
              danger
              icon={<DeleteOutlined />}
              loading={removeLoading}
              onClick={onDelete}
            >
              取消预约
            </Button>
          </>
        ) : (
          '暂无预约'
        )}
      </Modal>
    </>
  );
};

export default VaccinePage;
